// #region Core types

/**
 * Successful result carrying a value.
 * @template T The success value type.
 */
export type Ok<T> = {
	readonly type: "ok";
	readonly value: T;
};

/**
 * Failed result carrying an error.
 * @template E The error type.
 */
export type Err<E> = {
	readonly type: "err";
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
export class NonErrorThrown extends Error {
	public readonly value: unknown;

	/**
	 * @param value The non-Error value that was thrown.
	 */
	public constructor(value: unknown) {
		super("Non-error value thrown.");
		this.name = "NonErrorThrown";
		this.value = value;
	}
}

/**
 * Wraps both the original result and a cleanup error when a finally block fails.
 * @template T The success value type of the original result.
 * @template E The error type of the original result.
 * @template FE The type of the finally block error.
 */
export class FinallyError<T, E, FE> extends Error {
	public readonly originalResult: Result<T, E>;
	public readonly finallyError: FE;

	constructor(originalResult: Result<T, E>, finallyError: FE) {
		super("Error occurred in finally block.");
		this.name = "FinallyError";
		this.originalResult = originalResult;
		this.finallyError = finallyError;
	}
}

// #endregion

// #region Constructors

export const ok = <T>(value: T): Ok<T> => ({ type: "ok", value });

export const err = <E>(error: E): Err<E> => ({ type: "err", error });

export const okAsync = <T>(value: T): ResultAsync<T, never> =>
	Promise.resolve(ok(value));

export const errAsync = <E>(error: E): ResultAsync<never, E> =>
	Promise.resolve(err(error));

// #endregion

// #region Guards

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> =>
	result.type === "ok";

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> =>
	result.type === "err";

// #endregion

// #region Capture helpers

/**
 * Options for result capture helpers.
 */
export interface CaptureOptions<T, E, FE = unknown> {
	/** Optional error mapper for the catch block. Overrides factory default. */
	catch?: (error: unknown) => E;
	/** Optional callback to run after the result is determined. */
	finally?: (result: Result<T, E>) => void | Promise<void>;
	/** Optional error mapper for finally block failures. Overrides factory default. */
	mapFinallyError?: (error: unknown) => FE;
}

/**
 * Runs `fn` and wraps the return value in {@link Ok}, or wraps any thrown value in {@link Err}.
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
export const fromPromise = async <T, E>(
	promise: PromiseLike<T>,
	mapError: (error: unknown) => E,
): ResultAsync<T, E> => {
	try {
		return ok(await promise);
	} catch (error) {
		return err(mapError(error));
	}
};

/**
 * Calls an async factory `fn` and wraps the resolved value in {@link Ok}.
 * @param fn Async factory function.
 * @param mapError Maps a rejection or thrown value to `E`.
 * @returns `Ok<T>` on resolve, `Err<E>` on reject or throw.
 */
export const fromAsyncThrowable = async <T, E>(
	fn: () => PromiseLike<T>,
	mapError: (error: unknown) => E,
): ResultAsync<T, E> => {
	try {
		return ok(await fn());
	} catch (error) {
		return err(mapError(error));
	}
};

/**
 * Executes a callback after a result is determined.
 */
export function onFinally<T, E, FE = unknown>(
	result: Result<T, E>,
	callback: (result: Result<T, E>) => Promise<void>,
	mapFinallyError?: (error: unknown) => FE,
): ResultAsync<T, E | FinallyError<T, E, FE>>;
export function onFinally<T, E, FE = unknown>(
	result: Result<T, E>,
	callback: (result: Result<T, E>) => void,
	mapFinallyError?: (error: unknown) => FE,
): Result<T, E | FinallyError<T, E, FE>>;
export function onFinally<T, E, FE = unknown>(
	result: Result<T, E>,
	callback: (result: Result<T, E>) => void | Promise<void>,
	mapFinallyError: (error: unknown) => FE = (e) => e as FE,
):
	| Result<T, E | FinallyError<T, E, FE>>
	| ResultAsync<T, E | FinallyError<T, E, FE>> {
	try {
		const res = callback(result);
		if (isPromiseLike(res)) {
			return res.then(
				() => result,
				(error) => err(new FinallyError(result, mapFinallyError(error))),
			);
		}
		return result;
	} catch (error) {
		return err(new FinallyError(result, mapFinallyError(error)));
	}
}

/**
 * Async variant of {@link onFinally}.
 */
export const onFinallyAsync = async <T, E, FE = unknown>(
	resultPromise: ResultAsync<T, E>,
	callback: (result: Result<T, E>) => void | Promise<void>,
	mapFinallyError: (error: unknown) => FE = (e) => e as FE,
): ResultAsync<T, E | FinallyError<T, E, FE>> => {
	const result = await resultPromise;
	const res = onFinally(result, callback as any, mapFinallyError);
	return isPromiseLike(res) ? res : Promise.resolve(res);
};

// #endregion

// #region Transformers

/**
 * Applies `fn` to the value if `Ok`, passes `Err` through unchanged.
 * @param result The result to transform.
 * @param fn Maps the success value to a new value.
 * @returns `Ok<U>` if `Ok`, the original `Err<E>` otherwise.
 */
export const map = <T, E, U>(
	result: Result<T, E>,
	fn: (value: T) => U,
): Result<U, E> => (isOk(result) ? ok(fn(result.value)) : result);

/**
 * Async variant of {@link map}.
 * @param resultPromise The async result to transform.
 * @param fn Maps the success value to a new value.
 */
export const mapAsync = async <T, E, U>(
	resultPromise: ResultAsync<T, E>,
	fn: (value: T) => U | PromiseLike<U>,
): Promise<Result<U, E>> => {
	const result = await resultPromise;
	return isOk(result) ? ok(await fn(result.value)) : result;
};

/**
 * Applies `fn` to the error if `Err`, passes `Ok` through unchanged.
 * @param result The result to transform.
 * @param fn Maps the error to a new error.
 * @returns The original `Ok<T>` if `Ok`, `Err<F>` otherwise.
 */
export const mapErr = <T, E, F>(
	result: Result<T, E>,
	fn: (error: E) => F,
): Result<T, F> => (isErr(result) ? err(fn(result.error)) : result);

/**
 * Async variant of {@link mapErr}.
 * @param resultPromise The async result to transform.
 * @param fn Maps the error to a new error.
 */
export const mapErrAsync = async <T, E, F>(
	resultPromise: ResultAsync<T, E>,
	fn: (error: E) => F | PromiseLike<F>,
): Promise<Result<T, F>> => {
	const result = await resultPromise;
	return isErr(result) ? err(await fn(result.error)) : result;
};

/**
 * Applies `fn` to the value if `Ok` and returns the inner `Result`, flattening one level.
 * Passes `Err` through unchanged. Use this to chain fallible operations without nesting.
 * @param result The result to chain.
 * @param fn Maps the success value to a new `Result<U, E>`.
 * @returns The `Result<U, E>` returned by `fn` if `Ok`, the original `Err<E>` otherwise.
 */
export const flatMap = <T, E, U>(
	result: Result<T, E>,
	fn: (value: T) => Result<U, E>,
): Result<U, E> => (isOk(result) ? fn(result.value) : result);

/**
 * Async variant of {@link flatMap}.
 * @param resultPromise The async result to chain.
 * @param fn Maps the success value to a new `Result<U, E>` or `ResultAsync<U, E>`.
 */
export const flatMapAsync = async <T, E, U>(
	resultPromise: ResultAsync<T, E>,
	fn: (value: T) => Result<U, E> | ResultAsync<U, E>,
): Promise<Result<U, E>> => {
	const result = await resultPromise;
	return isOk(result) ? fn(result.value) : result;
};

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
	if (isOk(result)) return result.value;
	if (result.error instanceof Error) throw result.error;
	throw new NonErrorThrown(result.error);
};

/**
 * Async variant of {@link unwrap}.
 * @param resultPromise The async result to unwrap.
 * @throws {Error} The original error if it is an `Error` instance.
 * @throws {NonErrorThrown} If the error is not an `Error` instance.
 */
export const unwrapAsync = async <T, E>(
	resultPromise: ResultAsync<T, E>,
): Promise<T> => unwrap(await resultPromise);

/**
 * Returns the value if `Ok`, otherwise returns `defaultValue`.
 * @param result The result to unwrap.
 * @param defaultValue Fallback value returned when `Err`.
 */
export const unwrapOr = <T, E, D>(
	result: Result<T, E>,
	defaultValue: D,
): T | D => (isOk(result) ? result.value : defaultValue);

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

const isPromiseLike = <T>(value: unknown): value is PromiseLike<T> =>
	value !== null &&
	typeof value === "object" &&
	"then" in value &&
	typeof (value as { then: unknown }).then === "function";

// #endregion

// #region Factory interface

/**
 * Configuration for {@link createResult}.
 */
export type ResultConfig<E = unknown, FE = unknown> =
	| {
			mapError?: (error: unknown) => E;
			mapFinallyError?: (error: unknown) => FE;
	  }
	| ((error: unknown) => E);

/**
 * Interface returned by {@link createResult}.
 * @template E The bound error type.
 * @template FE The bound finally error type.
 */
export interface ResultInterface<E = unknown, FE = unknown> {
	ok: typeof ok;
	err(error: E): Err<E>;
	okAsync: typeof okAsync;
	errAsync(error: E): ResultAsync<never, E>;

	isOk: typeof isOk;
	isErr: typeof isErr;

	/**
	 * Unified capture entry point. Accepts a sync/async factory or a `PromiseLike`.
	 * @param fn Sync or async factory, or a `PromiseLike`.
	 * @param options Optional catch and finally configuration.
	 */
	from<T, F = E, G = FE>(
		fn: () => T,
		options: CaptureOptions<T, F, G> & {
			finally: (result: Result<T, F>) => Promise<void>;
		},
	): ResultAsync<T, F | FinallyError<T, F, G>>;
	from<T, F = E, G = FE>(
		fn: () => T,
		options?: CaptureOptions<T, F, G>,
	):
		| Result<T, F | FinallyError<T, F, G>>
		| ResultAsync<T, F | FinallyError<T, F, G>>;
	from<T, F = E, G = FE>(
		fn: () => PromiseLike<T>,
		options?: CaptureOptions<T, F, G>,
	): ResultAsync<T, F | FinallyError<T, F, G>>;
	from<T, F = E, G = FE>(
		promise: PromiseLike<T>,
		options?: CaptureOptions<T, F, G>,
	): ResultAsync<T, F | FinallyError<T, F, G>>;

	fromThrowable<T, F = E, G = FE>(
		fn: () => T,
		options: CaptureOptions<T, F, G> & {
			finally: (result: Result<T, F>) => Promise<void>;
		},
	): ResultAsync<T, F | FinallyError<T, F, G>>;
	fromThrowable<T, F = E, G = FE>(
		fn: () => T,
		options?: CaptureOptions<T, F, G>,
	):
		| Result<T, F | FinallyError<T, F, G>>
		| ResultAsync<T, F | FinallyError<T, F, G>>;

	fromPromise<T, F = E, G = FE>(
		promise: PromiseLike<T>,
		options?: CaptureOptions<T, F, G>,
	): ResultAsync<T, F | FinallyError<T, F, G>>;
	fromAsyncThrowable<T, F = E, G = FE>(
		fn: () => PromiseLike<T>,
		options?: CaptureOptions<T, F, G>,
	): ResultAsync<T, F | FinallyError<T, F, G>>;

	map<T, U>(result: Result<T, E>, fn: (value: T) => U): Result<U, E>;
	mapAsync<T, U>(
		result: ResultAsync<T, E>,
		fn: (value: T) => U | PromiseLike<U>,
	): Promise<Result<U, E>>;
	mapErr<T, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F>;
	mapErrAsync<T, F>(
		result: ResultAsync<T, E>,
		fn: (error: E) => F | PromiseLike<F>,
	): Promise<Result<T, F>>;
	flatMap<T, U>(
		result: Result<T, E>,
		fn: (value: T) => Result<U, E>,
	): Result<U, E>;
	flatMapAsync<T, U>(
		result: ResultAsync<T, E>,
		fn: (value: T) => Result<U, E> | ResultAsync<U, E>,
	): Promise<Result<U, E>>;

	match: typeof match;
	matchAsync: typeof matchAsync;

	unwrap: typeof unwrap;
	unwrapOr: typeof unwrapOr;
	unwrapOrElse: typeof unwrapOrElse;
	unwrapAsync: typeof unwrapAsync;
	unwrapOrAsync: typeof unwrapOrAsync;
	unwrapOrElseAsync: typeof unwrapOrElseAsync;

	finally: typeof onFinally;
	finallyAsync: typeof onFinallyAsync;
}

// #endregion

// #region Factory

/**
 * Creates a {@link ResultInterface} with pre-bound error mapping.
 * @param config Optional mapping configuration or a single mapError function.
 * @returns A {@link ResultInterface} with pre-bound mappers.
 */
export const createResult = <E = unknown, FE = unknown>(
	config?: ResultConfig<E, FE>,
): ResultInterface<E, FE> => {
	const mappers =
		typeof config === "function"
			? { mapError: config, mapFinallyError: (e: unknown) => e as FE }
			: {
					mapError: config?.mapError ?? ((e: unknown) => e as E),
					mapFinallyError: config?.mapFinallyError ?? ((e: unknown) => e as FE),
				};

	const { mapError, mapFinallyError } = mappers;

	const handleResult = <T, F, G>(
		result: Result<T, F>,
		options?: CaptureOptions<T, F, G>,
	): any => {
		if (options?.finally) {
			return onFinally(
				result,
				options.finally as any,
				(options.mapFinallyError ?? (mapFinallyError as any)) as any,
			);
		}
		return result;
	};

	function from<T, F = E, G = FE>(
		input: PromiseLike<T> | (() => T | PromiseLike<T>),
		options?: CaptureOptions<T, F, G>,
	):
		| Result<T, F | FinallyError<T, F, G>>
		| ResultAsync<T, F | FinallyError<T, F, G>> {
		const currentMapError = (options?.catch ?? (mapError as any)) as (
			e: unknown,
		) => F;

		if (typeof input === "function") {
			try {
				const value = input();
				if (isPromiseLike<T>(value)) {
					return fromPromise(value, currentMapError).then((res) =>
						handleResult(res, options),
					);
				}
				return handleResult(ok(value) as any, options);
			} catch (error) {
				return handleResult(err(currentMapError(error)), options);
			}
		}

		return fromPromise(input, currentMapError).then((res) =>
			handleResult(res, options),
		);
	}

	return {
		ok,
		err: (error) => err(error),
		okAsync,
		errAsync: (error) => Promise.resolve(err(error)),
		isOk,
		isErr,
		from: from as any,
		fromThrowable: (fn, options?: any) => {
			const currentMapError = (options?.catch ?? mapError) as any;
			try {
				return handleResult(ok(fn()), options) as any;
			} catch (error) {
				return handleResult(err(currentMapError(error)), options) as any;
			}
		},
		fromPromise: (promise, options?: any) => {
			const currentMapError = (options?.catch ?? mapError) as any;
			return fromPromise(promise, currentMapError).then((res) =>
				handleResult(res, options),
			);
		},
		fromAsyncThrowable: (fn, options?: any) => {
			const currentMapError = (options?.catch ?? mapError) as any;
			return fromAsyncThrowable(fn, currentMapError).then((res) =>
				handleResult(res, options),
			);
		},
		map,
		mapAsync,
		mapErr,
		mapErrAsync,
		flatMap,
		flatMapAsync,
		match,
		matchAsync,
		unwrap,
		unwrapAsync,
		unwrapOr,
		unwrapOrAsync,
		unwrapOrElse,
		unwrapOrElseAsync,
		finally: onFinally,
		finallyAsync: onFinallyAsync,
	};
};

// #endregion

// #region Utility types

/**
 * Extracts the `Ok` value type from a {@link Result}.
 * @template R A {@link Result} type.
 */
export type ResultOk<R extends Result<unknown, unknown>> = R extends Result<
	infer TData,
	unknown
>
	? TData
	: never;

/**
 * Extracts the `Err` error type from a {@link Result}.
 * @template R A {@link Result} type.
 */
export type ResultErr<R extends Result<unknown, unknown>> = R extends Result<
	unknown,
	infer TError
>
	? TError
	: never;

/**
 * Extracts the `Ok` value type from a {@link ResultAsync}.
 * @template R A {@link ResultAsync} type.
 */
export type ResultAsyncOk<R extends ResultAsync<unknown, unknown>> =
	R extends ResultAsync<infer TData, unknown> ? TData : never;

/**
 * Extracts the `Err` error type from a {@link ResultAsync}.
 * @template R A {@link ResultAsync} type.
 */
export type ResultAsyncErr<R extends ResultAsync<unknown, unknown>> =
	R extends ResultAsync<unknown, infer TError> ? TError : never;

// #endregion
