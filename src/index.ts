// #region Core types

export interface Ok<T> {
  readonly ok: true
  readonly value: T
}

export interface Err<E> {
  readonly ok: false
  readonly error: E
}

export type Result<T, E> = Ok<T> | Err<E>
export type ResultAsync<T, E> = Promise<Result<T, E>>

// #endregion

// #region Constructors

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value }
}

export function err<E>(error: E): Err<E> {
  return { ok: false, error }
}

// #endregion

// #region Internal helpers

function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    'then' in value &&
    typeof (value as { then: unknown }).then === 'function'
  )
}

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

export interface ResultFactory<E> {
  from<T>(fn: () => PromiseLike<T>): ResultAsync<T, E>
  from<T>(fn: () => T): Result<T, E>
  from<T>(promise: PromiseLike<T>): ResultAsync<T, E>
}

export function createResult<E>(
  mapError: (error: unknown) => E,
): ResultFactory<E> {
  return {
    from: createFrom(mapError),
  }
}

// #endregion

// #region Default entry points

export const from = createFrom<Error>((error) =>
  error instanceof Error ? error : new Error(String(error)),
)

export const fromUnknown = createFrom<unknown>((error) => error)

// #endregion

// #region Type verification

class CustomError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = 'CustomError'
  }
}

const R = createResult((error) =>
  error instanceof Error
    ? new CustomError(error.message)
    : new CustomError(String(error)),
)

const syncOk = from(() => 123)
// expected: Result<number, Error>

const asyncOk = from(async () => 123)
// expected: ResultAsync<number, Error>

const rawThrow = fromUnknown((): number => {
  throw 'wat'
})
// expected: Result<number, unknown>

const typedSyncOk = R.from(() => 123)
// expected: Result<number, CustomError>

// @ts-ignore sync from should not return ResultAsync
const bad1: ResultAsync<number, Error> = syncOk

// @ts-ignore async from should not return plain Result
const bad2: Result<number, Error> = asyncOk

// @ts-ignore typed factory should not widen to plain Error
const bad3: Result<number, Error> = typedSyncOk

// @ts-ignore raw path should stay unknown
const bad4: Result<number, Error> = rawThrow

// #endregion
