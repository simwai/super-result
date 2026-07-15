"""
super‑result – Python port of the npm super‑result library.
Rust‑inspired Result type for explicit error handling.
Supports Python 3.9 – 3.14.
"""

import inspect
import traceback
import types
from collections.abc import Awaitable, Callable
from functools import wraps
from typing import (
    Generic,
    TypeGuard,
    TypeVar,
    overload,
    Union,
    Optional,
    cast,
)

from typing_extensions import ParamSpec

# --- Generic Type Variables ---
P = ParamSpec('P')
T = TypeVar('T')
E = TypeVar('E', bound=Exception)
M = TypeVar('M', bound=Exception)


# --- Core Result Classes ----------------------------------------------------
class Result(Generic[T, E]):
    __slots__ = ()

    @property
    def ok(self) -> bool:
        return isinstance(self, Ok)

    @property
    def value(self) -> T:
        if not self.ok:
            raise AttributeError("'Err' object has no attribute 'value'")
        return cast(Ok[T, E], self)._value

    @property
    def error(self) -> E:
        if self.ok:
            raise AttributeError("'Ok' object has no attribute 'error'")
        # pyright: ignore[reportPrivateUsage]
        return cast(Err[T, E], self)._error


class Ok(Result[T, E]):
    __slots__ = ('_value',)

    def __init__(self, value: T):
        self._value = value

    def __repr__(self) -> str:
        return f'Ok({self._value!r})'


class Err(Result[T, E]):
    __slots__ = ('_error', '_tb')

    def __init__(self, error: E, tb: Optional[types.TracebackType] = None):
        self._error = error
        self._tb = tb

    @property
    def stack(self) -> Optional[str]:
        if self._tb is None:
            return None
        return ''.join(traceback.format_tb(self._tb))

    @property
    def full_stack(self) -> Optional[str]:
        if self._tb is None:
            return None
        return ''.join(
            traceback.format_exception(type(self._error), self._error, self._tb)
        )

    def __repr__(self) -> str:
        return f'Err({self._error!r})'


# --- Factory Functions ----------------------------------------------------
def ok(value: T) -> Ok[T, Exception]:
    return Ok(value)


def err(error: E) -> Err[object, E]:
    return Err(error)


# --- Type Guards -----------------------------------------------------------
def is_ok(result: Result[T, E]) -> TypeGuard[Ok[T, E]]:
    return result.ok


def is_err(result: Result[T, E]) -> TypeGuard[Err[T, E]]:
    return not result.ok


# --- Internal helpers (DRY, generic) ---------------------------------------
def _catch_sync(
    func: Callable[[], T],
    error_mapper: Callable[[Exception], M],
) -> Result[T, M]:
    try:
        return Ok(func())
    except Exception as e:
        return Err(error_mapper(e), tb=e.__traceback__)


async def _catch_async(
    func: Callable[[], Awaitable[T]],
    error_mapper: Callable[[Exception], M],
) -> Result[T, M]:
    try:
        return Ok(await func())
    except Exception as e:
        return Err(error_mapper(e), tb=e.__traceback__)


# --- Global entry points ----------------------------------------------------
def _from_sync(func: Callable[[], T]) -> Result[T, Exception]:
    return _catch_sync(func, lambda e: e)


async def _from_async(func: Callable[[], Awaitable[T]]) -> Result[T, Exception]:
    return await _catch_async(func, lambda e: e)


# Overload order: async first (more specific) to avoid overlapping warning
@overload
def from_func(
    func: Callable[[], Awaitable[T]],
) -> Awaitable[Result[T, Exception]]:
    ...


@overload
def from_func(func: Callable[[], T]) -> Result[T, Exception]:
    ...


def from_func(
    func: Union[Callable[[], T], Callable[[], Awaitable[T]]],
) -> Union[Result[T, Exception], Awaitable[Result[T, Exception]]]:
    if inspect.iscoroutinefunction(func):
        return _from_async(cast(Callable[[], Awaitable[T]], func))
    return _from_sync(cast(Callable[[], T], func))


r = from_func  # alias


# --- Custom Factory --------------------------------------------------------
class ResultFactory(Generic[E]):
    __slots__ = ('_error_mapper',)

    def __init__(self, error_mapper: Callable[[Exception], E]):
        self._error_mapper = error_mapper

    def _from_sync(self, func: Callable[[], T]) -> Result[T, E]:
        return _catch_sync(func, self._error_mapper)

    async def _from_async(self, func: Callable[[], Awaitable[T]]) -> Result[T, E]:
        return await _catch_async(func, self._error_mapper)

    @overload
    def from_func(
        self, func: Callable[[], Awaitable[T]]
    ) -> Awaitable[Result[T, E]]:
        ...

    @overload
    def from_func(self, func: Callable[[], T]) -> Result[T, E]:
        ...

    def from_func(
        self,
        func: Union[Callable[[], T], Callable[[], Awaitable[T]]],
    ) -> Union[Result[T, E], Awaitable[Result[T, E]]]:
        if inspect.iscoroutinefunction(func):
            return self._from_async(cast(Callable[[], Awaitable[T]], func))
        return self._from_sync(cast(Callable[[], T], func))


def create_result(error_mapper: Callable[[Exception], E]) -> ResultFactory[E]:
    return ResultFactory(error_mapper)


# --- Decorator --------------------------------------------------------------
@overload
def as_result(func: Callable[P, T]) -> Callable[P, Result[T, Exception]]:
    ...


@overload
def as_result(
    func: Callable[P, T], *, error_mapper: Callable[[Exception], E]
) -> Callable[P, Result[T, E]]:
    ...


@overload
def as_result(
    *, error_mapper: Callable[[Exception], E]
) -> Callable[[Callable[P, T]], Callable[P, Result[T, E]]]:
    ...


def as_result(
    func: Optional[Callable[P, T]] = None,
    *,
    error_mapper: Optional[Callable[[Exception], Exception]] = None,
) -> Union[
    Callable[P, Result[T, Exception]],
    Callable[[Callable[P, T]], Callable[P, Result[T, Exception]]],
]:
    def decorator(fn: Callable[P, T]) -> Callable[P, Result[T, Exception]]:
        if error_mapper is not None:
            factory = create_result(error_mapper)
            if inspect.iscoroutinefunction(fn):

                @wraps(fn)
                async def wrapper_async(
                    *args: P.args, **kwargs: P.kwargs
                ) -> Result[T, Exception]:
                    # We know factory.from_func returns Awaitable because fn is async
                    return await cast(
                        Awaitable[Result[T, Exception]],
                        factory.from_func(lambda: fn(*args, **kwargs)),
                    )

                return cast(Callable[P, Result[T, Exception]], wrapper_async)

            @wraps(fn)
            def wrapper_sync(
                *args: P.args, **kwargs: P.kwargs
            ) -> Result[T, Exception]:
                return factory.from_func(lambda: fn(*args, **kwargs))

            return cast(Callable[P, Result[T, Exception]], wrapper_sync)
        else:
            if inspect.iscoroutinefunction(fn):

                @wraps(fn)
                async def wrapper_async(
                    *args: P.args, **kwargs: P.kwargs
                ) -> Result[T, Exception]:
                    return await cast(
                        Awaitable[Result[T, Exception]],
                        from_func(lambda: fn(*args, **kwargs)),
                    )

                return cast(Callable[P, Result[T, Exception]], wrapper_async)

            @wraps(fn)
            def wrapper_sync(
                *args: P.args, **kwargs: P.kwargs
            ) -> Result[T, Exception]:
                return from_func(lambda: fn(*args, **kwargs))

            return cast(Callable[P, Result[T, Exception]], wrapper_sync)

    if func is None:
        # Return the decorator itself
        return cast(
            Callable[[Callable[P, T]], Callable[P, Result[T, Exception]]],
            decorator,
        )
    else:
        # Apply decorator to function
        return decorator(func)