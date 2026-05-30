/**
 * Represents a successful result.
 *
 * @template T The type of the value.
 * @category Core Types
 */
export interface Ok<T> {
  readonly ok: true
  readonly value: T
}

/**
 * Represents a failed result.
 *
 * @template E The type of the error.
 * @category Core Types
 */
export interface Err<E> {
  readonly ok: false
  readonly error: E
}

/**
 * A discriminated union representing either a success ({@link Ok}) or a failure ({@link Err}).
 *
 * @template T The type of the value.
 * @template E The type of the error.
 * @category Core Types
 */
export type RawResult<T, E> = Ok<T> | Err<E>

/**
 * Creates a successful {@link RawResult}.
 *
 * @param value The success value.
 * @category Core Functions
 */
export function ok<T>(value: T): RawResult<T, never> {
  return { ok: true, value }
}

/**
 * Creates a failed {@link RawResult}.
 *
 * @param error The error value.
 * @category Core Functions
 */
export function err<E>(error: E): RawResult<never, E> {
  return { ok: false, error }
}

function _isOk<T, E>(r: RawResult<T, E>): r is Ok<T> {
  return r.ok === true
}
function _isErr<T, E>(r: RawResult<T, E>): r is Err<E> {
  return r.ok === false
}
function isPromiseLike<T>(v: unknown): v is PromiseLike<T> {
  return (
    !!v &&
    (typeof v === 'object' || typeof v === 'function') &&
    'then' in v &&
    typeof (v as any).then === 'function'
  )
}

/**
 * Error thrown when a non-error value is unwrapped and treated as an error.
 *
 * @category Errors
 */
export class NonErrorThrown extends Error {
  public readonly value: unknown
  constructor(value: unknown) {
    super('Non-error value thrown.')
    this.name = 'NonErrorThrown'
    this.value = value
  }
}

/**
 * Error thrown when an error occurs within a final block.
 *
 * @template T The type of the value.
 * @template E The type of the error.
 * @category Errors
 */
export class FinallyError<T, E> extends Error implements Err<unknown> {
  readonly ok = false
  readonly error: unknown
  public readonly originalResult: RawResult<T, E>
  constructor(originalResult: RawResult<T, E>, error: unknown) {
    super('Error occurred in final block.')
    this.name = 'FinallyError'
    this.originalResult = originalResult
    this.error = error
  }
}

function wrapError(e: unknown): Error {
  return e instanceof Error ? e : new NonErrorThrown(e)
}

/**
 * A class-based wrapper for {@link RawResult} that provides a fluent API
 * for both synchronous and asynchronous operations.
 *
 * @template T The type of the value.
 * @template E The type of the error.
 * @category Main
 */
export class Result<T, E> {
  constructor(
    public readonly inner: RawResult<T, E> | Promise<RawResult<T, E>>,
  ) {}

  /**
   * Unified entry point to create a {@link Result}.
   * Handles values, functions (sync/async), and promises.
   *
   * @param input The value, promise, or function to wrap.
   * @param mapError Optional function to map caught errors.
   */
  static from<T, E = unknown>(
    input: T | PromiseLike<T> | (() => T | PromiseLike<T>),
    mapError: (e: unknown) => E = (e) => e as E,
  ): Result<T, E> {
    if (typeof input === 'function') {
      try {
        const val = (input as () => T | PromiseLike<T>)()
        if (isPromiseLike(val)) {
          return new Result(
            Promise.resolve(val).then(
              (v) => ok(v) as RawResult<T, E>,
              (e) => err(mapError(e)) as RawResult<T, E>,
            ),
          )
        }
        return new Result(ok(val as T) as RawResult<T, E>)
      } catch (e) {
        return new Result(err(mapError(e)) as RawResult<T, E>)
      }
    }

    if (isPromiseLike(input)) {
      return new Result(
        Promise.resolve(input).then(
          (v) => ok(v) as RawResult<T, E>,
          (e) => err(mapError(e)) as RawResult<T, E>,
        ),
      )
    }

    return new Result(ok(input as T) as RawResult<T, E>)
  }

  /**
   * Creates a successful {@link Result}.
   *
   * @param value The success value.
   */
  static ok<T>(value: T): Result<T, never> {
    return new Result(ok(value))
  }

  /**
   * Creates a failed {@link Result}.
   *
   * @param error The error value.
   */
  static err<E>(error: E): Result<never, E> {
    return new Result(err(error))
  }

  /**
   * Combines multiple results into a single result containing an array of values.
   * Fails if any of the input results are an error.
   */
  static all<T, E>(
    results: (Result<T, E> | PromiseLike<Result<T, E>>)[],
  ): Result<T[], E> {
    const promise = Promise.all(results)
      .then(
        (values) =>
          ok(values.map((v) => (v instanceof Result ? v.inner : v))) as any,
      )
      .then(async (inners: any[]) => {
        const resList = await Promise.all(inners)
        const values: T[] = []
        for (const r of resList) {
          if (_isOk(r)) {
            values.push(r.value as T)
          } else {
            return r as Err<E>
          }
        }
        return ok(values)
      })
    return new Result(promise as Promise<RawResult<T[], E>>)
  }

  /**
   * Combines multiple results into a single result containing an array of {@link RawResult}s.
   * Never fails, instead captures all outcomes.
   */
  static allSettled<T, E>(
    results: (Result<T, E> | PromiseLike<Result<T, E>>)[],
  ): Result<RawResult<T, E>[], never> {
    const promise = Promise.allSettled(results).then(async (settled) => {
      const inners = await Promise.all(
        settled.map(async (s) => {
          if (s.status === 'fulfilled') {
            const val = s.value
            return val instanceof Result ? val.inner : val
          }
          return err(s.reason)
        }),
      )
      return ok(inners)
    })
    return new Result(promise as Promise<RawResult<RawResult<T, E>[], never>>)
  }

  /**
   * Chains a callback to the result.
   * Wraps errors thrown in handlers using {@link NonErrorThrown}.
   */
  andThen<TResult1 = T, TResult2 = never>(
    onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>,
  ): Promise<TResult1 | TResult2> {
    const promise =
      this.inner instanceof Promise ? this.inner : Promise.resolve(this.inner)

    return promise.then(
      (r) => {
        try {
          if (_isOk(r)) {
            return onfulfilled ? onfulfilled(r.value) : (r.value as any)
          }
          if (onrejected) return onrejected(r.error)
          throw wrapError(r.error)
        } catch (e) {
          const wrapped = wrapError(e)
          if (onrejected) return onrejected(wrapped)
          throw wrapped
        }
      },
      (e) => {
        const wrapped = wrapError(e)
        try {
          if (onrejected) return onrejected(wrapped)
          throw wrapped
        } catch (err) {
          throw wrapError(err)
        }
      },
    )
  }

  /**
   * Maps the success value using the provided function.
   *
   * @param fn The mapping function.
   */
  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.inner instanceof Promise) {
      return new Result(
        this.inner.then(
          (r) => (_isOk(r) ? ok(fn(r.value)) : r) as RawResult<U, E>,
        ),
      )
    }
    return new Result(
      _isOk(this.inner)
        ? ok(fn(this.inner.value))
        : (this.inner as unknown as RawResult<U, E>),
    )
  }

  /**
   * Maps the success value to a new {@link Result} and flattens it.
   *
   * @param fn The flatMapping function.
   */
  flatMap<U>(
    fn: (
      value: T,
    ) => Result<U, E> | RawResult<U, E> | PromiseLike<RawResult<U, E>>,
  ): Result<U, E> {
    const flatten = (
      r: RawResult<T, E>,
    ): RawResult<U, E> | Promise<RawResult<U, E>> => {
      if (_isErr(r)) return r as unknown as RawResult<U, E>
      const next = fn(r.value)
      if (next instanceof Result) return Promise.resolve(next.inner)
      return Promise.resolve(next)
    }
    if (this.inner instanceof Promise) {
      return new Result(this.inner.then(flatten))
    }
    const next = flatten(this.inner)
    return new Result(next)
  }

  /**
   * Executes a callback regardless of whether the result is a success or failure.
   *
   * @param callback The callback function.
   * @param mapFinallyError Optional function to map errors thrown in the callback.
   */
  final(
    callback: (result: RawResult<T, E>) => void | PromiseLike<void>,
    mapFinallyError?: (error: unknown) => unknown,
  ): Result<T, E | unknown> {
    const mapper = mapFinallyError ?? ((e: unknown) => e)
    const toErrResult = (
      original: RawResult<T, E>,
      err: unknown,
    ): RawResult<T, E | unknown> => {
      return new FinallyError(original, mapper(err))
    }

    const handleSync = (
      r: RawResult<T, E>,
    ): RawResult<T, E | unknown> | Promise<RawResult<T, E | unknown>> => {
      try {
        const res = callback(r)
        if (isPromiseLike(res)) {
          return Promise.resolve(res).then(
            () => r as RawResult<T, E | unknown>,
            (e) => toErrResult(r, e),
          )
        }
        return r as RawResult<T, E | unknown>
      } catch (e) {
        return toErrResult(r, e)
      }
    }

    if (this.inner instanceof Promise) {
      return new Result(
        this.inner.then(handleSync, (e) => toErrResult(err(e) as any, e)),
      )
    }
    return new Result(handleSync(this.inner))
  }

  /**
   * Returns the value if success, otherwise throws the error.
   * Returns a {@link Promise} if the result is asynchronous.
   */
  unwrap(): T | Promise<T> {
    if (this.inner instanceof Promise) {
      return this.inner.then((r) => {
        if (_isOk(r)) return r.value
        throw wrapError(r.error)
      })
    }
    if (_isOk(this.inner)) return this.inner.value
    throw wrapError(this.inner.error)
  }

  /**
   * Returns the value if success, otherwise returns the provided default value.
   * Returns a {@link Promise} if the result is asynchronous.
   *
   * @param defaultValue The value to return on failure.
   */
  unwrapOr<D>(defaultValue: D): T | D | Promise<T | D> {
    if (this.inner instanceof Promise) {
      return this.inner.then((r) => (_isOk(r) ? r.value : defaultValue))
    }
    return _isOk(this.inner) ? this.inner.value : defaultValue
  }

  /**
   * Returns the value if success, otherwise calls the fallback function with the error.
   * Returns a {@link Promise} if the result is asynchronous.
   *
   * @param fallback The function to call on failure.
   */
  unwrapOrElse<D>(fallback: (error: E) => D): T | D | Promise<T | D> {
    if (this.inner instanceof Promise) {
      return this.inner.then((r) => (_isOk(r) ? r.value : fallback(r.error)))
    }
    return _isOk(this.inner) ? this.inner.value : fallback(this.inner.error)
  }

  /**
   * Checks if the result is a success.
   * Returns a {@link Promise} if the result is asynchronous.
   */
  isOk(): boolean | Promise<boolean> {
    if (this.inner instanceof Promise) {
      return this.inner.then(_isOk)
    }
    return _isOk(this.inner)
  }

  /**
   * Checks if the result is a failure.
   * Returns a {@link Promise} if the result is asynchronous.
   */
  isErr(): boolean | Promise<boolean> {
    if (this.inner instanceof Promise) {
      return this.inner.then(_isErr)
    }
    return _isErr(this.inner)
  }

  /**
   * Pattern matches on the result.
   *
   * @param onOk Function to call if success.
   * @param onErr Function to call if failure.
   */
  match<U, V>(
    onOk: (value: T) => U | PromiseLike<U>,
    onErr: (error: E) => V | PromiseLike<V>,
  ): U | V | Promise<U | V> {
    const handle = (r: RawResult<T, E>): U | V | Promise<U | V> => {
      return _isOk(r)
        ? Promise.resolve(onOk(r.value))
        : Promise.resolve(onErr(r.error))
    }
    if (this.inner instanceof Promise) {
      return this.inner.then(handle).then((res) => res) as Promise<U | V>
    }
    const val = _isOk(this.inner)
      ? onOk(this.inner.value)
      : onErr(this.inner.error)
    if (isPromiseLike(val)) return Promise.resolve(val)
    return val
  }
}
