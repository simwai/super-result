export interface Ok<T> {
  readonly ok: true;
  value: T;
}

export interface Err<E> {
  readonly ok: false;
  error: E;
}

export type RawResult<T, E> = Ok<T> | Err<E>;

export function ok<T>(value: T): RawResult<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): RawResult<never, E> {
  return { ok: false, error };
}

function isOk<T, E>(r: RawResult<T, E>): r is Ok<T> {
  return r.ok === true;
}
function isErr<T, E>(r: RawResult<T, E>): r is Err<E> {
  return r.ok === false;
}
function isPromise(v: unknown): v is Promise<unknown> {
  return !!v && typeof v === "object" && "then" in v;
}

export class NonErrorThrown extends Error {
  public readonly value: unknown;
  constructor(value: unknown) {
    super("Non-error value thrown.");
    this.name = "NonErrorThrown";
    this.value = value;
  }
}

export class FinallyError<T, E> extends Error implements Err<unknown> {
  readonly ok = false;
  readonly error: unknown;
  public readonly originalResult: RawResult<T, E>;
  constructor(originalResult: RawResult<T, E>, error: unknown) {
    super("Error occurred in finally block.");
    this.name = "FinallyError";
    this.originalResult = originalResult;
    this.error = error;
  }
}

export class Result<T, E> implements PromiseLike<T> {
  private constructor(private readonly inner: RawResult<T, E> | Promise<RawResult<T, E>>) {}

  static sync<T, E>(value: RawResult<T, E>): Result<T, E> {
    return new Result(value);
  }
  static async<T, E>(promise: Promise<RawResult<T, E>>): Result<T, E> {
    return new Result(promise);
  }
  static ok<T>(value: T): Result<T, never> {
    return Result.sync(ok(value));
  }
  static err<E>(error: E): Result<never, E> {
    return Result.sync(err(error));
  }
  static fromThrowable<T>(fn: () => T): Result<T, unknown> {
    try { return Result.ok(fn()); } catch (e) { return Result.err(e); }
  }
  static async fromPromiseLike<T, E>(
    promise: PromiseLike<T>,
    mapError: (e: unknown) => E
  ): Promise<Result<T, E>> {
    try { return Result.ok(await promise); } catch (e) { return Result.err(mapError(e)); }
  }

  static async all<T, E>(
    results: (Result<T, E> | Promise<Result<T, E>>)[]
  ): Promise<Result<T[], E>> {
    const promises = results.map(async r => {
      const result = r instanceof Result ? r : await r;
      return result.unwrap();
    });
    try {
      const values = await Promise.all(promises);
      return Result.ok(values);
    } catch (error) {
      return Result.err(error as E);
    }
  }

  static async allSettled<T, E>(
    results: (Result<T, E> | Promise<Result<T, E>>)[]
  ): Promise<Result<RawResult<T, E>[], never>> {
    const promises = results.map(async r => {
      try {
        const result = r instanceof Result ? r : await r;
        const value = await result.unwrap();
        return ok(value) as RawResult<T, E>;
      } catch (e) {
        return err(e as E);
      }
    });
    const settled = await Promise.all(promises);
    return Result.ok(settled);
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>
  ): Promise<TResult1 | TResult2> {
    const promise = this.inner instanceof Promise ? this.inner : Promise.resolve(this.inner);
    return promise.then(
      r => (isOk(r) ? onfulfilled?.(r.value) : onrejected?.(r.error)),
      onrejected
    ) as Promise<TResult1 | TResult2>;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.inner instanceof Promise) {
      const newPromise = this.inner.then(r => (isOk(r) ? ok(fn(r.value)) : r));
      return new Result(newPromise);
    } else {
      const r = this.inner;
      return new Result(isOk(r) ? ok(fn(r.value)) : r);
    }
  }

  flatMap<U>(fn: (value: T) => Result<U, E> | RawResult<U, E> | Promise<RawResult<U, E>>): Result<U, E> {
    const flatten = (r: RawResult<T, E>): RawResult<U, E> | Promise<RawResult<U, E>> => {
      if (isErr(r)) return r;
      const next = fn(r.value);
      return next instanceof Result ? (next.inner instanceof Promise ? next.inner : Promise.resolve(next.inner)) : next;
    };
    if (this.inner instanceof Promise) {
      return new Result(this.inner.then(flatten));
    } else {
      const next = flatten(this.inner);
      return new Result(next instanceof Promise ? next : Promise.resolve(next));
    }
  }

  finally(
    callback: (result: RawResult<T, E>) => void | Promise<void>,
    mapFinallyError?: (error: unknown) => unknown
  ): Result<T, E | unknown> {
    const mapper = mapFinallyError ?? ((e: unknown) => e);
    const toErrResult = (original: RawResult<T, E>, err: unknown): RawResult<T, E | unknown> => {
      const fe = mapper(err);
      return new FinallyError(original, fe);
    };

    if (this.inner instanceof Promise) {
      const newPromise = this.inner.then(
        (result): RawResult<T, E | unknown> | Promise<RawResult<T, E | unknown>> => {
          const res = callback(result);
          if (isPromise(res)) {
            return res.then(
              () => result as RawResult<T, E | unknown>,
              (e) => toErrResult(result, e)
            );
          }
          return result as RawResult<T, E | unknown>;
        },
        (e): RawResult<T, E | unknown> => toErrResult(err(e) as RawResult<T, E>, e)
      );
      return new Result(newPromise);
    } else {
      const syncInner = this.inner as RawResult<T, E>;
      try {
        const res = callback(syncInner);
        if (isPromise(res)) {
          const promise = res.then(
            () => syncInner as RawResult<T, E | unknown>,
            (e) => toErrResult(syncInner, e)
          );
          return new Result(promise);
        }
        return new Result(syncInner as RawResult<T, E | unknown>);
      } catch (e) {
        return new Result(toErrResult(syncInner, e));
      }
    }
  }

  async unwrap(): Promise<T> {
    const r = await this.inner;
    if (isOk(r)) return r.value;
    throw r.error;
  }

  unwrapSync(): T {
    if (this.inner instanceof Promise) throw new Error("Cannot unwrapSync a pending result");
    if (isOk(this.inner)) return this.inner.value;
    if (this.inner.error instanceof Error) throw this.inner.error;
    throw new NonErrorThrown(this.inner.error);
  }

  async unwrapOr<D>(defaultValue: D): Promise<T | D> {
    const r = await this.inner;
    return isOk(r) ? r.value : defaultValue;
  }

  async unwrapOrElse<D>(fallback: (error: E) => D): Promise<T | D> {
    const r = await this.inner;
    return isOk(r) ? r.value : fallback(r.error);
  }

  async isOk(): Promise<boolean> {
    const r = await this.inner;
    return isOk(r);
  }
  async isErr(): Promise<boolean> {
    const r = await this.inner;
    return isErr(r);
  }
  isOkSync(): boolean {
    if (this.inner instanceof Promise) throw new Error("Cannot check sync on pending result");
    return isOk(this.inner);
  }
  isErrSync(): boolean {
    if (this.inner instanceof Promise) throw new Error("Cannot check sync on pending result");
    return isErr(this.inner);
  }
}