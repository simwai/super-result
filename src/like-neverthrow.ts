import { FinallyError, NonErrorThrown } from './index.js'

export { FinallyError, NonErrorThrown }

// #region Core Classes

/**
 * Base interface for Result variants in the neverthrow-compatible API.
 */
export interface ResultBase<T, E> {
  readonly type: 'ok' | 'err'

  /** Check if the result is successful. */
  isOk(): this is Ok<T>

  /** Check if the result is a failure. */
  isErr(): this is Err<E>

  /** Map the success value. */
  map<U>(fn: (value: T) => U): Result<U, E>

  /** Map the error value. */
  mapErr<F>(fn: (error: E) => F): Result<T, F>

  /** Map and flatten the success value. */
  flatMap<U, F = E>(fn: (value: T) => Result<U, F>): Result<U, F | E>

  /** Alias for flatMap. */
  andThen<U, F = E>(fn: (value: T) => Result<U, F>): Result<U, F | E>

  /** Handle the error value by returning a new Result. */
  orElse<U = T, F = E>(fn: (error: E) => Result<U, F>): Result<U | T, F>

  /** Branch logic based on result type. */
  match<U, V>(onOk: (value: T) => U, onErr: (error: E) => V): U | V

  /** Unwrap value or return default. */
  unwrapOr<D>(defaultValue: D): T | D

  /** Unwrap value or call fallback. */
  unwrapOrElse<D>(fn: (error: E) => D): T | D
}

/**
 * Successful Result variant.
 * @category Core Classes
 */
export class Ok<T> implements ResultBase<T, never> {
  readonly type = 'ok' as const
  constructor(readonly value: T) {}

  isOk(): this is Ok<T> {
    return true
  }
  isErr(): this is Err<never> {
    return false
  }

  map<U>(fn: (value: T) => U): Result<U, never> {
    return new Ok(fn(this.value))
  }
  mapErr<F>(): Result<T, F> {
    return this as any
  }
  flatMap<U, F>(fn: (value: T) => Result<U, F>): Result<U, F> {
    return fn(this.value)
  }
  andThen<U, F>(fn: (value: T) => Result<U, F>): Result<U, F> {
    return this.flatMap(fn)
  }
  orElse<U, F>(): Result<T | U, F> {
    return this as any
  }
  match<U, V>(onOk: (value: T) => U): U | V {
    return onOk(this.value)
  }
  unwrapOr<D>(): T | D {
    return this.value
  }
  unwrapOrElse<D>(): T | D {
    return this.value
  }
}

/**
 * Failed Result variant.
 * @category Core Classes
 */
export class Err<E> implements ResultBase<never, E> {
  readonly type = 'err' as const
  constructor(readonly error: E) {}

  isOk(): this is Ok<never> {
    return false
  }
  isErr(): this is Err<E> {
    return true
  }

  map<U>(): Result<U, E> {
    return this as any
  }
  mapErr<F>(fn: (error: E) => F): Result<never, F> {
    return new Err(fn(this.error))
  }
  flatMap<U, F>(): Result<U, E | F> {
    return this as any
  }
  andThen<U, F>(): Result<U, E | F> {
    return this as any
  }
  orElse<T, F>(fn: (error: E) => Result<T, F>): Result<T, F> {
    return fn(this.error)
  }
  match<U, V>(_: any, onErr: (error: E) => V): U | V {
    return onErr(this.error)
  }
  unwrapOr<D>(defaultValue: D): never | D {
    return defaultValue
  }
  unwrapOrElse<D>(fn: (error: E) => D): never | D {
    return fn(this.error)
  }
}

/**
 * A discriminated union representing either a success (Ok) or a failure (Err).
 *
 * @template T - The type of the value.
 * @template E - The type of the error.
 * @category Core Types
 */
export type Result<T, E> = Ok<T> | Err<E>

/**
 * A promise of a Result.
 *
 * @template T - The type of the value.
 * @template E - The type of the error.
 * @category Core Types
 */
export type ResultAsync<T, E> = Promise<Result<T, E>>

// #endregion

// #region Constructors

/**
 * Create a successful Result.
 *
 * @param value - Success value.
 * @category Constructors
 *
 * @example
 * ```ts
 * const res = ok(42)
 * ```
 */
export function ok<T>(value: T): Result<T, never> {
  return new Ok(value)
}

/**
 * Create a failed Result.
 *
 * @param error - Error value.
 * @category Constructors
 *
 * @example
 * ```ts
 * const res = err('fail')
 * ```
 */
export function err<E>(error: E): Result<never, E> {
  return new Err(error)
}

/**
 * Create a successful ResultAsync.
 *
 * @param value - Success value.
 * @category Constructors
 */
export function okAsync<T>(value: T): ResultAsync<T, never> {
  return Promise.resolve(new Ok(value))
}

/**
 * Create a failed ResultAsync.
 *
 * @param error - Error value.
 * @category Constructors
 */
export function errAsync<E>(error: E): ResultAsync<never, E> {
  return Promise.resolve(new Err(error))
}

// #endregion

// #region Capture

/**
 * Wrap a synchronous operation that might throw.
 *
 * @param fn - The function to wrap.
 * @param mapError - Error mapper.
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
 * Wrap a promise into a ResultAsync.
 *
 * @param promise - The promise to wrap.
 * @param mapError - Error mapper.
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
 * Wrap an asynchronous factory that might throw.
 *
 * @param fn - The async function to wrap.
 * @param mapError - Error mapper.
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

// #region External Helpers (Functional style still supported)

/**
 * Check if a Result is Ok.
 * @category Guards
 */
export function isOk<T, E>(res: Result<T, E>): res is Ok<T> {
  return res.isOk()
}

/**
 * Check if a Result is Err.
 * @category Guards
 */
export function isErr<T, E>(res: Result<T, E>): res is Err<E> {
  return res.isErr()
}

/**
 * Map the success value.
 * @category Mapping
 */
export function map<T, E, U>(res: Result<T, E>, fn: (v: T) => U): Result<U, E> {
  return res.map(fn)
}

/**
 * Map the success value asynchronously.
 * @category Mapping
 */
export async function mapAsync<T, E, U>(
  res: ResultAsync<T, E>,
  fn: (v: T) => U | Promise<U>,
): ResultAsync<U, E> {
  const r = await res
  if (r.isErr()) return r as any
  return ok(await fn(r.value))
}

/**
 * Map the error value.
 * @category Mapping
 */
export function mapErr<T, E, F>(
  res: Result<T, E>,
  fn: (e: E) => F,
): Result<T, F> {
  return res.mapErr(fn)
}

/**
 * Map the error value asynchronously.
 * @category Mapping
 */
export async function mapErrAsync<T, E, F>(
  res: ResultAsync<T, E>,
  fn: (e: E) => F | Promise<F>,
): ResultAsync<T, F> {
  const r = await res
  if (r.isOk()) return r as any
  return err(await fn(r.error))
}

/**
 * Map and flatten the success value.
 * @category Transformation
 */
export function flatMap<T, E, U, F = E>(
  res: Result<T, E>,
  fn: (v: T) => Result<U, F>,
): Result<U, E | F> {
  return res.isOk() ? res.flatMap(fn) : res as any
}

/**
 * Map and flatten the success value asynchronously.
 * @category Transformation
 */
export async function flatMapAsync<T, E, U, F = E>(
  res: ResultAsync<T, E>,
  fn: (v: T) => Result<U, F> | ResultAsync<U, F>,
): ResultAsync<U, E | F> {
  const r = await res
  if (r.isErr()) return r as any
  return fn(r.value)
}

/** Alias for flatMap. @category Transformation */
export const andThen = flatMap
/** Alias for flatMapAsync. @category Transformation */
export const andThenAsync = flatMapAsync

/**
 * Handle error by returning a new Result.
 * @category Mapping
 */
export function orElse<T, E, U = T, F = E>(
  res: Result<T, E>,
  fn: (e: E) => Result<U, F>,
): Result<T | U, F> {
  return res.isErr() ? res.orElse(fn) : res as any
}

/**
 * Handle error by returning a new Result asynchronously.
 * @category Mapping
 */
export async function orElseAsync<T, E, U = T, F = E>(
  res: ResultAsync<T, E>,
  fn: (e: E) => Result<U, F> | ResultAsync<U, F>,
): ResultAsync<T | U, F> {
  const r = await res
  if (r.isOk()) return r as any
  return fn(r.error)
}

/**
 * Combine multiple Results into one Result with an array of values.
 * @category Combination
 */
export function combine<T extends Result<any, any>[]>(
  results: T,
): Result<{ [K in keyof T]: ResultOk<T[K]> }, ResultErr<T[number]>> {
  const values = [] as any
  for (const r of results) {
    if (r.isErr()) return r as any
    values.push(r.value)
  }
  return ok(values) as any
}

/**
 * Combine multiple Results or ResultAsyncs into one.
 * @category Combination
 */
export async function combineAsync<
  T extends (Result<any, any> | ResultAsync<any, any>)[],
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
    const res = await r
    if (res.isErr()) return res as any
    values.push(res.value)
  }
  return ok(values) as any
}

/**
 * Branch logic based on Result type.
 * @category Pattern Matching
 */
export function match<T, E, U, V>(
  res: Result<T, E>,
  onOk: (v: T) => U,
  onErr: (e: E) => V,
): U | V {
  return res.match(onOk, onErr)
}

/**
 * Branch logic based on ResultAsync resolution.
 * @category Pattern Matching
 */
export async function matchAsync<T, E, U, V>(
  res: ResultAsync<T, E>,
  onOk: (v: T) => U | Promise<U>,
  onErr: (e: E) => V | Promise<V>,
): Promise<U | V> {
  const r = await res
  if (r.isOk()) return onOk(r.value)
  return onErr(r.error)
}

/**
 * Return Ok value or throw.
 * @category Unwrap
 */
export function unwrap<T, E>(res: Result<T, E>): T {
  if (res.isOk()) return res.value
  if (res.error instanceof Error) throw res.error
  throw new NonErrorThrown(res.error)
}

/**
 * Await and unwrap value or throw.
 * @category Unwrap
 */
export async function unwrapAsync<T, E>(res: ResultAsync<T, E>): Promise<T> {
  return unwrap(await res)
}

/**
 * Return value or default.
 * @category Unwrap
 */
export function unwrapOr<T, E, D>(res: Result<T, E>, defaultValue: D): T | D {
  return res.unwrapOr(defaultValue)
}

/**
 * Await and return value or default.
 * @category Unwrap
 */
export async function unwrapOrAsync<T, E, D>(
  res: ResultAsync<T, E>,
  defaultValue: D,
): Promise<T | D> {
  const r = await res
  return r.unwrapOr(defaultValue)
}

/**
 * Return value or call fallback.
 * @category Unwrap
 */
export function unwrapOrElse<T, E, D>(res: Result<T, E>, fn: (e: E) => D): T | D {
  return res.unwrapOrElse(fn)
}

/**
 * Await and return value or call fallback.
 * @category Unwrap
 */
export async function unwrapOrElseAsync<T, E, D>(
  res: ResultAsync<T, E>,
  fn: (e: E) => D | Promise<D>,
): Promise<T | D> {
  const r = await res
  if (r.isOk()) return r.value
  return fn(r.error)
}

/**
 * Execute a callback regardless of success or failure.
 * @category Lifecycle
 */
export function onFinally<T, E>(
  res: Result<T, E>,
  callback: (result: Result<T, E>) => void | Promise<void>,
  mapFinallyError?: (error: unknown) => unknown,
): Result<T, E | unknown> | ResultAsync<T, E | unknown> {
  const mapper = mapFinallyError ?? ((e) => e)
  try {
    const r = callback(res)
    if (r instanceof Promise) {
      return r.then(
        () => res,
        (error) => err(new FinallyError(res as any, mapper(error))),
      )
    }
    return res as any
  } catch (error) {
    return err(new FinallyError(res as any, mapper(error)))
  }
}

/**
 * Await ResultAsync and execute callback.
 * @category Lifecycle
 */
export async function onFinallyAsync<T, E>(
  res: ResultAsync<T, E>,
  callback: (result: Result<T, E>) => void | Promise<void>,
  mapFinallyError?: (error: unknown) => unknown,
): ResultAsync<T, E | unknown> {
  const r = await res
  return onFinally(r, callback, mapFinallyError)
}

// #endregion

// #region Factory

/** Options for createResult mappers. @category Factory */
export interface CaptureOptions<T, E> {
  catch?: (error: unknown) => E
  finally?: (result: Result<T, E>) => void | Promise<void>
  mapFinallyError?: (error: unknown) => unknown
}

/** Configuration for createResult. @category Factory */
export type ResultConfig<E = unknown> =
  | {
      mapError?: (error: unknown) => E
      mapFinallyError?: (error: unknown) => unknown
    }
  | ((error: unknown) => E)

/** Interface returned by createResult. @category Factory */
export interface ResultInterface<E = unknown> {
  ok: typeof ok
  err: typeof err
  okAsync: typeof okAsync
  errAsync: typeof errAsync
  isOk: typeof isOk
  isErr: typeof isErr
  from<T, F = E>(
    input: PromiseLike<T> | (() => T | PromiseLike<T>),
    opts?: CaptureOptions<T, F>,
  ): Result<T, F | FinallyError<T, F>> | ResultAsync<T, F | FinallyError<T, F>>
  fromThrowable<T, F = E>(
    fn: () => T,
    opts?: CaptureOptions<T, F>,
  ): Result<T, F | FinallyError<T, F>>
  fromPromise<T, F = E>(
    promise: PromiseLike<T>,
    opts?: CaptureOptions<T, F>,
  ): ResultAsync<T, F | FinallyError<T, F>>
  fromAsyncThrowable<T, F = E>(
    fn: () => PromiseLike<T>,
    opts?: CaptureOptions<T, F>,
  ): ResultAsync<T, F | FinallyError<T, F>>
  map: typeof map
  mapAsync: typeof mapAsync
  mapErr: typeof mapErr
  mapErrAsync: typeof mapErrAsync
  flatMap: typeof flatMap
  flatMapAsync: typeof flatMapAsync
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
 * Creates a bound API with pre-bound error mapping.
 *
 * @param options - Error mapping configuration.
 * @category Factory
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

  function handleResult<T, F>(
    result: Result<T, F>,
    opts?: CaptureOptions<T, F>,
  ): any {
    if (opts?.finally) {
      return onFinally(
        result,
        opts.finally as any,
        opts.mapFinallyError ?? (mapFinallyError as any),
      )
    }
    return result
  }

  function from<T, F = E>(
    input: PromiseLike<T> | (() => T | PromiseLike<T>),
    opts?: CaptureOptions<T, F>,
  ): any {
    const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F
    if (typeof input === 'function') {
      try {
        const val = input()
        if (val instanceof Promise) {
          return val.then(
            (v) => handleResult(ok(v) as any, opts),
            (e) => handleResult(err(catchFn(e)) as any, opts),
          )
        }
        return handleResult(ok(val) as any, opts)
      } catch (e) {
        return handleResult(err(catchFn(e)) as any, opts)
      }
    }
    return (input as PromiseLike<T>).then(
      (v) => handleResult(ok(v) as any, opts),
      (e) => handleResult(err(catchFn(e)) as any, opts),
    )
  }

  return {
    ok,
    err,
    okAsync,
    errAsync,
    isOk,
    isErr,
    from,
    fromThrowable: (fn, opts) => from(fn, opts),
    fromPromise: (p, opts) => from(p, opts),
    fromAsyncThrowable: (fn, opts) => from(fn, opts),
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
    unwrapOr,
    unwrapOrElse,
    unwrapAsync,
    unwrapOrAsync,
    unwrapOrElseAsync,
    onFinally,
    onFinallyAsync,
  }
}

// #endregion

// #region Utility types

/** Extract success type from Result or ResultAsync. @category Utility Types */
export type ResultOk<R> =
  R extends Result<infer T, any>
    ? T
    : R extends ResultAsync<infer T, any>
      ? T
      : never
/** Extract error type from Result or ResultAsync. @category Utility Types */
export type ResultErr<R> =
  R extends Result<any, infer E>
    ? E
    : R extends ResultAsync<any, infer E>
      ? E
      : never
/** Extract success type from ResultAsync. @category Utility Types */
export type ResultAsyncOk<R> = ResultOk<R>
/** Extract error type from ResultAsync. @category Utility Types */
export type ResultAsyncErr<R> = ResultErr<R>

// #endregion
