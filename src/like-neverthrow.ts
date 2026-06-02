import { FinallyError, NonErrorThrown } from './index.js'

export { FinallyError, NonErrorThrown }

// #region Core Types

/**
 * Discriminator-based success variant.
 *
 * @template T The type of the value.
 * @category Core Types
 */
export interface Ok<T> {
  readonly type: 'ok'
  readonly value: T
}

/**
 * Discriminator-based failure variant.
 *
 * @template E The type of the error.
 * @category Core Types
 */
export interface Err<E> {
  readonly type: 'err'
  readonly error: E
}

/**
 * A discriminated union representing either a success ({@link Ok}) or a failure ({@link Err}).
 *
 * @template T The type of the value.
 * @template E The type of the error.
 * @category Core Types
 */
export type Result<T, E> = Ok<T> | Err<E>

/**
 * A promise of a {@link Result}.
 *
 * @template T The type of the value.
 * @template E The type of the error.
 * @category Core Types
 */
export type ResultAsync<T, E> = Promise<Result<T, E>>

/**
 * Options for capturing errors during Result creation.
 *
 * @template T The success type.
 * @template E The error type.
 * @category Core Types
 */
export interface CaptureOptions<T, E> {
  catch?: (error: unknown) => E
  finally?: (result: Result<T, E>) => void | Promise<void>
  mapFinallyError?: (error: unknown) => unknown
}

// #endregion

// #region Basic Constructors

/**
 * Create a successful {@link Result}.
 *
 * @category Constructors
 */
export /* @__NO_SIDE_EFFECTS__ */ function ok<T>(value: T): Ok<T> {
  return { type: 'ok', value }
}

/**
 * Create a failed {@link Result}.
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

// #region Checks

/**
 * Check if a {@link Result} is successful.
 *
 * @category Guards
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.type === 'ok'
}

/**
 * Check if a {@link Result} is a failure.
 *
 * @category Guards
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.type === 'err'
}

// #endregion

// #region Capture

/**
 * Wrap a synchronous operation that might throw.
 *
 * @category Capture
 */
export function fromThrowable<T, E>(
  fn: () => T,
  mapError: (error: unknown) => E,
): Result<T, E> {
  try {
    return ok(fn())
  } catch (error) {
    return err(mapError(error))
  }
}

/**
 * Wrap a promise into a {@link ResultAsync}.
 *
 * @category Capture
 */
export async function fromPromise<T, E>(
  promise: PromiseLike<T>,
  mapError: (error: unknown) => E,
): ResultAsync<T, E> {
  try {
    const value = await promise
    return ok(value)
  } catch (error) {
    return err(mapError(error))
  }
}

/**
 * Wrap an asynchronous operation that might throw.
 *
 * @category Capture
 */
export async function fromAsyncThrowable<T, E>(
  fn: () => PromiseLike<T>,
  mapError: (error: unknown) => E,
): ResultAsync<T, E> {
  try {
    const value = await fn()
    return ok(value)
  } catch (error) {
    return err(mapError(error))
  }
}

// #endregion

// #region Mapping

/**
 * Map the success value of a {@link Result}.
 *
 * @category Mapping
 */
export /* @__NO_SIDE_EFFECTS__ */ function map<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  return isOk(result) ? ok(fn(result.value)) : result
}

/**
 * Async variant of {@link map}.
 *
 * @category Mapping
 */
export async function mapAsync<T, E, U>(
  resultPromise: ResultAsync<T, E>,
  fn: (value: T) => U | PromiseLike<U>,
): Promise<Result<U, E>> {
  const result = await resultPromise
  if (isErr(result)) return result
  return ok(await fn(result.value))
}

/**
 * Map the error value of a {@link Result}.
 *
 * @category Mapping
 */
export /* @__NO_SIDE_EFFECTS__ */ function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F,
): Result<T, F> {
  return isErr(result) ? err(fn(result.error)) : result
}

/**
 * Async variant of {@link mapErr}.
 *
 * @category Mapping
 */
export async function mapErrAsync<T, E, F>(
  resultPromise: ResultAsync<T, E>,
  fn: (error: E) => F | PromiseLike<F>,
): Promise<Result<T, F>> {
  const result = await resultPromise
  if (isOk(result)) return result
  return err(await fn(result.error))
}

/**
 * Map the success value to a new {@link Result}.
 *
 * @category Mapping
 */
export /* @__NO_SIDE_EFFECTS__ */ function flatMap<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>,
): Result<U, E> {
  return isOk(result) ? fn(result.value) : result
}

/**
 * Async variant of {@link flatMap}.
 *
 * @category Mapping
 */
export async function flatMapAsync<T, E, U>(
  resultPromise: ResultAsync<T, E>,
  fn: (value: T) => Result<U, E> | ResultAsync<U, E>,
): Promise<Result<U, E>> {
  const result = await resultPromise
  if (isErr(result)) return result
  return fn(result.value)
}

/**
 * Alias for {@link flatMap}.
 *
 * @category Mapping
 */
export const andThen = flatMap

/**
 * Alias for {@link flatMapAsync}.
 *
 * @category Mapping
 */
export const andThenAsync = flatMapAsync

/**
 * Return `result` if `Ok`, otherwise call `onErr` and return its result.
 *
 * @category Mapping
 */
export function orElse<T, E, F>(
  result: Result<T, E>,
  onErr: (error: E) => Result<T, F>,
): Result<T, F> {
  return isOk(result) ? result : onErr(result.error)
}

/**
 * Async variant of {@link orElse}.
 *
 * @category Mapping
 */
export async function orElseAsync<T, E, F>(
  resultPromise: ResultAsync<T, E>,
  onErr: (error: E) => Result<T, F> | ResultAsync<T, F>,
): Promise<Result<T, F>> {
  const result = await resultPromise
  return isOk(result) ? result : onErr(result.error)
}

/**
 * Combine multiple results into a single result containing an array of values.
 * Fails if any of the input results are an error.
 *
 * @category Combination
 */
export function combine<T extends Result<unknown, unknown>[]>(
  results: T,
): Result<{ [K in keyof T]: ResultOk<T[K]> }, ResultErr<T[number]>> {
  const values = [] as any
  for (const result of results) {
    if (isErr(result)) return result as any
    values.push(result.value)
  }
  return ok(values)
}

/**
 * Async variant of {@link combine}.
 *
 * @category Combination
 */
export async function combineAsync<
  T extends (Result<unknown, unknown> | ResultAsync<unknown, unknown>)[],
>(
  results: T,
): Promise<
  Result<
    { [K in keyof T]: ResultOk<Awaited<T[K]>> },
    ResultErr<Awaited<T[number]>>
  >
> {
  const values = [] as any
  for (const r of results) {
    const result = await r
    if (isErr(result)) return result as any
    values.push(result.value)
  }
  return ok(values)
}

// #endregion

// #region Lifecycle

/**
 * Execute a callback regardless of success or failure.
 *
 * @category Lifecycle
 */
export function onFinally<T, E>(
  result: Result<T, E>,
  callback: (result: Result<T, E>) => void | Promise<void>,
  mapFinallyError?: (error: unknown) => unknown,
): Result<T, E | unknown> | ResultAsync<T, E | unknown> {
  const mapper = mapFinallyError ?? ((e) => e)
  try {
    const res = callback(result)
    if (res instanceof Promise) {
      return res.then(
        () => result,
        (error) => err(new FinallyError(result as any, mapper(error))),
      )
    }
    return result
  } catch (error) {
    return err(new FinallyError(result as any, mapper(error)))
  }
}

/**
 * Async variant of {@link onFinally}.
 *
 * @category Lifecycle
 */
export async function onFinallyAsync<T, E>(
  resultPromise: ResultAsync<T, E>,
  callback: (result: Result<T, E>) => void | Promise<void>,
  mapFinallyError?: (error: unknown) => unknown,
): Promise<Result<T, E | unknown>> {
  const result = await resultPromise
  const final = onFinally(result, callback, mapFinallyError)
  return Promise.resolve(final)
}

// #endregion

// #region Pattern Matching

/**
 * Execute a function based on the result variant.
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
  return match(result, onOk, onErr) as any
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
 * Async variant of \{@link unwrapOr\}.
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
 * Async variant of \{@link unwrapOrElse\}.
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
  mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F>
  mapErrAsync<T, E, F>(
    result: ResultAsync<T, E>,
    fn: (error: E) => F | PromiseLike<F>,
  ): Promise<Result<T, F>>
  flatMap<T, E, U>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>,
  ): Result<U, E>
  flatMapAsync<T, E, U>(
    result: ResultAsync<T, E>,
    fn: (value: T) => Result<U, E> | ResultAsync<U, E>,
  ): Promise<Result<U, E>>

  andThen: typeof andThen
  andThenAsync: typeof andThenAsync
  orElse: typeof orElse
  orElseAsync: typeof orElseAsync
  combine: typeof combine
  combineAsync: typeof combineAsync

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
 * @returns A bound \{@link ResultInterface\}.
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
    andThen,
    andThenAsync,
    orElse,
    orElseAsync,
    combine,
    combineAsync,
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
