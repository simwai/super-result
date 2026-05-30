/**
 * Represents a successful result.
 */
export interface Ok<T> {
  readonly ok: true
  readonly value: T
}

/**
 * Represents a failed result.
 */
export interface Err<E> {
  readonly ok: false
  readonly error: E
}

/**
 * A discriminated union representing either a success (Ok) or a failure (Err).
 */
export type RawResult<T, E> = Ok<T> | Err<E>

/**
 * Creates a successful RawResult.
 */
export function ok<T>(value: T): RawResult<T, never> {
  return { ok: true, value }
}

/**
 * Creates a failed RawResult.
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
 * A class-based wrapper for RawResult providing a fluent API.
 */
export class Result<T, E> implements PromiseLike<T> {
  constructor(
    public readonly inner: RawResult<T, E> | Promise<RawResult<T, E>>,
  ) {}

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
              (v) => ok(v),
              (e) => err(mapError(e)),
            ) as Promise<RawResult<T, E>>,
          )
        }
        return new Result(ok(val as any))
      } catch (e) {
        return new Result(err(mapError(e)))
      }
    }

    if (isPromiseLike(input)) {
      return new Result(
        Promise.resolve(input).then(
          (v) => ok(v),
          (e) => err(mapError(e)),
        ) as Promise<RawResult<T, E>>,
      )
    }

    return new Result(ok(input as T))
  }

  static ok<T>(value: T): Result<T, never> {
    return new Result(ok(value))
  }

  static err<E>(error: E): Result<never, E> {
    return new Result(err(error))
  }

  static all<T, E>(
    results: (Result<T, E> | PromiseLike<Result<T, E>>)[],
  ): Result<T[], E> {
    const promise = Promise.all(results.map((r) => Promise.resolve(r))).then(
      async (resList) => {
        const values: T[] = []
        for (const r of resList) {
          const inner = await (r as any).inner
          if (_isOk(inner)) {
            values.push(inner.value as T)
          } else {
            return inner as Err<E>
          }
        }
        return ok(values)
      },
    )
    return new Result(promise as Promise<RawResult<T[], E>>)
  }

  static allSettled<T, E>(
    results: (Result<T, E> | PromiseLike<Result<T, E>>)[],
  ): Result<RawResult<T, E>[], never> {
    const promise = Promise.all(results.map((r) => Promise.resolve(r))).then(
      async (resList) => {
        const inners = await Promise.all(
          resList.map((r) => Promise.resolve((r as any).inner)),
        )
        return ok(inners as RawResult<T, E>[])
      },
    )
    return new Result(promise)
  }

  then<TResult1 = T, TResult2 = never>(
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

  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.inner instanceof Promise) {
      return new Result(
        this.inner.then((r) => (_isOk(r) ? ok(fn(r.value)) : r)) as Promise<
          RawResult<U, E>
        >,
      )
    }
    return new Result(
      _isOk(this.inner) ? ok(fn(this.inner.value)) : (this.inner as any),
    )
  }

  flatMap<U>(
    fn: (
      value: T,
    ) => Result<U, E> | RawResult<U, E> | PromiseLike<RawResult<U, E>>,
  ): Result<U, E> {
    const flatten = (
      r: RawResult<T, E>,
    ): RawResult<U, E> | PromiseLike<RawResult<U, E>> => {
      if (_isErr(r)) return r as any
      const next = fn(r.value)
      if (next instanceof Result) return next.inner
      return next
    }
    if (this.inner instanceof Promise) {
      return new Result(this.inner.then(flatten) as Promise<RawResult<U, E>>)
    }
    const next = flatten(this.inner)
    return new Result(next as RawResult<U, E> | Promise<RawResult<U, E>>)
  }

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
    ): RawResult<T, E | unknown> | PromiseLike<RawResult<T, E | unknown>> => {
      try {
        const res = callback(r)
        if (isPromiseLike(res)) {
          return res.then(
            () => r,
            (e) => toErrResult(r, e),
          )
        }
        return r
      } catch (e) {
        return toErrResult(r, e)
      }
    }

    if (this.inner instanceof Promise) {
      return new Result(
        this.inner.then(handleSync, (e) =>
          toErrResult(err(e) as any, e),
        ) as Promise<RawResult<T, E | unknown>>,
      )
    }
    return new Result(
      handleSync(this.inner) as
        | RawResult<T, E | unknown>
        | Promise<RawResult<T, E | unknown>>,
    )
  }

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

  unwrapOr<D>(defaultValue: D): T | D | Promise<T | D> {
    if (this.inner instanceof Promise) {
      return this.inner.then((r) => (_isOk(r) ? r.value : defaultValue))
    }
    return _isOk(this.inner) ? this.inner.value : defaultValue
  }

  unwrapOrElse<D>(fallback: (error: E) => D): T | D | Promise<T | D> {
    if (this.inner instanceof Promise) {
      return this.inner.then((r) => (_isOk(r) ? r.value : fallback(r.error)))
    }
    return _isOk(this.inner) ? this.inner.value : fallback(this.inner.error)
  }

  isOk(): boolean | Promise<boolean> {
    if (this.inner instanceof Promise) {
      return this.inner.then(_isOk)
    }
    return _isOk(this.inner)
  }

  isErr(): boolean | Promise<boolean> {
    if (this.inner instanceof Promise) {
      return this.inner.then(_isErr)
    }
    return _isErr(this.inner)
  }

  match<U, V>(
    onOk: (value: T) => U | PromiseLike<U>,
    onErr: (error: E) => V | PromiseLike<V>,
  ): U | V | Promise<U | V> {
    const handle = (r: RawResult<T, E>): U | V | PromiseLike<U | V> => {
      return _isOk(r) ? onOk(r.value) : onErr(r.error)
    }
    if (this.inner instanceof Promise) {
      return this.inner.then(handle) as Promise<U | V>
    }
    const val = handle(this.inner)
    if (isPromiseLike(val)) return Promise.resolve(val)
    return val as U | V
  }
}
