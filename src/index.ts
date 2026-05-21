// #region Core types

/**
 * Successful result carrying a value.
 *
 * @template T The success value type.
 * @category Result
 */
export interface Ok<T> {
	readonly ok: true
	readonly value: T
}

/**
 * Failed result carrying an error.
 *
 * @template E The error type.
 * @category Result
 */
export interface Err<E> {
	readonly ok: false
	readonly error: E
}

/**
 * Discriminated union of {@link Ok} and {@link Err}.
 *
 * @template T The success value type.
 * @template E The error type.
 * @category Result
 */
export type Result<T, E> = Ok<T> | Err<E>

/**
 * Async variant — a `Promise` that always resolves to a {@link Result}.
 *
 * @template T The success value type.
 * @template E The error type.
 * @category Result
 */
export type ResultAsync<T, E> = Promise<Result<T, E>>

// #endregion

// #region Errors

/**
 * Thrown by {@link unwrap} when the error value is not an `Error` instance.
 * Wraps the raw thrown value in `.value` for inspection.
 *
 * @category Errors
 */
export class NonErrorThrown extends Error {
	public readonly value: unknown

	/**
	 * @param value The non-Error value that was thrown.
	 */
	public constructor(value: unknown) {
		super('Non-error value thrown.')
		this.name = 'NonErrorThrown'
		this.value = value
	}
}

/**
 * Wraps both the original result and a cleanup error when a finally block fails.
 *
 * @template T The success value type of the original result.
 * @template E The error type of the original result.
 * @template FE The type of the finally block error.
 * @category Errors
 */
export class FinallyError<T, E, FE> extends Error {
	public readonly originalResult: Result<T, E>
	public readonly finallyError: FE

	public constructor(originalResult: Result<T, E>, finallyError: FE) {
		super('Error occurred in finally block.')
		this.name = 'FinallyError'
		this.originalResult = originalResult
		this.finallyError = finallyError
	}
}

// #endregion

// #region Constructors

/**
 * Create a successful {@link Ok} result.
 *
 * @category Constructors
 */
export /* @__NO_SIDE_EFFECTS__ */ function ok<T>(value: T): Ok<T> {
	return { ok: true, value }
}

/**
 * Create a failed {@link Err} result.
 *
 * @category Constructors
 */
export /* @__NO_SIDE_EFFECTS__ */ function err<E>(error: E): Err<E> {
	return { ok: false, error }
}

/**
 * Create a resolved `Promise` of {@link Ok}.
 *
 * @category Constructors
 */
export /* @__NO_SIDE_EFFECTS__ */ function okAsync<T>(value: T): ResultAsync<T, never> {
	return Promise.resolve(ok(value))
}

/**
 * Create a resolved `Promise` of {@link Err}.
 *
 * @category Constructors
 */
export /* @__NO_SIDE_EFFECTS__ */ function errAsync<E>(error: E): ResultAsync<never, E> {
	return Promise.resolve(err(error))
}

// #endregion

// #region Guards

/**
 * Returns `true` if `result` is {@link Ok}.
 *
 * @category Guards
 */
export /* @__NO_SIDE_EFFECTS__ */ function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
	return result.ok === true
}

/**
 * Returns `true` if `result` is {@link Err}.
 *
 * @category Guards
 */
export /* @__NO_SIDE_EFFECTS__ */ function isErr<T, E>(result: Result<T, E>): result is Err<E> {
	return result.ok === false
}

// #endregion

// #region Capture helpers

/**
 * Options for result capture helpers.
 *
 * @category Capture
 */
export interface CaptureOptions<T, E, FE = unknown> {
	/** Maps a thrown/rejected value to `E`. Overrides factory default. */
	catch?: (error: unknown) => E
	/** Callback to run after the result is determined. */
	finally?: (result: Result<T, E>) => void | Promise<void>
	/** Maps a finally-block failure to `FE`. Overrides factory default. */
	mapFinallyError?: (error: unknown) => FE
}

/**
 * Run `fn` and wrap the return value in {@link Ok}, or wrap any thrown value in {@link Err}.
 *
 * @param fn Synchronous function to execute.
 * @returns `Ok<T>` on success, `Err<unknown>` on throw.
 * @category Capture
 */
export function tryResult<T>(fn: () => T): Result<T, unknown> {
	try {
		return ok(fn())
	}
	catch (error) {
		return err(error)
	}
}

/**
 * Wrap an existing `PromiseLike` in a {@link ResultAsync}.
 *
 * @param promise The promise to wrap.
 * @param mapError Maps a rejection value to `E`.
 * @returns `Ok<T>` on resolve, `Err<E>` on reject.
 * @category Capture
 */
export async function toResult<T, E>(
	promise: PromiseLike<T>,
	mapError: (error: unknown) => E,
): ResultAsync<T, E> {
	try {
		return ok(await promise)
	}
	catch (error) {
		return err(mapError(error))
	}
}

/**
 * Call an async factory `fn` and wrap the resolved value in {@link Ok}.
 *
 * @param fn Async factory function.
 * @param mapError Maps a rejection or thrown value to `E`.
 * @returns `Ok<T>` on resolve, `Err<E>` on reject or throw.
 * @category Capture
 */
export async function tryResultAsync<T, E>(
	fn: () => PromiseLike<T>,
	mapError: (error: unknown) => E,
): ResultAsync<T, E> {
	try {
		return ok(await fn())
	}
	catch (error) {
		return err(mapError(error))
	}
}

/**
 * Attach a cleanup callback to a result. The callback runs regardless of `Ok`/`Err`.
 * If the callback itself throws or rejects, the original result is replaced with
 * `Err<FinallyError>` carrying both the original result and the cleanup error.
 *
 * @category Capture
 */
export function withFinally<T, E, FE = unknown>(
	result: Result<T, E>,
	callback: (result: Result<T, E>) => Promise<void>,
	mapFinallyError?: (error: unknown) => FE,
): ResultAsync<T, E | FinallyError<T, E, FE>>
export function withFinally<T, E, FE = unknown>(
	result: Result<T, E>,
	callback: (result: Result<T, E>) => void,
	mapFinallyError?: (error: unknown) => FE,
): Result<T, E | FinallyError<T, E, FE>>
export function withFinally<T, E, FE = unknown>(
	result: Result<T, E>,
	callback: (result: Result<T, E>) => void | Promise<void>,
	mapFinallyError: (error: unknown) => FE = e => e as FE,
): Result<T, E | FinallyError<T, E, FE>> | ResultAsync<T, E | FinallyError<T, E, FE>> {
	try {
		const res = callback(result)
		if (isPromiseLike(res)) {
			return res.then(
				() => result,
				error => err(new FinallyError(result, mapFinallyError(error))),
			)
		}
		return result
	}
	catch (error) {
		return err(new FinallyError(result, mapFinallyError(error)))
	}
}

/**
 * Async variant of {@link withFinally}.
 *
 * @category Capture
 */
export async function withFinallyAsync<T, E, FE = unknown>(
	resultPromise: ResultAsync<T, E>,
	callback: (result: Result<T, E>) => void | Promise<void>,
	mapFinallyError: (error: unknown) => FE = e => e as FE,
): ResultAsync<T, E | FinallyError<T, E, FE>> {
	const result = await resultPromise
	// withFinally is overloaded; the union callback type needs a single-boundary cast here
	const res = withFinally(result, callback as (result: Result<T, E>) => void, mapFinallyError)
	return isPromiseLike(res) ? res : Promise.resolve(res)
}

// #endregion

// #region Transformers

/**
 * Apply `fn` to the value if `Ok`, pass `Err` through unchanged.
 *
 * @category Transformers
 */
export /* @__NO_SIDE_EFFECTS__ */ function map<T, E, U>(
	result: Result<T, E>,
	fn: (value: T) => U,
): Result<U, E> {
	return isOk(result) ? ok(fn(result.value)) : result
}

/**
 * Async variant of {@link map}.
 *
 * @category Transformers
 */
export async function mapAsync<T, E, U>(
	resultPromise: ResultAsync<T, E>,
	fn: (value: T) => U | PromiseLike<U>,
): Promise<Result<U, E>> {
	const result = await resultPromise
	return isOk(result) ? ok(await fn(result.value)) : result
}

/**
 * Apply `fn` to the error if `Err`, pass `Ok` through unchanged.
 *
 * @category Transformers
 */
export /* @__NO_SIDE_EFFECTS__ */ function mapErr<T, E, F>(
	result: Result<T, E>,
	fn: (error: E) => F,
): Result<T, F> {
	return isErr(result) ? err(fn(result.error)) : result
}

/**
 * Async variant of {@link mapErr}.
 *
 * @category Transformers
 */
export async function mapErrAsync<T, E, F>(
	resultPromise: ResultAsync<T, E>,
	fn: (error: E) => F | PromiseLike<F>,
): Promise<Result<T, F>> {
	const result = await resultPromise
	return isErr(result) ? err(await fn(result.error)) : result
}

/**
 * Apply `fn` to the value if `Ok` and flatten one level of nesting.
 * Use this to chain fallible operations without accumulating `Result<Result<...>>`.
 *
 * @category Transformers
 */
export /* @__NO_SIDE_EFFECTS__ */ function flatMap<T, E, U>(
	result: Result<T, E>,
	fn: (value: T) => Result<U, E>,
): Result<U, E> {
	return isOk(result) ? fn(result.value) : result
}

/**
 * Async variant of {@link flatMap}.
 *
 * @category Transformers
 */
export async function flatMapAsync<T, E, U>(
	resultPromise: ResultAsync<T, E>,
	fn: (value: T) => Result<U, E> | ResultAsync<U, E>,
): Promise<Result<U, E>> {
	const result = await resultPromise
	return isOk(result) ? await fn(result.value) : result
}

// #endregion

// #region Pattern matching

/**
 * Exhaustive match over a {@link Result}. Exactly one branch runs.
 *
 * @category Pattern Matching
 */
export /* @__NO_SIDE_EFFECTS__ */ function match<T, E, U, V>(
	result: Result<T, E>,
	onOk: (value: T) => U,
	onErr: (error: E) => V,
): U | V {
	return isOk(result) ? onOk(result.value) : onErr(result.error)
}

/**
 * Async variant of {@link match}. Awaits `resultPromise` before branching.
 *
 * @category Pattern Matching
 */
export async function matchAsync<T, E, U, V>(
	resultPromise: ResultAsync<T, E>,
	onOk: (value: T) => U | PromiseLike<U>,
	onErr: (error: E) => V | PromiseLike<V>,
): Promise<U | V> {
	const result = await resultPromise
	return match(result, onOk, onErr)
}

// #endregion

// #region Unwrap helpers

/**
 * Return the value if `Ok`, otherwise throw.
 *
 * @throws {Error} The original error if it is an `Error` instance.
 * @throws {NonErrorThrown} If the error is not an `Error` instance.
 * @category Unwrap
 */
export function unwrap<T, E>(result: Result<T, E>): T {
	if (isOk(result))
		return result.value
	if (result.error instanceof Error)
		throw result.error
	throw new NonErrorThrown(result.error)
}

/**
 * Async variant of {@link unwrap}.
 *
 * @throws {Error} The original error if it is an `Error` instance.
 * @throws {NonErrorThrown} If the error is not an `Error` instance.
 * @category Unwrap
 */
export async function unwrapAsync<T, E>(resultPromise: ResultAsync<T, E>): Promise<T> {
	return unwrap(await resultPromise)
}

/**
 * Return the value if `Ok`, otherwise return `defaultValue`.
 *
 * @category Unwrap
 */
export /* @__NO_SIDE_EFFECTS__ */ function unwrapOr<T, E, D>(
	result: Result<T, E>,
	defaultValue: D,
): T | D {
	return isOk(result) ? result.value : defaultValue
}

/**
 * Async variant of {@link unwrapOr}.
 *
 * @category Unwrap
 */
export async function unwrapOrAsync<T, E, D>(
	resultPromise: ResultAsync<T, E>,
	defaultValue: D,
): Promise<T | D> {
	return unwrapOr(await resultPromise, defaultValue)
}

/**
 * Return the value if `Ok`, otherwise call `onErr` and return its result.
 *
 * @category Unwrap
 */
export /* @__NO_SIDE_EFFECTS__ */ function unwrapOrElse<T, E, U>(
	result: Result<T, E>,
	onErr: (error: E) => U,
): T | U {
	return isOk(result) ? result.value : onErr(result.error)
}

/**
 * Async variant of {@link unwrapOrElse}.
 *
 * @category Unwrap
 */
export async function unwrapOrElseAsync<T, E, U>(
	resultPromise: ResultAsync<T, E>,
	onErr: (error: E) => U | PromiseLike<U>,
): Promise<T | U> {
	const result = await resultPromise
	return isOk(result) ? result.value : onErr(result.error)
}

// #endregion

// #region Internal helpers

function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
	return (
		value !== null
		&& typeof value === 'object'
		&& 'then' in value
		&& typeof (value as { then: unknown }).then === 'function'
	)
}

// #endregion

// #region Factory

/**
 * Configuration for {@link createResult}.
 *
 * @category Factory
 */
export type ResultConfig<E = unknown, FE = unknown> =
	| {
			mapError?: (error: unknown) => E
			mapFinallyError?: (error: unknown) => FE
	  }
	| ((error: unknown) => E)

/**
 * Interface returned by {@link createResult}.
 *
 * @template E The bound error type.
 * @template FE The bound finally-error type.
 * @category Factory
 */
export interface ResultInterface<E = unknown, FE = unknown> {
	ok: typeof ok
	err(error: E): Err<E>
	okAsync: typeof okAsync
	errAsync(error: E): ResultAsync<never, E>

	isOk: typeof isOk
	isErr: typeof isErr

	/**
	 * Unified capture entry point. Accepts a sync/async factory or a `PromiseLike`.
	 */
	from<T, F = E, G = FE>(
		fn: () => T,
		options: CaptureOptions<T, F, G> & {
			finally: (result: Result<T, F>) => Promise<void>
		},
	): ResultAsync<T, F | FinallyError<T, F, G>>
	from<T, F = E, G = FE>(
		fn: () => T,
		options?: CaptureOptions<T, F, G>,
	): Result<T, F | FinallyError<T, F, G>> | ResultAsync<T, F | FinallyError<T, F, G>>
	from<T, F = E, G = FE>(
		fn: () => PromiseLike<T>,
		options?: CaptureOptions<T, F, G>,
	): ResultAsync<T, F | FinallyError<T, F, G>>
	from<T, F = E, G = FE>(
		promise: PromiseLike<T>,
		options?: CaptureOptions<T, F, G>,
	): ResultAsync<T, F | FinallyError<T, F, G>>

	tryResult<T, F = E, G = FE>(
		fn: () => T,
		options: CaptureOptions<T, F, G> & {
			finally: (result: Result<T, F>) => Promise<void>
		},
	): ResultAsync<T, F | FinallyError<T, F, G>>
	tryResult<T, F = E, G = FE>(
		fn: () => T,
		options?: CaptureOptions<T, F, G>,
	): Result<T, F | FinallyError<T, F, G>> | ResultAsync<T, F | FinallyError<T, F, G>>

	toResult<T, F = E, G = FE>(
		promise: PromiseLike<T>,
		options?: CaptureOptions<T, F, G>,
	): ResultAsync<T, F | FinallyError<T, F, G>>

	tryResultAsync<T, F = E, G = FE>(
		fn: () => PromiseLike<T>,
		options?: CaptureOptions<T, F, G>,
	): ResultAsync<T, F | FinallyError<T, F, G>>

	map<T, U>(result: Result<T, E>, fn: (value: T) => U): Result<U, E>
	mapAsync<T, U>(result: ResultAsync<T, E>, fn: (value: T) => U | PromiseLike<U>): Promise<Result<U, E>>
	mapErr<T, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F>
	mapErrAsync<T, F>(result: ResultAsync<T, E>, fn: (error: E) => F | PromiseLike<F>): Promise<Result<T, F>>
	flatMap<T, U>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E>
	flatMapAsync<T, U>(result: ResultAsync<T, E>, fn: (value: T) => Result<U, E> | ResultAsync<U, E>): Promise<Result<U, E>>

	match: typeof match
	matchAsync: typeof matchAsync

	unwrap: typeof unwrap
	unwrapOr: typeof unwrapOr
	unwrapOrElse: typeof unwrapOrElse
	unwrapAsync: typeof unwrapAsync
	unwrapOrAsync: typeof unwrapOrAsync
	unwrapOrElseAsync: typeof unwrapOrElseAsync

	withFinally: typeof withFinally
	withFinallyAsync: typeof withFinallyAsync
}

/**
 * Create a {@link ResultInterface} with pre-bound error mapping.
 *
 * @param options Optional mapping configuration or a single `mapError` function.
 * @returns A bound {@link ResultInterface}.
 * @category Factory
 *
 * @example
 * ```ts
 * const R = createResult((e) => e instanceof Error ? e : new Error(String(e)))
 *
 * const result = R.from(() => JSON.parse(rawInput))
 * ```
 */
export function createResult<E = unknown, FE = unknown>(
	options?: ResultConfig<E, FE>,
): ResultInterface<E, FE> {
	const mapError: (e: unknown) => E
		= typeof options === 'function'
			? options
			: (options?.mapError ?? (e => e as E))

	const mapFinallyError: (e: unknown) => FE
		= typeof options === 'function'
			? (e => e as FE)
			: (options?.mapFinallyError ?? (e => e as FE))

	// Single any-boundary: handleResult's return type depends on whether
	// options.finally is sync or async, which TypeScript cannot narrow here.
	function handleResult<T, F, G>(
		result: Result<T, F>,
		opts?: CaptureOptions<T, F, G>,
	): any {
		if (opts?.finally) {
			return withFinally(
				result,
				opts.finally as (result: Result<T, F>) => void,
				opts.mapFinallyError ?? (mapFinallyError as unknown as (e: unknown) => G),
			)
		}
		return result
	}

	function from<T, F = E, G = FE>(
		input: PromiseLike<T> | (() => T | PromiseLike<T>),
		opts?: CaptureOptions<T, F, G>,
	): Result<T, F | FinallyError<T, F, G>> | ResultAsync<T, F | FinallyError<T, F, G>> {
		const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F

		if (typeof input === 'function') {
			try {
				const value = input()
				if (isPromiseLike<T>(value))
					return toResult(value, catchFn).then(res => handleResult(res, opts))
				return handleResult(ok(value) as Result<T, F>, opts)
			}
			catch (error) {
				return handleResult(err(catchFn(error)) as Result<T, F>, opts)
			}
		}

		return toResult(input, catchFn).then(res => handleResult(res, opts))
	}

	return {
		ok,
		err: (error: E) => err(error),
		okAsync,
		errAsync: (error: E) => Promise.resolve(err(error)),
		isOk,
		isErr,

		from: from as ResultInterface<E, FE>['from'],

		tryResult<T, F = E, G = FE>(fn: () => T, opts?: CaptureOptions<T, F, G>) {
			const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F
			try {
				return handleResult(ok(fn()) as Result<T, F>, opts)
			}
			catch (error) {
				return handleResult(err(catchFn(error)) as Result<T, F>, opts)
			}
		},

		toResult<T, F = E, G = FE>(promise: PromiseLike<T>, opts?: CaptureOptions<T, F, G>) {
			const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F
			return toResult(promise, catchFn).then(res => handleResult(res, opts))
		},

		tryResultAsync<T, F = E, G = FE>(fn: () => PromiseLike<T>, opts?: CaptureOptions<T, F, G>) {
			const catchFn = (opts?.catch ?? mapError) as (e: unknown) => F
			return tryResultAsync(fn, catchFn).then(res => handleResult(res, opts))
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
		withFinally,
		withFinallyAsync,
	}
}

// #endregion

// #region Utility types

/**
 * Extract the `Ok` value type from a {@link Result}.
 *
 * @template R A {@link Result} type.
 * @category Utility Types
 */
export type ResultOk<R extends Result<unknown, unknown>>
	= R extends Result<infer TData, unknown> ? TData : never

/**
 * Extract the `Err` error type from a {@link Result}.
 *
 * @template R A {@link Result} type.
 * @category Utility Types
 */
export type ResultErr<R extends Result<unknown, unknown>>
	= R extends Result<unknown, infer TError> ? TError : never

/**
 * Extract the `Ok` value type from a {@link ResultAsync}.
 *
 * @template R A {@link ResultAsync} type.
 * @category Utility Types
 */
export type ResultAsyncOk<R extends ResultAsync<unknown, unknown>>
	= R extends ResultAsync<infer TData, unknown> ? TData : never

/**
 * Extract the `Err` error type from a {@link ResultAsync}.
 *
 * @template R A {@link ResultAsync} type.
 * @category Utility Types
 */
export type ResultAsyncErr<R extends ResultAsync<unknown, unknown>>
	= R extends ResultAsync<unknown, infer TError> ? TError : never

// #endregion
