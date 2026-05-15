// #region Core types

/**
 * Successful result carrying a value.
 * @template T The success value type.
 */
export type Ok<T> = {
	readonly type: 'ok';
	readonly value: T;
};

/**
 * Failed result carrying an error.
 * @template E The error type.
 */
export type Err<E> = {
	readonly type: 'err';
	readonly error: E;
};

/**
 * Discriminated union of {@link Ok} and {@link Err}.
 * @template T The success value type.
 * @template E The error type.
 */
export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Async variant — a `Promise` that always resolves to a {@link Result}.
 * @template T The success value type.
 * @template E The error type.
 */
export type ResultAsync<T, E> = Promise<Result<T, E>>;

// #endregion

// #region Errors

/**
 * Thrown by {@link unwrap} when the error value is not an `Error` instance.
 * Wraps the raw thrown value in `.value` for inspection.
 */
export class NonErrorThrown extends TypeError {
	public readonly value: unknown;

	/**
	 * @param value The non-Error value that was thrown.
	 */
	public constructor(value: unknown) {
		super('Non-error value thrown.');
		this.name = 'NonErrorThrown';
		this.value = value;
	}
}

// #endregion

// #region Constructors

export const ok = <T>(value: T): Ok<T> => ({ type: 'ok', value });

export const err = <E>(error: E): Err<E> => ({ type: 'err', error });

export const okAsync = <T>(value: T): ResultAsync<T, never> =>
	Promise.resolve(ok(value));

export const errAsync = <E>(error: E): ResultAsync<never, E> =>
	Promise.resolve(err(error));

// #endregion

// #region Guards

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> =>
	result.type === 'ok';

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> =>
	result.type === 'err';

// #endregion

// #region Capture helpers

/**
 * Runs `fn` and wraps the return value in {@link Ok}, or wraps any thrown value in {@link Err}.
 * The error type is `unknown` — narrow it yourself or use {@link createResult} for automatic mapping.
 * @param fn Synchronous function to execute.
 * @returns `Ok<T>` on success, `Err<unknown>` on throw.
 */
export const fromThrowable = <T>(fn: () => T): Result<T, unknown> => {
	try {
		return ok(fn());
	} catch (error) {
		return err(error);
	}
};

/**
 * Wraps an existing `PromiseLike` in a {@link ResultAsync}.
 * @param promise The promise to wrap.
 * @param mapError Maps a rejection value to `E`.
 * @returns `Ok<T>` on resolve, `Err<E>` on reject.
 */
export const fromPromise = <T, E>(
	promise: PromiseLike<T>,
	mapError: (error: unknown) => E,
): ResultAsync<T, E> =>
	Promise.resolve(promise)
		.then<Result<T, E>>(value => ok(value))
		.catch<Result<T, E>>(error => err(mapError(error)));

/**
 * Calls an async factory `fn` and wraps the resolved value in {@link Ok}.
 * @param fn Async factory function.
 * @param mapError Maps a rejection or thrown value to `E`.
 * @returns `Ok<T>` on resolve, `Err<E>` on reject or throw.
 */
export const fromAsyncThrowable = <T, E>(
	fn: () => PromiseLike<T>,
	mapError: (error: unknown) => E,
): ResultAsync<T, E> =>
	Promise.resolve()
		.then(fn)
		.then<Result<T, E>>(value => ok(value))
		.catch<Result<T, E>>(error => err(mapError(error)));

/**
 * Lifts an already-resolved {@link Result} into a {@link ResultAsync}.
 * @param result The result to lift.
 */
export const fromAsyncResult = <T, E>(result: Result<T, E>): ResultAsync<T, E> =>
	Promise.resolve(result);

// #endregion

// #region Pattern matching

/**
 * Exhaustive match over a {@link Result}. Exactly one branch runs.
 * @param result The result to match.
 * @param onOk Called with the value when `Ok`.
 * @param onErr Called with the error when `Err`.
 * @returns The return value of whichever branch ran.
 */
export const match = <T, E, U, V>(
	result: Result<T, E>,
	onOk: (value: T) => U,
	onErr: (error: E) => V,
): U | V => (isOk(result) ? onOk(result.value) : onErr(result.error));

/**
 * Async variant of {@link match}. Awaits `resultPromise` before branching.
 * @param resultPromise The async result to match.
 * @param onOk Called with the value when `Ok`.
 * @param onErr Called with the error when `Err`.
 * @returns The return value of whichever branch ran.
 */
export const matchAsync = async <T, E, U, V>(
	resultPromise: ResultAsync<T, E>,
	onOk: (value: T) => U | PromiseLike<U>,
	onErr: (error: E) => V | PromiseLike<V>,
): Promise<U | V> => {
	const result = await resultPromise;
	return match(result, onOk, onErr);
};

// #endregion

// #region Unwrap helpers

/**
 * Returns the value if `Ok`.
 * @param result The result to unwrap.
 * @returns The success value.
 * @throws {Error} The original error if it is an `Error` instance.
 * @throws {NonErrorThrown} If the error is not an `Error` instance.
 */
export const unwrap = <T, E>(result: Result<T, E>): T => {
	if (isOk(result)) {
		return result.value;
	}

	if (result.error instanceof Error) {
		throw result.error;
	}

	throw new NonErrorThrown(result.error);
};

/**
 * Async variant of {@link unwrap}.
 * @param resultPromise The async result to unwrap.
 * @throws {Error} The original error if it is an `Error` instance.
 * @throws {NonErrorThrown} If the error is not an `Error` instance.
 */
export const unwrapAsync = async <T, E>(resultPromise: ResultAsync<T, E>): Promise<T> =>
	unwrap(await resultPromise);

/**
 * Returns the value if `Ok`, otherwise returns `defaultValue`.
 * @param result The result to unwrap.
 * @param defaultValue Fallback value returned when `Err`.
 */
export const unwrapOr = <T, E, D>(result: Result<T, E>, defaultValue: D): T | D =>
	isOk(result) ? result.value : defaultValue;

/**
 * Async variant of {@link unwrapOr}.
 * @param resultPromise The async result to unwrap.
 * @param defaultValue Fallback value returned when `Err`.
 */
export const unwrapOrAsync = async <T, E, D>(
	resultPromise: ResultAsync<T, E>,
	defaultValue: D,
): Promise<T | D> => unwrapOr(await resultPromise, defaultValue);

/**
 * Returns the value if `Ok`, otherwise calls `onErr` with the error and returns its result.
 * @param result The result to unwrap.
 * @param onErr Called with the error when `Err`.
 */
export const unwrapOrElse = <T, E, U>(
	result: Result<T, E>,
	onErr: (error: E) => U,
): T | U => (isOk(result) ? result.value : onErr(result.error));

/**
 * Async variant of {@link unwrapOrElse}.
 * @param resultPromise The async result to unwrap.
 * @param onErr Called with the error when `Err`.
 */
export const unwrapOrElseAsync = async <T, E, U>(
	resultPromise: ResultAsync<T, E>,
	onErr: (error: E) => U | PromiseLike<U>,
): Promise<T | U> => {
	const result = await resultPromise;
	return isOk(result) ? result.value : onErr(result.error);
};

// #endregion

// #region Internal helpers

const hasThen = (value: object): value is { then: unknown } => 'then' in value;

const isPromiseLike = <T>(value: unknown): value is PromiseLike<T> =>
	value !== null &&
	typeof value === 'object' &&
	hasThen(value) &&
	typeof value.then === 'function';

const fromThrowableMapped = <T, E>(
	fn: () => T,
	mapError: (error: unknown) => E,
): Result<T, E> => {
	try {
		return ok(fn());
	} catch (error) {
		return err(mapError(error));
	}
};

// #endregion

// #region Factory interface

/**
 * Interface returned by {@link createResult}.
 * All capture helpers have `mapError` pre-bound so error types are consistent across a call-site.
 * @template E The bound error type.
 */
export interface ResultInterface<E> {
	ok: typeof ok;
	err(error: E): Err<E>;
	okAsync: typeof okAsync;
	errAsync(error: E): ResultAsync<never, E>;

	isOk: typeof isOk;
	isErr: typeof isErr;

	/**
	 * Unified capture entry point. Accepts a sync/async factory or a `PromiseLike`.
	 * Errors are mapped through the bound `mapError`.
	 * @param fn Sync or async factory, or a `PromiseLike`.
	 */
	from<T>(fn: () => T): Result<T, E>;
	from<T>(fn: () => PromiseLike<T>): ResultAsync<T, E>;
	from<T>(promise: PromiseLike<T>): ResultAsync<T, E>;

	fromThrowable<T>(fn: () => T): Result<T, E>;
	fromPromise<T>(promise: PromiseLike<T>): ResultAsync<T, E>;
	fromAsyncThrowable<T>(fn: () => PromiseLike<T>): ResultAsync<T, E>;
	fromAsyncResult<T>(result: Result<T, E>): ResultAsync<T, E>;

	match: typeof match;
	matchAsync: typeof matchAsync;

	unwrap: typeof unwrap;
	unwrapOr: typeof unwrapOr;
	unwrapOrElse: typeof unwrapOrElse;
	unwrapAsync: typeof unwrapAsync;
	unwrapOrAsync: typeof unwrapOrAsync;
	unwrapOrElseAsync: typeof unwrapOrElseAsync;
}

// #endregion

// #region Factory

/**
 * Creates a {@link ResultInterface} with a pre-bound `mapError` function.
 * Use this to enforce a consistent error type across an entire module or service.
 * @template E The bound error type.
 * @param mapError Maps any thrown or rejected value to `E`.
 * @returns A {@link ResultInterface} with `mapError` pre-bound to all capture helpers.
 * @example
 * const Result = createResult((e) => e instanceof AppError ? e : new AppError(String(e)))
 * const r = Result.from(() => JSON.parse(raw)) // Result<unknown, AppError>
 */
export const createResult = <E>(mapError: (error: unknown) => E): ResultInterface<E> => {
	function from<T>(fn: () => T): Result<T, E>;
	function from<T>(fn: () => PromiseLike<T>): ResultAsync<T, E>;
	function from<T>(promise: PromiseLike<T>): ResultAsync<T, E>;
	function from<T>(
		input: PromiseLike<T> | (() => T) | (() => PromiseLike<T>),
	): Result<T, E> | ResultAsync<T, E> {
		if (typeof input === 'function') {
			try {
				const value = input();
				return isPromiseLike<T>(value) ? fromPromise(value, mapError) : ok(value);
			} catch (error) {
				return err(mapError(error));
			}
		}

		return fromPromise(input, mapError);
	}

	return {
		ok,
		err: error => err(error),
		okAsync,
		errAsync: error => Promise.resolve(err(error)),
		isOk,
		isErr,
		from,
		fromThrowable: fn => fromThrowableMapped(fn, mapError),
		fromPromise: promise => fromPromise(promise, mapError),
		fromAsyncThrowable: fn => fromAsyncThrowable(fn, mapError),
		fromAsyncResult,
		match,
		matchAsync,
		unwrap,
		unwrapAsync,
		unwrapOr,
		unwrapOrAsync,
		unwrapOrElse,
		unwrapOrElseAsync,
	};
};

// #endregion

// #region Utility types

/**
 * Extracts the `Ok` value type from a {@link Result}.
 * @template R A {@link Result} type.
 */
export type ResultOk<R extends Result<unknown, unknown>> = R extends Result<infer TData, unknown> ? TData : never;

/**
 * Extracts the `Err` error type from a {@link Result}.
 * @template R A {@link Result} type.
 */
export type ResultErr<R extends Result<unknown, unknown>> = R extends Result<unknown, infer TError> ? TError : never;

/**
 * Extracts the `Ok` value type from a {@link ResultAsync}.
 * @template R A {@link ResultAsync} type.
 */
export type ResultAsyncOk<R extends ResultAsync<unknown, unknown>> = R extends ResultAsync<infer TData, unknown> ? TData : never;

/**
 * Extracts the `Err` error type from a {@link ResultAsync}.
 * @template R A {@link ResultAsync} type.
 */
export type ResultAsyncErr<R extends ResultAsync<unknown, unknown>> = R extends ResultAsync<unknown, infer TError> ? TError : never;

// #endregion
