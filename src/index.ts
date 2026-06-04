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