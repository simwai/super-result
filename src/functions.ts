import { FinallyError, NonErrorThrown, err, ok } from './index.js'

import type { Err, Ok, RawResult } from './index.js'

export type { Ok, Err, RawResult }

export { ok, err, NonErrorThrown, FinallyError }

function isOk<T, E>(r: RawResult<T, E>): r is Ok<T> {
  return r.ok === true
}
function isPromise(v: unknown): v is Promise<unknown> {
  return !!v && typeof v === 'object' && 'then' in v
}
function isRawResult(v: unknown): v is RawResult<unknown, unknown> {
  return !!v && typeof v === 'object' && 'ok' in v
}

/**
 * Maps the success value using the provided function.
 * Works with both synchronous RawResult and Promise of RawResult.
 *
 * @param input - The Result or Promise of a Result to map.
 * @param fn - The transformation function for the success value.
 * @category Functional API
 *
 * @example
 * ```ts
 * const res = ok(21)
 * const doubled = map(res, n => n * 2) // { ok: true, value: 42 }
 * ```
 */
export function map<T, E, U>(
  input: RawResult<T, E>,
  fn: (v: T) => U,
): RawResult<U, E>
export function map<T, E, U>(
  input: Promise<RawResult<T, E>>,
  fn: (v: T) => U,
): Promise<RawResult<U, E>>
export function map(input: any, fn: any): any {
  if (isPromise(input)) return input.then((r: any) => map(r, fn))
  return isOk(input) ? ok(fn(input.value)) : input
}

/**
 * Maps the success value to a new RawResult and flattens it.
 * Works with both synchronous RawResult and Promise of RawResult.
 *
 * @param input - The Result or Promise of a Result to flatMap.
 * @param fn - The function returning a new Result.
 * @category Functional API
 *
 * @example
 * ```ts
 * const res = ok('/api/user')
 * const data = await flatMap(res, url => fromPromise(fetch(url), e => e))
 * ```
 */
export function flatMap<T, E, U>(
  input: RawResult<T, E>,
  fn: (v: T) => RawResult<U, E>,
): RawResult<U, E>
export function flatMap<T, E, U>(
  input: Promise<RawResult<T, E>>,
  fn: (v: T) => RawResult<U, E>,
): Promise<RawResult<U, E>>
export function flatMap(input: any, fn: any): any {
  if (isPromise(input)) return input.then((r: any) => flatMap(r, fn))
  return isOk(input) ? fn(input.value) : input
}

/**
 * Executes a callback regardless of whether the result is a success or failure.
 *
 * @param input - The Result or Promise of a Result.
 * @param callback - The side-effect function to run.
 * @param mapFinallyError - Optional function to map errors thrown in the callback.
 * @category Functional API
 */
export function onFinally<T, E>(
  input: RawResult<T, E>,
  callback: (r: RawResult<T, E>) => void | Promise<void>,
  mapFinallyError?: (error: unknown) => unknown,
): RawResult<T, E | unknown>
export function onFinally<T, E>(
  input: Promise<RawResult<T, E>>,
  callback: (r: RawResult<T, E>) => void | Promise<void>,
  mapFinallyError?: (error: unknown) => unknown,
): Promise<RawResult<T, E | unknown>>
export function onFinally(
  input: any,
  callback: any,
  mapFinallyError?: any,
): any {
  const mapper = mapFinallyError ?? ((e: unknown) => e)
  const toErrResult = (
    original: RawResult<any, any>,
    err: unknown,
  ): RawResult<any, any> => {
    return new FinallyError(original, mapper(err))
  }

  if (isPromise(input)) {
    return input.then(
      (r: any) => onFinally(r, callback, mapFinallyError),
      (e: any) => toErrResult(err(undefined) as RawResult<any, any>, e),
    )
  }
  try {
    const res = callback(input)
    if (isPromise(res)) {
      return res.then(
        () => input,
        (e) => toErrResult(input, e),
      )
    }
    return input
  } catch (e) {
    return toErrResult(input, e)
  }
}

/**
 * Returns the value if success, otherwise throws the error.
 * Works with both synchronous and asynchronous inputs.
 *
 * @param input - The Result or Promise of a Result to unwrap.
 * @category Functional API
 */
export function unwrap<T, E>(input: RawResult<T, E>): T
export function unwrap<T, E>(input: Promise<RawResult<T, E>>): Promise<T>
export function unwrap(input: any): any {
  if (isPromise(input)) return input.then((r: any) => unwrap(r))
  if (isOk(input)) return input.value
  throw input.error
}

/**
 * Synchronously returns the value if success, otherwise throws the error.
 *
 * @param input - The synchronous RawResult to unwrap.
 * @category Functional API
 */
export function unwrapSync<T, E>(input: RawResult<T, E>): T {
  if (isOk(input)) return input.value
  if (input.error instanceof Error) throw input.error
  throw new NonErrorThrown(input.error)
}

/**
 * Returns the value if success, otherwise returns the provided default value.
 *
 * @param input - The Result or Promise of a Result.
 * @param defaultValue - The fallback value.
 * @category Functional API
 */
export function unwrapOr<T, E, D>(
  input: RawResult<T, E>,
  defaultValue: D,
): T | D
export function unwrapOr<T, E, D>(
  input: Promise<RawResult<T, E>>,
  defaultValue: D,
): Promise<T | D>
export function unwrapOr(input: any, defaultValue: any): any {
  if (isPromise(input)) return input.then((r: any) => unwrapOr(r, defaultValue))
  return isOk(input) ? input.value : defaultValue
}

/**
 * Returns the value if success, otherwise calls the fallback function with the error.
 *
 * @param input - The Result or Promise of a Result.
 * @param fallback - The function to call if result is an error.
 * @category Functional API
 */
export function unwrapOrElse<T, E, D>(
  input: RawResult<T, E>,
  fallback: (e: E) => D,
): T | D
export function unwrapOrElse<T, E, D>(
  input: Promise<RawResult<T, E>>,
  fallback: (e: E) => D,
): Promise<T | D>
export function unwrapOrElse(input: any, fallback: any): any {
  if (isPromise(input)) return input.then((r: any) => unwrapOrElse(r, fallback))
  return isOk(input) ? input.value : fallback(input.error)
}

/**
 * Executes a function and captures any thrown error into a RawResult.
 *
 * @param fn - The synchronous function to wrap.
 * @category Functional API
 */
export function fromThrowable<T>(fn: () => T): RawResult<T, unknown> {
  try {
    return ok(fn())
  } catch (e) {
    return err(e)
  }
}

/**
 * Wraps a PromiseLike into a RawResult, capturing any rejection.
 *
 * @param promise - The promise to wrap.
 * @param mapError - Function to map the caught error.
 * @category Functional API
 */
export async function fromPromise<T, E>(
  promise: PromiseLike<T>,
  mapError: (error: unknown) => E,
): Promise<RawResult<T, E>> {
  try {
    return ok(await promise)
  } catch (e) {
    return err(mapError(e))
  }
}

/**
 * Unified capture entry point. Attempts to wrap values, promises, or functions into a Result.
 *
 * @param input - The value, promise, or function to capture.
 * @param mapError - Optional error mapper for async/function rejections.
 * @category Functional API
 *
 * @example
 * ```ts
 * const res1 = result(42) // ok(42)
 * const res2 = await result(Promise.resolve(42)) // ok(42)
 * const res3 = result(() => { throw 'err' }) // err('err')
 * ```
 */
export function result<T>(value: T): RawResult<T, unknown>
export function result<T, E>(r: RawResult<T, E>): RawResult<T, E>
export function result<T>(promise: Promise<T>): Promise<RawResult<T, unknown>>
export function result<T, E>(
  promise: Promise<RawResult<T, E>>,
): Promise<RawResult<T, E>>
export function result<T>(fn: () => T): RawResult<T, unknown>
export function result<T, E>(
  fn: () => Promise<T>,
  mapError?: (e: unknown) => E,
): Promise<RawResult<T, E>>
export function result(input: any, mapError?: (e: unknown) => any): any {
  if (typeof input === 'function' && input.length === 0) {
    try {
      const res = input()
      if (isPromise(res)) {
        return res.then(
          (v) => ok(v),
          (e) => err(mapError ? mapError(e) : e),
        )
      }
      return ok(res)
    } catch (e) {
      return err(mapError ? mapError(e) : e)
    }
  }
  if (isPromise(input)) {
    return input.then(
      (v) => (isRawResult(v) ? v : ok(v)),
      (e) => err(mapError ? mapError(e) : e),
    )
  }
  if (isRawResult(input)) return input
  return ok(input)
}

/**
 * Configuration for createResult.
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
 * Useful for ensuring consistent error structures across a module or service.
 *
 * @param options - Mapping configuration or a single mapError function.
 * @category Functional API
 *
 * @example
 * ```ts
 * const { result, map } = createResult(e => new AppError(String(e)))
 *
 * const data = await result(fetchUser(1))
 * ```
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
    fromThrowable: <T>(fn: () => T) => {
      try {
        return ok(fn())
      } catch (e) {
        return err(mapError(e))
      }
    },
    fromPromise: <T>(p: PromiseLike<T>) => fromPromise(p, mapError),
    result: <T>(input: any) => result(input, mapError),
    map,
    flatMap,
    onFinally: (input: any, callback: any) =>
      onFinally(input, callback, mapFinallyError as any),
    unwrap,
    unwrapSync,
    unwrapOr,
    unwrapOrElse,
  }
}
