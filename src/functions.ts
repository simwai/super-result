import { FinallyError, NonErrorThrown, err, ok } from './index.js'
import type { Err, Ok, RawResult } from './index.js'

export type { Ok, Err, RawResult }
export { ok, err, NonErrorThrown, FinallyError }

function isPromiseLike<T>(v: unknown): v is PromiseLike<T> {
  return (
    !!v &&
    (typeof v === 'object' || typeof v === 'function') &&
    'then' in v &&
    typeof (v as any).then === 'function'
  )
}
function isRawResult(v: unknown): v is RawResult<unknown, unknown> {
  return !!v && typeof v === 'object' && 'ok' in v
}
function wrapError(e: unknown): Error {
  return e instanceof Error ? e : new NonErrorThrown(e)
}

function _isOk<T, E>(r: RawResult<T, E>): r is Ok<T> {
  return r.ok === true
}

/**
 * Checks if the result is a success.
 *
 * @category Functional API
 */
export function isOk<T, E>(input: RawResult<T, E>): boolean
export function isOk<T, E>(
  input: PromiseLike<RawResult<T, E>>,
): Promise<boolean>
export function isOk(input: any): any {
  if (isPromiseLike(input))
    return Promise.resolve(input).then((r) => _isOk(r as any))
  return input.ok === true
}

/**
 * Checks if the result is a failure.
 *
 * @category Functional API
 */
export function isErr<T, E>(input: RawResult<T, E>): boolean
export function isErr<T, E>(
  input: PromiseLike<RawResult<T, E>>,
): Promise<boolean>
export function isErr(input: any): any {
  if (isPromiseLike(input))
    return Promise.resolve(input).then((r) => !(r as any).ok)
  return input.ok === false
}

/**
 * Maps the success value using the provided function.
 *
 * @category Functional API
 */
export function map<T, E, U>(
  input: RawResult<T, E>,
  fn: (v: T) => U,
): RawResult<U, E>
export function map<T, E, U>(
  input: PromiseLike<RawResult<T, E>>,
  fn: (v: T) => U,
): Promise<RawResult<U, E>>
export function map(input: any, fn: any): any {
  if (isPromiseLike(input)) return input.then((r: any) => map(r, fn))
  return _isOk(input) ? ok(fn(input.value)) : input
}

/**
 * Maps the success value to a new {@link RawResult} and flattens it.
 *
 * @category Functional API
 */
export function flatMap<T, E, U>(
  input: RawResult<T, E>,
  fn: (v: T) => RawResult<U, E> | PromiseLike<RawResult<U, E>>,
): RawResult<U, E> | Promise<RawResult<U, E>>
export function flatMap<T, E, U>(
  input: PromiseLike<RawResult<T, E>>,
  fn: (v: T) => RawResult<U, E> | PromiseLike<RawResult<U, E>>,
): Promise<RawResult<U, E>>
export function flatMap(input: any, fn: any): any {
  if (isPromiseLike(input)) return input.then((r: any) => flatMap(r, fn))
  return _isOk(input) ? fn(input.value) : input
}

/**
 * Executes a callback regardless of whether the result is a success or failure.
 *
 * @category Functional API
 */
export function final<T, E>(
  input: RawResult<T, E>,
  callback: (r: RawResult<T, E>) => void | PromiseLike<void>,
  mapFinallyError?: (error: unknown) => unknown,
): RawResult<T, E | unknown> | Promise<RawResult<T, E | unknown>>
export function final<T, E>(
  input: PromiseLike<RawResult<T, E>>,
  callback: (r: RawResult<T, E>) => void | PromiseLike<void>,
  mapFinallyError?: (error: unknown) => unknown,
): Promise<RawResult<T, E | unknown>>
export function final(input: any, callback: any, mapFinallyError?: any): any {
  const mapper = mapFinallyError ?? ((e: unknown) => e)
  const toErrResult = (
    original: RawResult<any, any>,
    err: unknown,
  ): RawResult<any, any> => {
    return new FinallyError(original, mapper(err))
  }
  if (isPromiseLike(input)) {
    return input.then(
      (r: any) => final(r, callback, mapFinallyError),
      (e: any) => toErrResult(err(undefined) as RawResult<any, any>, e),
    )
  }
  try {
    const res = callback(input)
    if (isPromiseLike(res)) {
      return res.then(
        () => input,
        (e: any) => toErrResult(input, e),
      )
    }
    return input
  } catch (e) {
    return toErrResult(input, e)
  }
}

/**
 * Returns the value if success, otherwise throws the error.
 *
 * @category Functional API
 */
export function unwrap<T, E>(input: RawResult<T, E>): T
export function unwrap<T, E>(input: PromiseLike<RawResult<T, E>>): Promise<T>
export function unwrap(input: any): any {
  if (isPromiseLike(input)) return input.then((r: any) => unwrap(r))
  if (_isOk(input)) return input.value
  throw wrapError(input.error)
}

/**
 * Returns the value if success, otherwise returns the provided default value.
 *
 * @category Functional API
 */
export function unwrapOr<T, E, D>(
  input: RawResult<T, E>,
  defaultValue: D,
): T | D
export function unwrapOr<T, E, D>(
  input: PromiseLike<RawResult<T, E>>,
  defaultValue: D,
): Promise<T | D>
export function unwrapOr(input: any, defaultValue: any): any {
  if (isPromiseLike(input))
    return input.then((r: any) => unwrapOr(r, defaultValue))
  return _isOk(input) ? input.value : defaultValue
}

/**
 * Returns the value if success, otherwise calls the fallback function with the error.
 *
 * @category Functional API
 */
export function unwrapOrElse<T, E, D>(
  input: RawResult<T, E>,
  fallback: (e: E) => D,
): T | D
export function unwrapOrElse<T, E, D>(
  input: PromiseLike<RawResult<T, E>>,
  fallback: (e: E) => D,
): Promise<T | D>
export function unwrapOrElse(input: any, fallback: any): any {
  if (isPromiseLike(input))
    return input.then((r: any) => unwrapOrElse(r, fallback))
  return _isOk(input) ? input.value : fallback(input.error)
}

/**
 * Pattern matches on the result.
 *
 * @category Functional API
 */
export function match<T, E, U, V>(
  input: RawResult<T, E>,
  onOk: (value: T) => U | PromiseLike<U>,
  onErr: (error: E) => V | PromiseLike<V>,
): U | V | Promise<U | V>
export function match<T, E, U, V>(
  input: PromiseLike<RawResult<T, E>>,
  onOk: (value: T) => U | PromiseLike<U>,
  onErr: (error: E) => V | PromiseLike<V>,
): Promise<U | V>
export function match(input: any, onOk: any, onErr: any): any {
  if (isPromiseLike(input)) return input.then((r: any) => match(r, onOk, onErr))
  return _isOk(input) ? onOk(input.value) : onErr(input.error)
}

/**
 * Unified capture entry point.
 *
 * @category Functional API
 */
export function from<T, E = unknown>(
  input: T | PromiseLike<T> | (() => T | PromiseLike<T>),
  mapError: (e: unknown) => E = (e) => e as E,
): RawResult<T, E> | Promise<RawResult<T, E>> {
  if (typeof input === 'function') {
    try {
      const res = (input as () => any)()
      if (isPromiseLike(res)) {
        return Promise.resolve(res).then(
          (v) => ok(v) as RawResult<T, E>,
          (e) => err(mapError(e)) as RawResult<T, E>,
        ) as Promise<RawResult<T, E>>
      }
      return ok(res as T) as RawResult<T, E>
    } catch (e) {
      return err(mapError(e)) as RawResult<T, E>
    }
  }
  if (isPromiseLike(input)) {
    return Promise.resolve(input).then(
      (v) =>
        isRawResult(v) ? (v as RawResult<T, E>) : (ok(v) as RawResult<T, E>),
      (e) => err(mapError(e)) as RawResult<T, E>,
    ) as Promise<RawResult<T, E>>
  }
  if (isRawResult(input)) return input as RawResult<T, E>
  return ok(input as T) as RawResult<T, E>
}

/**
 * Configuration for {@link createResult}.
 *
 * @category Functional API
 */
export type ResultConfig<E = unknown, FE = unknown> =
  | {
      mapError?: (error: unknown) => E
      mapFinallyError?: (error: unknown) => FE
    }
  | ((error: unknown) => E)

/**
 * Creates a bound functional API with pre-configured error mapping.
 *
 * @category Functional API
 */
export function createResult<E = unknown, FE = unknown>(
  options?: ResultConfig<E, FE>,
) {
  const mapError =
    typeof options === 'function'
      ? options
      : (options?.mapError ?? ((e: unknown) => e as E))
  const mapFinallyError =
    typeof options === 'function'
      ? (e: unknown) => e
      : (options?.mapFinallyError ?? ((e: unknown) => e))
  return {
    ok,
    err: (e: E) => err(e),
    from: <T>(input: T | PromiseLike<T> | (() => T | PromiseLike<T>)) =>
      from(input, mapError),
    map,
    flatMap,
    final: (input: any, callback: any) =>
      final(input, callback, mapFinallyError as any),
    unwrap,
    unwrapOr,
    unwrapOrElse,
    isOk,
    isErr,
    match,
  }
}
