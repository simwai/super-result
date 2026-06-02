import { FinallyError, NonErrorThrown } from './index.js'

export { FinallyError, NonErrorThrown }

// #region Core Classes

export interface ResultBase<T, E> {
  readonly type: 'ok' | 'err'
  isOk(): this is Ok<T>
  isErr(): this is Err<E>

  map<U>(fn: (value: T) => U): Result<U, E>
  mapErr<F>(fn: (error: E) => F): Result<T, F>
  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E>
  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>
  orElse<F>(fn: (error: E) => Result<T, F>): Result<T, F>
  match<U, V>(onOk: (value: T) => U, onErr: (error: E) => V): U | V
  unwrapOr<D>(defaultValue: D): T | D
  unwrapOrElse<D>(fn: (error: E) => D): T | D
}

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
  flatMap<U>(fn: (value: T) => Result<U, never>): Result<U, never> {
    return fn(this.value)
  }
  andThen<U>(fn: (value: T) => Result<U, never>): Result<U, never> {
    return this.flatMap(fn)
  }
  orElse<F>(): Result<T, F> {
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
  flatMap<U>(): Result<U, E> {
    return this as any
  }
  andThen<U>(): Result<U, E> {
    return this as any
  }
  orElse<F>(fn: (error: E) => Result<never, F>): Result<never, F> {
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
 * @template T The type of the value.
 * @template E The type of the error.
 */
export type Result<T, E> = Ok<T> | Err<E>

/**
 * A promise of a Result.
 *
 * @template T The type of the value.
 * @template E The type of the error.
 */
export type ResultAsync<T, E> = Promise<Result<T, E>>

// #endregion

// #region Constructors

export function ok<T>(value: T): Result<T, never> {
  return new Ok(value)
}

export function err<E>(error: E): Result<never, E> {
  return new Err(error)
}

export function okAsync<T>(value: T): ResultAsync<T, never> {
  return Promise.resolve(new Ok(value))
}

export function errAsync<E>(error: E): ResultAsync<never, E> {
  return Promise.resolve(new Err(error))
}

// #endregion

// #region Capture

export function fromThrowable<T, E>(
  fn: () => T,
  mapError: (error: unknown) => E
): Result<T, E> {
  try {
    return ok(fn())
  } catch (error) {
    return err(mapError(error))
  }
}

export async function fromPromise<T, E>(
  promise: PromiseLike<T>,
  mapError: (error: unknown) => E
): ResultAsync<T, E> {
  try {
    const value = await promise
    return ok(value)
  } catch (error) {
    return err(mapError(error))
  }
}

export async function fromAsyncThrowable<T, E>(
  fn: () => PromiseLike<T>,
  mapError: (error: unknown) => E
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

export function isOk<T, E>(res: Result<T, E>): res is Ok<T> {
  return res.isOk()
}

export function isErr<T, E>(res: Result<T, E>): res is Err<E> {
  return res.isErr()
}

export function map<T, E, U>(res: Result<T, E>, fn: (v: T) => U): Result<U, E> {
  return res.map(fn)
}

export async function mapAsync<T, E, U>(
  res: ResultAsync<T, E>,
  fn: (v: T) => U | Promise<U>
): ResultAsync<U, E> {
  const r = await res
  if (r.isErr()) return r as any
  return ok(await fn(r.value))
}

export function mapErr<T, E, F>(res: Result<T, E>, fn: (e: E) => F): Result<T, F> {
  return res.mapErr(fn)
}

export async function mapErrAsync<T, E, F>(
  res: ResultAsync<T, E>,
  fn: (e: E) => F | Promise<F>
): ResultAsync<T, F> {
  const r = await res
  if (r.isOk()) return r as any
  return err(await fn(r.error))
}

export function flatMap<T, E, U>(res: Result<T, E>, fn: (v: T) => Result<U, E>): Result<U, E> {
  return res.flatMap(fn)
}

export async function flatMapAsync<T, E, U>(
  res: ResultAsync<T, E>,
  fn: (v: T) => Result<U, E> | ResultAsync<U, E>
): ResultAsync<U, E> {
  const r = await res
  if (r.isErr()) return r as any
  return fn(r.value)
}

export const andThen = flatMap
export const andThenAsync = flatMapAsync

export function orElse<T, E, F>(res: Result<T, E>, fn: (e: E) => Result<T, F>): Result<T, F> {
  return res.orElse(fn)
}

export async function orElseAsync<T, E, F>(
  res: ResultAsync<T, E>,
  fn: (e: E) => Result<T, F> | ResultAsync<T, F>
): ResultAsync<T, F> {
  const r = await res
  if (r.isOk()) return r as any
  return fn(r.error)
}

export function combine<T extends Result<any, any>[]>(
  results: T
): Result<{ [K in keyof T]: ResultOk<T[K]> }, ResultErr<T[number]>> {
  const values = [] as any
  for (const r of results) {
    if (r.isErr()) return r as any
    values.push(r.value)
  }
  return ok(values) as any
}

export async function combineAsync<T extends (Result<any, any> | ResultAsync<any, any>)[]>(
  results: T
): Promise<Result<{ [K in keyof T]: ResultOk<Awaited<T[K]>> }, ResultErr<Awaited<T[number]>>>> {
  const values = [] as any
  for (const r of results) {
    const res = await r
    if (res.isErr()) return res as any
    values.push(res.value)
  }
  return ok(values) as any
}

export function match<T, E, U, V>(res: Result<T, E>, onOk: (v: T) => U, onErr: (e: E) => V): U | V {
  return res.match(onOk, onErr)
}

export async function matchAsync<T, E, U, V>(
  res: ResultAsync<T, E>,
  onOk: (v: T) => U | Promise<U>,
  onErr: (e: E) => V | Promise<V>
): Promise<U | V> {
  const r = await res
  if (r.isOk()) return onOk(r.value)
  return onErr(r.error)
}

export function unwrap<T, E>(res: Result<T, E>): T {
  if (res.isOk()) return res.value
  if (res.error instanceof Error) throw res.error
  throw new NonErrorThrown(res.error)
}

export async function unwrapAsync<T, E>(res: ResultAsync<T, E>): Promise<T> {
  return unwrap(await res)
}

export function unwrapOr<T, E, D>(res: Result<T, E>, defaultValue: D): T | D {
  return res.unwrapOr(defaultValue)
}

export async function unwrapOrAsync<T, E, D>(res: ResultAsync<T, E>, defaultValue: D): Promise<T | D> {
  const r = await res
  return r.unwrapOr(defaultValue)
}

export function unwrapOrElse<T, E, D>(res: Result<T, E>, fn: (e: E) => D): T | D {
  return res.unwrapOrElse(fn)
}

export async function unwrapOrElseAsync<T, E, D>(res: ResultAsync<T, E>, fn: (e: E) => D | Promise<D>): Promise<T | D> {
  const r = await res
  if (r.isOk()) return r.value
  return fn(r.error)
}

export function onFinally<T, E>(
  res: Result<T, E>,
  callback: (result: Result<T, E>) => void | Promise<void>,
  mapFinallyError?: (error: unknown) => unknown
): Result<T, E | unknown> | ResultAsync<T, E | unknown> {
  const mapper = mapFinallyError ?? ((e) => e)
  try {
    const r = callback(res)
    if (r instanceof Promise) {
      return r.then(
        () => res,
        (error) => err(new FinallyError(res as any, mapper(error)))
      )
    }
    return res
  } catch (error) {
    return err(new FinallyError(res as any, mapper(error)))
  }
}

export async function onFinallyAsync<T, E>(
  res: ResultAsync<T, E>,
  callback: (result: Result<T, E>) => void | Promise<void>,
  mapFinallyError?: (error: unknown) => unknown
): ResultAsync<T, E | unknown> {
  const r = await res
  return onFinally(r, callback, mapFinallyError)
}

// #endregion

// #region Factory

export interface CaptureOptions<T, E> {
  catch?: (error: unknown) => E
  finally?: (result: Result<T, E>) => void | Promise<void>
  mapFinallyError?: (error: unknown) => unknown
}

export type ResultConfig<E = unknown> =
  | {
      mapError?: (error: unknown) => E
      mapFinallyError?: (error: unknown) => unknown
    }
  | ((error: unknown) => E)

export interface ResultInterface<E = unknown> {
  ok: typeof ok
  err: typeof err
  okAsync: typeof okAsync
  errAsync: typeof errAsync
  isOk: typeof isOk
  isErr: typeof isErr
  from<T, F = E>(
    input: PromiseLike<T> | (() => T | PromiseLike<T>),
    opts?: CaptureOptions<T, F>
  ): Result<T, F | FinallyError<T, F>> | ResultAsync<T, F | FinallyError<T, F>>
  fromThrowable<T, F = E>(fn: () => T, opts?: CaptureOptions<T, F>): Result<T, F | FinallyError<T, F>>
  fromPromise<T, F = E>(promise: PromiseLike<T>, opts?: CaptureOptions<T, F>): ResultAsync<T, F | FinallyError<T, F>>
  fromAsyncThrowable<T, F = E>(fn: () => PromiseLike<T>, opts?: CaptureOptions<T, F>): ResultAsync<T, F | FinallyError<T, F>>
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

export function createResult<E = unknown>(options?: ResultConfig<E>): ResultInterface<E> {
  const mapError: (e: unknown) => E =
    typeof options === 'function' ? options : (options?.mapError ?? ((e) => e as E))

  const mapFinallyError: (e: unknown) => unknown =
    typeof options === 'function' ? (e) => e : (options?.mapFinallyError ?? ((e) => e))

  function handleResult<T, F>(result: Result<T, F>, opts?: CaptureOptions<T, F>): any {
    if (opts?.finally) {
      return onFinally(
        result,
        opts.finally as any,
        opts.mapFinallyError ?? (mapFinallyError as any)
      )
    }
    return result
  }

  function from<T, F = E>(
    input: PromiseLike<T> | (() => T | PromiseLike<T>),
    opts?: CaptureOptions<T, F>
  ): any {
    const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F
    if (typeof input === 'function') {
      try {
        const val = input()
        if (val instanceof Promise) {
          return val.then(
            (v) => handleResult(ok(v) as any, opts),
            (e) => handleResult(err(catchFn(e)) as any, opts)
          )
        }
        return handleResult(ok(val) as any, opts)
      } catch (e) {
        return handleResult(err(catchFn(e)) as any, opts)
      }
    }
    return input.then(
      (v) => handleResult(ok(v) as any, opts),
      (e) => handleResult(err(catchFn(e)) as any, opts)
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

export type ResultOk<R> = R extends Result<infer T, any> ? T : R extends ResultAsync<infer T, any> ? T : never
export type ResultErr<R> = R extends Result<any, infer E> ? E : R extends ResultAsync<any, infer E> ? E : never
export type ResultAsyncOk<R> = ResultOk<R>
export type ResultAsyncErr<R> = ResultErr<R>

// #endregion
