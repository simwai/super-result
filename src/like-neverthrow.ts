// #region Core types

/**
 * Successful result carrying a value.
 *
 * @template T The success value type.
 * @category Result
 */
export interface Ok<T> {
  readonly type: 'ok'
  readonly value: T
}

/**
 * Failed result carrying an error.
 *
 * @template E The error type.
 * @category Result
 */
export interface Err<E> {
  readonly type: 'err'
  readonly error: E
}

/**
 * Discriminated union of {@link Ok} and {@link Err}.
 *
 * @template T The success value type.
 * @template E The error type.
 * @category Result
 */
export type Result<T, E> = Ok<T> | Err<E>

/**
 * Async variant — a `Promise` that always resolves to a {@link Result}.
 *
 * @template T The success value type.
 * @template E The error type.
 * @category Result
 */
export type ResultAsync<T, E> = Promise<Result<T, E>>

// #endregion

// #region Errors

/**
 * Thrown by {@link unwrap} when the error value is not an `Error` instance.
 * Wraps the raw thrown value in `.value` for inspection.
 *
 * @category Errors
 */
export class NonErrorThrown extends Error {
  public readonly value: unknown

  /**
   * @param value The non-Error value that was thrown.
   */
  public constructor(value: unknown) {
    super('Non-error value thrown.')
    this.name = 'NonErrorThrown'
    this.value = value
  }
}

/**
 * Wraps both the original result and a cleanup error when a finally block fails.
 *
 * @template T The success value type of the original result.
 * @template E The error type of the original result.
 * @category Errors
 */
export class FinallyError<T, E> extends Error {
  public readonly originalResult: Result<T, E>
  public readonly finallyError: unknown

  public constructor(originalResult: Result<T, E>, finallyError: unknown) {
    super('Error occurred in finally block.')
    this.name = 'FinallyError'
    this.originalResult = originalResult
    this.finallyError = finallyError
  }
}

// #endregion

// #region Constructors

/**
 * Create a successful {@link Ok} result.
 *
 * @category Constructors
 */
export /* @__NO_SIDE_EFFECTS__ */ function ok<T>(value: T): Ok<T> {
  return { type: 'ok', value }
}

/**
 * Create a failed {@link Err} result.
 *
 * @category Constructors
 */
export /* @__NO_SIDE_EFFECTS__ */ function err<E>(error: E): Err<E> {
  return { type: 'err', error }
}

/**
 * Create a successful {@link ResultAsync}.
 *
 * @category Constructors
 */
export /* @__NO_SIDE_EFFECTS__ */ function okAsync<T>(
  value: T,
): ResultAsync<T, never> {
  return Promise.resolve(ok(value))
}

/**
 * Create a failed {@link ResultAsync}.
 *
 * @category Constructors
 */
export /* @__NO_SIDE_EFFECTS__ */ function errAsync<E>(
  error: E,
): ResultAsync<never, E> {
  return Promise.resolve(err(error))
}

// #endregion

// #region Predicates

/**
 * Type guard: check if a result is {@link Ok}.
 *
 * @category Predicates
 */
export /* @__NO_SIDE_EFFECTS__ */ function isOk<T, E>(
  result: Result<T, E>,
): result is Ok<T> {
  return result.type === 'ok'
}

/**
 * Type guard: check if a result is {@link Err}.
 *
 * @category Predicates
 */
export /* @__NO_SIDE_EFFECTS__ */ function isErr<T, E>(
  result: Result<T, E>,
): result is Err<E> {
  return result.type === 'err'
}

// #endregion

// #region Capture helpers

/**
 * Options for capturing operations via {@link fromThrowable} and others.
 *
 * @template T The success value type.
 * @template E The error type.
 * @category Capture
 */
export interface CaptureOptions<T, E> {
  /** Custom error mapper for caught exceptions. Defaults to factory default. */
  catch?: (error: unknown) => E

  /** Executes a callback after the operation, regardless of success or failure. */
  finally?: (result: Result<T, E>) => void | PromiseLike<void>

  /** Maps a finally-block failure. Overrides factory default. */
  mapFinallyError?: (error: unknown) => unknown
}

/**
 * Executes a synchronous function and captures any thrown error.
 *
 * @category Capture
 */
export function fromThrowable<T, E = unknown>(
  fn: () => T,
  mapError: (error: unknown) => E = (e) => e as E,
): Result<T, E> {
  try {
    return ok(fn())
  } catch (error) {
    return err(mapError(error))
  }
}

/**
 * Wraps a `PromiseLike` into a {@link ResultAsync}, capturing any rejection.
 *
 * @category Capture
 */
export async function fromPromise<T, E = unknown>(
  promise: PromiseLike<T>,
  mapError: (error: unknown) => E = (e) => e as E,
): ResultAsync<T, E> {
  try {
    return ok(await promise)
  } catch (error) {
    return err(mapError(error))
  }
}

/**
 * Executes an async function and captures any thrown error.
 *
 * @category Capture
 */
export async function fromAsyncThrowable<T, E = unknown>(
  fn: () => PromiseLike<T>,
  mapError: (error: unknown) => E = (e) => e as E,
): ResultAsync<T, E> {
  try {
    return ok(await fn())
  } catch (error) {
    return err(mapError(error))
  }
}

// #endregion

// #region Transformation

/**
 * Maps the success value of a {@link Result}.
 *
 * @category Transformation
 */
export /* @__NO_SIDE_EFFECTS__ */ function map<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  return isOk(result) ? ok(fn(result.value)) : result
}

/**
 * Async variant of {@link map}. Awaits `resultPromise` before mapping.
 *
 * @category Transformation
 */
export async function mapAsync<T, E, U>(
  resultPromise: ResultAsync<T, E>,
  fn: (value: T) => U | PromiseLike<U>,
): ResultAsync<U, E> {
  const result = await resultPromise
  if (isErr(result)) return result
  return ok(await fn(result.value))
}

/**
 * Maps the error value of a {@link Result}.
 *
 * @category Transformation
 */
export /* @__NO_SIDE_EFFECTS__ */ function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F,
): Result<T, F> {
  return isErr(result) ? err(fn(result.error)) : result
}

/**
 * Async variant of {@link mapErr}. Awaits `resultPromise` before mapping.
 *
 * @category Transformation
 */
export async function mapErrAsync<T, E, F>(
  resultPromise: ResultAsync<T, E>,
  fn: (error: E) => F | PromiseLike<F>,
): ResultAsync<T, F> {
  const result = await resultPromise
  if (isOk(result)) return result
  return err(await fn(result.error))
}

/**
 * Flat maps the success value of a {@link Result}.
 *
 * @category Transformation
 */
export /* @__NO_SIDE_EFFECTS__ */ function flatMap<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>,
): Result<U, E> {
  return isOk(result) ? fn(result.value) : result
}

/**
 * Async variant of {@link flatMap}. Supports returning `Result` or `ResultAsync`.
 *
 * @category Transformation
 */
export async function flatMapAsync<T, E, U>(
  resultPromise: ResultAsync<T, E>,
  fn: (value: T) => Result<U, E> | ResultAsync<U, E>,
): ResultAsync<U, E> {
  const result = await resultPromise
  if (isErr(result)) return result
  return fn(result.value)
}

// #endregion

// #region Lifecycle

/**
 * Execute a callback regardless of the result. Returns a promise resolving to the result
 * or a {@link FinallyError} if the callback fails.
 *
 * @category Lifecycle
 */
export function onFinally<T, E>(
  result: ResultAsync<T, E>,
  callback: (result: Result<T, E>) => void | PromiseLike<void>,
  mapFinallyError?: (error: unknown) => unknown,
): ResultAsync<T, E | FinallyError<T, E>>
export function onFinally<T, E>(
  result: Result<T, E>,
  callback: (result: Result<T, E>) => void | PromiseLike<void>,
  mapFinallyError?: (error: unknown) => unknown,
): Result<T, E | FinallyError<T, E>> | ResultAsync<T, E | FinallyError<T, E>>
export function onFinally<T, E>(
  result: Result<T, E> | ResultAsync<T, E>,
  callback: (result: Result<T, E>) => void | PromiseLike<void>,
  mapFinallyError: (error: unknown) => unknown = (e) => e,
): any {
  if (isPromiseLike(result)) {
    return result.then((res) => onFinally(res, callback, mapFinallyError))
  }

  try {
    const voidOrPromise = callback(result)
    if (isPromiseLike(voidOrPromise)) {
      return voidOrPromise.then(
        () => result,
        (error) => err(new FinallyError(result, mapFinallyError(error))),
      )
    }
    return result
  } catch (error) {
    return err(new FinallyError(result, mapFinallyError(error)))
  }
}

/**
 * Purely async variant of {@link onFinally}.
 *
 * @category Lifecycle
 */
export async function onFinallyAsync<T, E>(
  resultPromise: ResultAsync<T, E>,
  callback: (result: Result<T, E>) => void | PromiseLike<void>,
  mapFinallyError: (error: unknown) => unknown = (e) => e,
): ResultAsync<T, E | FinallyError<T, E>> {
  const result = await resultPromise
  return onFinally(result, callback, mapFinallyError)
}

// #endregion

// #region Pattern Matching

/**
 * Branch logic based on the result state.
 *
 * @category Pattern Matching
 */
export /* @__NO_SIDE_EFFECTS__ */ function match<T, E, U, V>(
  result: Result<T, E>,
  onOk: (value: T) => U,
  onErr: (error: E) => V,
): U | V {
  return isOk(result) ? onOk(result.value) : onErr(result.error)
}

/**
 * Async variant of {@link match}. Awaits `resultPromise` before branching.
 *
 * @category Pattern Matching
 */
export async function matchAsync<T, E, U, V>(
  resultPromise: ResultAsync<T, E>,
  onOk: (value: T) => U | PromiseLike<U>,
  onErr: (error: E) => V | PromiseLike<V>,
): Promise<U | V> {
  const result = await resultPromise
  return match(result, onOk, onErr)
}

// #endregion

// #region Unwrap helpers

/**
 * Return the value if `Ok`, otherwise throw.
 *
 * @throws {Error} The original error if it is an `Error` instance.
 * @throws {NonErrorThrown} If the error is not an `Error` instance.
 * @category Unwrap
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (isOk(result)) return result.value
  if (result.error instanceof Error) throw result.error
  throw new NonErrorThrown(result.error)
}

/**
 * Async variant of {@link unwrap}.
 *
 * @throws {Error} The original error if it is an `Error` instance.
 * @throws {NonErrorThrown} If the error is not an `Error` instance.
 * @category Unwrap
 */
export async function unwrapAsync<T, E>(
  resultPromise: ResultAsync<T, E>,
): Promise<T> {
  return unwrap(await resultPromise)
}

/**
 * Return the value if `Ok`, otherwise return `defaultValue`.
 *
 * @category Unwrap
 */
export /* @__NO_SIDE_EFFECTS__ */ function unwrapOr<T, E, D>(
  result: Result<T, E>,
  defaultValue: D,
): T | D {
  return isOk(result) ? result.value : defaultValue
}

/**
 * Async variant of {@link unwrapOr}.
 *
 * @category Unwrap
 */
export async function unwrapOrAsync<T, E, D>(
  resultPromise: ResultAsync<T, E>,
  defaultValue: D,
): Promise<T | D> {
  return unwrapOr(await resultPromise, defaultValue)
}

/**
 * Return the value if `Ok`, otherwise call `onErr` and return its result.
 *
 * @category Unwrap
 */
export /* @__NO_SIDE_EFFECTS__ */ function unwrapOrElse<T, E, U>(
  result: Result<T, E>,
  onErr: (error: E) => U,
): T | U {
  return isOk(result) ? result.value : onErr(result.error)
}

/**
 * Async variant of {@link unwrapOrElse}.
 *
 * @category Unwrap
 */
export async function unwrapOrElseAsync<T, E, U>(
  resultPromise: ResultAsync<T, E>,
  onErr: (error: E) => U | PromiseLike<U>,
): Promise<T | U> {
  const result = await resultPromise
  return isOk(result) ? result.value : onErr(result.error)
}

// #endregion

// #region Internal helpers

function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'then' in value &&
    typeof (value as { then: unknown }).then === 'function'
  )
}

// #endregion

// #region Factory

/**
 * Configuration for {@link createResult}.
 *
 * @category Factory
 */
export type ResultConfig<E = unknown> =
  | {
      mapError?: (error: unknown) => E
      mapFinallyError?: (error: unknown) => unknown
    }
  | ((error: unknown) => E)

/**
 * Interface returned by {@link createResult}.
 *
 * @template E The bound error type.
 * @category Factory
 */
export interface ResultInterface<E = unknown> {
  ok: typeof ok
  err(error: E): Err<E>
  okAsync: typeof okAsync
  errAsync(error: E): ResultAsync<never, E>

  isOk: typeof isOk
  isErr: typeof isErr

  /**
   * Unified capture entry point. Accepts a sync/async factory or a `PromiseLike`.
   */
  from<T, F = E>(
    fn: () => T,
    options: CaptureOptions<T, F> & {
      finally: (result: Result<T, F>) => Promise<void>
    },
  ): ResultAsync<T, F | FinallyError<T, F>>
  from<T, F = E>(
    fn: () => T,
    options?: CaptureOptions<T, F>,
  ): Result<T, F | FinallyError<T, F>> | ResultAsync<T, F | FinallyError<T, F>>
  from<T, F = E>(
    fn: () => PromiseLike<T>,
    options?: CaptureOptions<T, F>,
  ): ResultAsync<T, F | FinallyError<T, F>>
  from<T, F = E>(
    promise: PromiseLike<T>,
    options?: CaptureOptions<T, F>,
  ): ResultAsync<T, F | FinallyError<T, F>>

  fromThrowable<T, F = E>(
    fn: () => T,
    options: CaptureOptions<T, F> & {
      finally: (result: Result<T, F>) => Promise<void>
    },
  ): ResultAsync<T, F | FinallyError<T, F>>
  fromThrowable<T, F = E>(
    fn: () => T,
    options?: CaptureOptions<T, F>,
  ): Result<T, F | FinallyError<T, F>> | ResultAsync<T, F | FinallyError<T, F>>

  fromPromise<T, F = E>(
    promise: PromiseLike<T>,
    options?: CaptureOptions<T, F>,
  ): ResultAsync<T, F | FinallyError<T, F>>

  fromAsyncThrowable<T, F = E>(
    fn: () => PromiseLike<T>,
    options?: CaptureOptions<T, F>,
  ): ResultAsync<T, F | FinallyError<T, F>>

  map<T, U>(result: Result<T, E>, fn: (value: T) => U): Result<U, E>
  mapAsync<T, U>(
    result: ResultAsync<T, E>,
    fn: (value: T) => U | PromiseLike<U>,
  ): Promise<Result<U, E>>
  mapErr<T, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F>
  mapErrAsync<T, F>(
    result: ResultAsync<T, E>,
    fn: (error: E) => F | PromiseLike<F>,
  ): Promise<Result<T, F>>
  flatMap<T, U>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>,
  ): Result<U, E>
  flatMapAsync<T, U>(
    result: ResultAsync<T, E>,
    fn: (value: T) => Result<U, E> | ResultAsync<U, E>,
  ): Promise<Result<U, E>>

  match: typeof match
  matchAsync: typeof matchAsync

  unwrap: typeof unwrap
  unwrapOr: typeof unwrapOr
  unwrapOrElse: typeof unwrapOrElse
  unwrapAsync: typeof unwrapAsync
  unwrapOrAsync: typeof unwrapOrAsync
  unwrapOrElseAsync: typeof unwrapOrElseAsync

  onFinally: typeof onFinally
  onFinallyAsync: typeof onFinallyAsync
}

/**
 * Create a {@link ResultInterface} with pre-bound error mapping.
 *
 * @param options Optional mapping configuration or a single `mapError` function.
 * @returns A bound {@link ResultInterface}.
 * @category Factory
 *
 * @example
 * ```ts
 * const R = createResult((e) => e instanceof Error ? e : new Error(String(e)))
 *
 * const result = R.from(() => JSON.parse(rawInput))
 * ```
 */
export function createResult<E = unknown>(
  options?: ResultConfig<E>,
): ResultInterface<E> {
  const mapError: (e: unknown) => E =
    typeof options === 'function'
      ? options
      : (options?.mapError ?? ((e) => e as E))

  const mapFinallyError: (e: unknown) => unknown =
    typeof options === 'function'
      ? (e) => e
      : (options?.mapFinallyError ?? ((e) => e))

  // Single any-boundary: handleResult's return type depends on whether
  // options.finally is sync or async, which TypeScript cannot narrow here.
  function handleResult<T, F>(
    result: Result<T, F>,
    opts?: CaptureOptions<T, F>,
  ): any {
    if (opts?.finally) {
      return onFinally(
        result,
        opts.finally as (result: Result<T, F>) => void,
        opts.mapFinallyError ??
          (mapFinallyError as unknown as (e: unknown) => unknown),
      )
    }
    return result
  }

  function from<T, F = E>(
    input: PromiseLike<T> | (() => T | PromiseLike<T>),
    opts?: CaptureOptions<T, F>,
  ):
    | Result<T, F | FinallyError<T, F>>
    | ResultAsync<T, F | FinallyError<T, F>> {
    const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F

    if (typeof input === 'function') {
      try {
        const value = input()
        if (isPromiseLike<T>(value))
          return fromPromise(value, catchFn).then((res) =>
            handleResult(res, opts),
          )
        return handleResult(ok(value) as Result<T, F>, opts)
      } catch (error) {
        return handleResult(err(catchFn(error)) as Result<T, F>, opts)
      }
    }

    return fromPromise(input, catchFn).then((res) => handleResult(res, opts))
  }

  return {
    ok,
    err: (error: E) => err(error),
    okAsync,
    errAsync: (error: E) => Promise.resolve(err(error)),
    isOk,
    isErr,

    from: from as ResultInterface<E>['from'],

    fromThrowable<T, F = E>(fn: () => T, opts?: CaptureOptions<T, F>) {
      const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F
      try {
        return handleResult(ok(fn()) as Result<T, F>, opts)
      } catch (error) {
        return handleResult(err(catchFn(error)) as Result<T, F>, opts)
      }
    },

    fromPromise<T, F = E>(
      promise: PromiseLike<T>,
      opts?: CaptureOptions<T, F>,
    ) {
      const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F
      return fromPromise(promise, catchFn).then((res) =>
        handleResult(res, opts),
      )
    },

    fromAsyncThrowable<T, F = E>(
      fn: () => PromiseLike<T>,
      opts?: CaptureOptions<T, F>,
    ) {
      const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F
      return fromAsyncThrowable(fn, catchFn).then((res) =>
        handleResult(res, opts),
      )
    },

    map,
    mapAsync,
    mapErr,
    mapErrAsync,
    flatMap,
    flatMapAsync,
    match,
    matchAsync,
    unwrap,
    unwrapAsync,
    unwrapOr,
    unwrapOrAsync,
    unwrapOrElse,
    unwrapOrElseAsync,
    onFinally,
    onFinallyAsync,
  }
}

// #endregion

// #region Utility types

/**
 * Extract the `Ok` value type from a {@link Result}.
 *
 * @template R A {@link Result} type.
 * @category Utility Types
 */
export type ResultOk<R extends Result<unknown, unknown>> = R extends Result<
  infer TData,
  unknown
>
  ? TData
  : never

/**
 * Extract the `Err` error type from a {@link Result}.
 *
 * @template R A {@link Result} type.
 * @category Utility Types
 */
export type ResultErr<R extends Result<unknown, unknown>> = R extends Result<
  unknown,
  infer TError
>
  ? TError
  : never

/**
 * Extract the `Ok` value type from a {@link ResultAsync}.
 *
 * @template R A {@link ResultAsync} type.
 * @category Utility Types
 */
export type ResultAsyncOk<R extends ResultAsync<unknown, unknown>> =
  R extends ResultAsync<infer TData, unknown> ? TData : never

/**
 * Extract the `Err` error type from a {@link ResultAsync}.
 *
 * @template R A {@link ResultAsync} type.
 * @category Utility Types
 */
export type ResultAsyncErr<R extends ResultAsync<unknown, unknown>> =
  R extends ResultAsync<unknown, infer TError> ? TError : never

// #endregion
