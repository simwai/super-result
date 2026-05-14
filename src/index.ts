// ─── super-result ────────────────────────────────────────────────────────────
// Discriminated Result<T,E> + ResultAsync + typed factory + logger interface
// ─────────────────────────────────────────────────────────────────────────────

// ---------- Core types -------------------------------------------------------

export type Ok<T> = {
	readonly type: 'ok';
	readonly value: T;
};

export type Err<E> = {
	readonly type: 'err';
	readonly error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;
export type ResultAsync<T, E> = Promise<Result<T, E>>;

// ---------- Error for non-Error throws ---------------------------------------

export class NonErrorThrown extends TypeError {
	public readonly value: unknown;

	public constructor(value: unknown) {
		super('Non-error value thrown.');
		this.name = 'NonErrorThrown';
		this.value = value;
	}
}

// ---------- Constructors -----------------------------------------------------

export const ok = <T>(value: T): Ok<T> => ({ type: 'ok', value });

export const err = <E>(error: E): Err<E> => ({ type: 'err', error });

export const okAsync = <T>(value: T): ResultAsync<T, never> =>
	Promise.resolve(ok(value));

export const errAsync = <E>(error: E): ResultAsync<never, E> =>
	Promise.resolve(err(error));

// ---------- Guards -----------------------------------------------------------

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> =>
	result.type === 'ok';

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> =>
	result.type === 'err';

// ---------- Primitive capture helpers ----------------------------------------

export const fromThrowable = <T>(fn: () => T): Result<T, unknown> => {
	try {
		return ok(fn());
	} catch (error) {
		return err(error);
	}
};

export const fromPromise = <T, E>(
	promise: PromiseLike<T>,
	mapError: (error: unknown) => E,
): ResultAsync<T, E> =>
	Promise.resolve(promise)
		.then<Result<T, E>>(value => ok(value))
		.catch<Result<T, E>>(error => err(mapError(error)));

export const fromAsyncThrowable = <T, E>(
	fn: () => PromiseLike<T>,
	mapError: (error: unknown) => E,
): ResultAsync<T, E> =>
	Promise.resolve()
		.then(fn)
		.then<Result<T, E>>(value => ok(value))
		.catch<Result<T, E>>(error => err(mapError(error)));

export const fromAsyncResult = <T, E>(result: Result<T, E>): ResultAsync<T, E> =>
	Promise.resolve(result);

// ---------- Pattern matching --------------------------------------------------

export const match = <T, E, U, V>(
	result: Result<T, E>,
	onOk: (value: T) => U,
	onErr: (error: E) => V,
): U | V => (isOk(result) ? onOk(result.value) : onErr(result.error));

export const matchAsync = async <T, E, U, V>(
	resultPromise: ResultAsync<T, E>,
	onOk: (value: T) => U | PromiseLike<U>,
	onErr: (error: E) => V | PromiseLike<V>,
): Promise<U | V> => {
	const result = await resultPromise;
	return match(result, onOk, onErr);
};

// ---------- Unwrap helpers ---------------------------------------------------

export const unwrap = <T, E>(result: Result<T, E>): T => {
	if (isOk(result)) {
		return result.value;
	}

	if (result.error instanceof Error) {
		throw result.error;
	}

	throw new NonErrorThrown(result.error);
};

export const unwrapAsync = async <T, E>(resultPromise: ResultAsync<T, E>): Promise<T> =>
	unwrap(await resultPromise);

export const unwrapOr = <T, E, D>(result: Result<T, E>, defaultValue: D): T | D =>
	isOk(result) ? result.value : defaultValue;

export const unwrapOrAsync = async <T, E, D>(
	resultPromise: ResultAsync<T, E>,
	defaultValue: D,
): Promise<T | D> => unwrapOr(await resultPromise, defaultValue);

export const unwrapOrElse = <T, E, U>(
	result: Result<T, E>,
	onErr: (error: E) => U,
): T | U => (isOk(result) ? result.value : onErr(result.error));

export const unwrapOrElseAsync = async <T, E, U>(
	resultPromise: ResultAsync<T, E>,
	onErr: (error: E) => U | PromiseLike<U>,
): Promise<T | U> => {
	const result = await resultPromise;
	return isOk(result) ? result.value : onErr(result.error);
};

// ---------- Internal helpers -------------------------------------------------

const isPromiseLike = <T>(value: unknown): value is PromiseLike<T> => {
	if (value === null) {
		return false;
	}

	const valueType = typeof value;
	if (valueType !== 'object' && valueType !== 'function') {
		return false;
	}

	return typeof Reflect.get(value as object, 'then') === 'function';
};

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

// ---------- Logger interface + augmentable context ---------------------------

/** Extend via module augmentation to add typed fields to every log entry. */
export interface ResultLoggerContext {}

export type ResultExecutionKind = 'sync' | 'async';
export type ResultExecutionPhase = 'start' | 'ok' | 'err';

export type ResultLogEntry<E = unknown> = Readonly<{
	scope: 'result';
	name?: string;
	kind: ResultExecutionKind;
	phase: ResultExecutionPhase;
	durationMs?: number;
	error?: E | unknown;
}> &
	ResultLoggerContext;

/** Implement with pino, winston, console, or any compatible logger. */
export interface ResultLogger {
	debug(entry: ResultLogEntry): void;
	error(entry: ResultLogEntry): void;
	trace(entry: ResultLogEntry): void;
}

// ---------- Factory interface ------------------------------------------------

export interface ResultInterface<E> {
	ok: typeof ok;
	err(error: E): Err<E>;
	okAsync: typeof okAsync;
	errAsync(error: E): ResultAsync<never, E>;

	isOk: typeof isOk;
	isErr: typeof isErr;

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

// ---------- Factory ----------------------------------------------------------

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

// ---------- Decorator internals ----------------------------------------------

export type ResultDecoratorOptions = Readonly<{
	name?: string;
	context?: ResultLoggerContext;
}>;

type ResultDecoratorHooks<E> = Readonly<{
	onStart?: (entry: ResultLogEntry<E>) => void;
	onOk?: (entry: ResultLogEntry<E>) => void;
	onErr?: (entry: ResultLogEntry<E>) => void;
}>;

const buildLogEntry = <E>(
	options: ResultDecoratorOptions,
	kind: ResultExecutionKind,
	phase: ResultExecutionPhase,
	extra?: Readonly<{ durationMs?: number; error?: E | unknown }>,
): ResultLogEntry<E> => ({
	scope: 'result',
	name: options.name,
	kind,
	phase,
	...(options.context ?? {}),
	...(extra ?? {}),
});

const tapSyncResult = <T, E>(
	result: Result<T, E>,
	startedAt: number,
	options: ResultDecoratorOptions,
	hooks: ResultDecoratorHooks<E>,
): Result<T, E> => {
	const durationMs = Date.now() - startedAt;

	if (isOk(result)) {
		hooks.onOk?.(buildLogEntry(options, 'sync', 'ok', { durationMs }));
		return result;
	}

	hooks.onErr?.(buildLogEntry(options, 'sync', 'err', { durationMs, error: result.error }));
	return result;
};

const tapAsyncResult = <T, E>(
	resultPromise: ResultAsync<T, E>,
	startedAt: number,
	options: ResultDecoratorOptions,
	hooks: ResultDecoratorHooks<E>,
): ResultAsync<T, E> =>
	resultPromise.then(result => {
		const durationMs = Date.now() - startedAt;

		if (isOk(result)) {
			hooks.onOk?.(buildLogEntry(options, 'async', 'ok', { durationMs }));
			return result;
		}

		hooks.onErr?.(buildLogEntry(options, 'async', 'err', { durationMs, error: result.error }));
		return result;
	});

const emitAsyncStart = <E>(
	startedAt: number,
	options: ResultDecoratorOptions,
	hooks: ResultDecoratorHooks<E>,
): number => {
	hooks.onStart?.(buildLogEntry(options, 'async', 'start'));
	return startedAt;
};

const decorateResult = <E>(
	base: ResultInterface<E>,
	hooks: ResultDecoratorHooks<E>,
	options: ResultDecoratorOptions = {},
): ResultInterface<E> => {
	function from<T>(fn: () => T): Result<T, E>;
	function from<T>(fn: () => PromiseLike<T>): ResultAsync<T, E>;
	function from<T>(promise: PromiseLike<T>): ResultAsync<T, E>;
	function from<T>(
		input: PromiseLike<T> | (() => T) | (() => PromiseLike<T>),
	): Result<T, E> | ResultAsync<T, E> {
		const startedAt = Date.now();

		if (typeof input === 'function') {
			const result = base.from(input);

			if (isPromiseLike<Result<T, E>>(result)) {
				return tapAsyncResult(
					result,
					emitAsyncStart(startedAt, options, hooks),
					options,
					hooks,
				);
			}

			return tapSyncResult(result, startedAt, options, hooks);
		}

		return tapAsyncResult(
			base.from(input),
			emitAsyncStart(startedAt, options, hooks),
			options,
			hooks,
		);
	}

	return {
		ok: base.ok,
		err: base.err,
		okAsync: base.okAsync,
		errAsync: base.errAsync,
		isOk: base.isOk,
		isErr: base.isErr,
		from,
		fromThrowable: fn => tapSyncResult(base.fromThrowable(fn), Date.now(), options, hooks),
		fromPromise: promise =>
			tapAsyncResult(
				base.fromPromise(promise),
				emitAsyncStart(Date.now(), options, hooks),
				options,
				hooks,
			),
		fromAsyncThrowable: fn =>
			tapAsyncResult(
				base.fromAsyncThrowable(fn),
				emitAsyncStart(Date.now(), options, hooks),
				options,
				hooks,
			),
		fromAsyncResult: result =>
			tapAsyncResult(
				base.fromAsyncResult(result),
				emitAsyncStart(Date.now(), options, hooks),
				options,
				hooks,
			),
		match: base.match,
		matchAsync: base.matchAsync,
		unwrap: base.unwrap,
		unwrapAsync: base.unwrapAsync,
		unwrapOr: base.unwrapOr,
		unwrapOrAsync: base.unwrapOrAsync,
		unwrapOrElse: base.unwrapOrElse,
		unwrapOrElseAsync: base.unwrapOrElseAsync,
	};
};

// ---------- Public decorators ------------------------------------------------

export const withLogging = <E>(
	base: ResultInterface<E>,
	logger: ResultLogger,
	options: ResultDecoratorOptions = {},
): ResultInterface<E> =>
	decorateResult(
		base,
		{
			onOk: entry => logger.debug(entry),
			onErr: entry => logger.error(entry),
		},
		options,
	);

export const withTracing = <E>(
	base: ResultInterface<E>,
	logger: ResultLogger,
	options: ResultDecoratorOptions = {},
): ResultInterface<E> =>
	decorateResult(
		base,
		{
			onStart: entry => logger.trace(entry),
			onOk: entry => logger.trace(entry),
			onErr: entry => logger.trace(entry),
		},
		options,
	);

// ---------- Utility types ----------------------------------------------------

export type ResultOk<T> = T extends Result<infer TData, unknown> ? TData : never;
export type ResultErr<T> = T extends Result<unknown, infer TError> ? TError : never;
export type ResultAsyncOk<T> = T extends ResultAsync<infer TData, unknown> ? TData : never;
export type ResultAsyncErr<T> = T extends ResultAsync<unknown, infer TError> ? TError : never;
