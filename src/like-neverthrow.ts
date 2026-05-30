import { FinallyError, NonErrorThrown } from './index.js'

export { NonErrorThrown, FinallyError }

export type Result<T, E> =
  | { type: 'ok'; value: T; ok: true }
  | { type: 'err'; error: E; ok: false }

export type ResultAsync<T, E> = Promise<Result<T, E>>

export function ok<T>(value: T): Result<T, never> {
  return { type: 'ok', value, ok: true }
}

export function err<E>(error: E): Result<never, E> {
  return { type: 'err', error, ok: false }
}

export function isOk<T, E>(
  result: Result<T, E>,
): result is { type: 'ok'; value: T; ok: true } {
  return result.ok === true
}

export function isErr<T, E>(
  result: Result<T, E>,
): result is { type: 'err'; error: E; ok: false } {
  return result.ok === false
}

export interface CaptureOptions<T, E> {
  catch?: (error: unknown) => E
  finally?: (result: Result<T, E>) => void | Promise<void>
  mapFinallyError?: (error: unknown) => unknown
}

function wrapError(e: unknown): Error {
  return e instanceof Error ? e : new NonErrorThrown(e)
}

export function fromThrowable<T, E = unknown>(
  fn: () => T,
  options?: CaptureOptions<T, E>,
): Result<T, E | FinallyError<T, E>> | ResultAsync<T, E | FinallyError<T, E>> {
  const mapError = options?.catch ?? ((e: unknown) => e as E)
  try {
    const val = fn()
    const res: Result<T, E> = { type: 'ok', value: val, ok: true }
    return handleFinally(res, options)
  } catch (e) {
    const res: Result<T, E> = { type: 'err', error: mapError(e), ok: false }
    return handleFinally(res, options)
  }
}

function handleFinally<T, E>(
  result: Result<T, E>,
  options?: CaptureOptions<T, E>,
): Result<T, E | FinallyError<T, E>> | ResultAsync<T, E | FinallyError<T, E>> {
  if (!options?.finally) return result
  const mapper = options.mapFinallyError ?? ((e: unknown) => e)
  try {
    const res = options.finally(result)
    if (res && typeof res === 'object' && 'then' in res) {
      return (res as any).then(
        () => result,
        (e: any) =>
          ({
            type: 'err',
            error: new FinallyError(result as any, mapper(e)),
            ok: false,
          }) as any,
      )
    }
    return result
  } catch (e) {
    return {
      type: 'err',
      error: new FinallyError(result as any, mapper(e)),
      ok: false,
    } as any
  }
}

export function map<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  return isOk(result) ? ok(fn(result.value)) : (result as any)
}

export function flatMap<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>,
): Result<U, E> {
  return isOk(result) ? fn(result.value) : (result as any)
}

export function unwrap<T, E>(result: Result<T, E>): T {
  if (isOk(result)) return result.value
  throw wrapError(result.error)
}

export function match<T, E, U, V>(
  result: Result<T, E>,
  onOk: (value: T) => U,
  onErr: (error: E) => V,
): U | V {
  return isOk(result) ? onOk(result.value) : onErr(result.error)
}

export function createResult<E = unknown>(options?: {
  mapError?: (error: unknown) => E
  mapFinallyError?: (error: unknown) => unknown
}) {
  const mapError = options?.mapError ?? ((e: unknown) => e as E)
  return {
    ok,
    err,
    fromThrowable: <T>(fn: () => T, opts?: CaptureOptions<T, E>) =>
      fromThrowable(fn, { catch: mapError, ...opts }),
    map,
    flatMap,
    unwrap,
    match,
  }
}
