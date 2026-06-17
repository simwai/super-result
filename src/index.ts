// #region Core types

/**
 * Represents a successful result.
 *
 * @example
 * const success: Ok<number> = { ok: true, value: 42 }
 */
export interface Ok<T> {
  /** The success discriminator */
  readonly ok: true
  /** The successful value */
  readonly value: T
}

/**
 * Represents a failed result.
 *
 * @example
 * const failure: Err<string> = { ok: false, error: 'something went wrong' }
 */
export interface Err<E> {
  /** The failure discriminator */
  readonly ok: false
  /** The error value */
  readonly error: E
}

/**
 * A discriminated union representing either success (Ok) or failure (Err).
 *
 * This type is the core of railway-oriented programming in this library.
 *
 * @example
 * function divide(a: number, b: number): Result<number, string> {
 *   if (b === 0) return err('Division by zero')
 *   return ok(a / b)
 * }
 */
export type Result<T, E> = Ok<T> | Err<E>

/**
 * A Promise that resolves to a Result.
 *
 * Useful for representing asynchronous operations that can fail.
 *
 * @example
 * async function fetchData(): ResultAsync<Data, Error> {
 *   return from(fetch('/api/data').then(res => res.json()))
 * }
 */
export type ResultAsync<T, E> = Promise<Result<T, E>>

// #endregion

// #region Constructors

/**
 * Creates a successful result.
 *
 * @param value - The value to wrap in an Ok result
 * @returns An Ok result containing the value
 *
 * @example
 * const res = ok(42)
 * if (res.ok) {
 *   console.log(res.value) // 42
 * }
 */
export function ok<T>(value: T): Ok<T> {
  return { ok: true, value }
}

/**
 * Creates a failed result.
 *
 * @param error - The error to wrap in an Err result
 * @returns An Err result containing the error
 *
 * @example
 * const res = err(new Error('failure'))
 * if (!res.ok) {
 *   console.error(res.error.message)
 * }
 */
export function err<E>(error: E): Err<E> {
  return { ok: false, error }
}

// #endregion

// #region Internal helpers

/**
 * Internal helper to check if a value is a Promise.
 */
function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    'then' in value &&
    typeof (value as { then: unknown }).then === 'function'
  )
}

/**
 * Internal factory to create a scoped 'from' function with a custom error mapper.
 */
function createFrom<E>(mapError: (error: unknown) => E) {
  function from<T>(fn: () => PromiseLike<T>): ResultAsync<T, E>
  function from<T>(fn: () => T): Result<T, E>
  function from<T>(promise: PromiseLike<T>): ResultAsync<T, E>

  function from<T>(
    input: PromiseLike<T> | (() => T | PromiseLike<T>),
  ): Result<T, E> | ResultAsync<T, E> {
    const wrapErr = (error: unknown): Err<E> => err(mapError(error))

    if (typeof input === 'function') {
      try {
        const value = input()

        if (isPromiseLike<T>(value)) {
          return Promise.resolve(value).then(
            (resolved) => ok(resolved),
            (error) => wrapErr(error),
          )
        }

        return ok(value)
      } catch (error) {
        return wrapErr(error)
      }
    }

    return Promise.resolve(input).then(
      (resolved) => ok(resolved),
      (error) => wrapErr(error),
    )
  }

  return from
}

// #endregion

// #region Factory

/**
 * A factory for creating results with a pre-configured error mapper.
 */
export interface ResultFactory<E> {
  /**
   * Captures an asynchronous function execution into a ResultAsync.
   */
  from<T>(fn: () => PromiseLike<T>): ResultAsync<T, E>
  /**
   * Captures a synchronous function execution into a Result.
   */
  from<T>(fn: () => T): Result<T, E>
  /**
   * Captures a Promise into a ResultAsync.
   */
  from<T>(promise: PromiseLike<T>): ResultAsync<T, E>
}

/**
 * Creates a specialized Result factory with a custom error mapping function.
 *
 * This is useful for ensuring all errors in a specific domain are mapped to a
 * common error type (e.g., a custom error class).
 *
 * @param mapError - A function that transforms unknown errors into the desired type E
 * @returns A ResultFactory with a 'from' method using the provided mapper
 *
 * @example
 * class MyError extends Error {}
 * const R = createResult(e => e instanceof MyError ? e : new MyError(String(e)))
 *
 * const res = R.from(() => { throw new Error('raw') })
 * // res.error is guaranteed to be MyError
 */
export function createResult<E>(
  mapError: (error: unknown) => E,
): ResultFactory<E> {
  return {
    from: /* @__PURE__ */ createFrom(mapError),
  }
}

// #endregion

// #region Default entry points

/**
 * Captures errors from functions or promises into a Result.
 *
 * This default instance maps all errors to the standard Error class.
 * If the caught error is already an instance of Error, it is returned as is.
 * Otherwise, it is wrapped in a new Error.
 *
 * @example
 * // Synchronous
 * const res1 = from(() => 42)
 *
 * // Asynchronous
 * const res2 = await from(fetch('/api').then(r => r.json()))
 */
export const from = /* @__PURE__ */ createFrom<Error>((error) =>
  error instanceof Error ? error : new Error(String(error)),
)

/**
 * Captures errors from functions or promises into a Result without transformation.
 *
 * This is useful when you want to handle the 'unknown' error type yourself later.
 *
 * @example
 * const res = fromUnknown(() => { throw 'string error' })
 * if (!res.ok) {
 *   console.log(typeof res.error) // 'string'
 * }
 */
export const fromUnknown = /* @__PURE__ */ createFrom<unknown>((error) => error)

// #endregion

