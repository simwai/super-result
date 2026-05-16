import { describe, expect, it, vi } from 'vitest';
import {
	NonErrorThrown,
	createResult,
	err,
	errAsync,
	flatMap,
	flatMapAsync,
	fromAsyncThrowable,
	fromPromise,
	fromThrowable,
	isErr,
	isOk,
	map,
	mapAsync,
	mapErr,
	mapErrAsync,
	match,
	matchAsync,
	ok,
	okAsync,
	unwrap,
	unwrapAsync,
	unwrapOr,
	unwrapOrAsync,
	unwrapOrElse,
	unwrapOrElseAsync,
} from './index.js';

describe('Constructors', () => {
	it('ok() should create an Ok result', () => {
		const result = ok(42);
		expect(result).toEqual({ type: 'ok', value: 42 });
	});

	it('err() should create an Err result', () => {
		const result = err('error');
		expect(result).toEqual({ type: 'err', error: 'error' });
	});

	it('okAsync() should create a Promise resolving to Ok', async () => {
		const result = await okAsync(42);
		expect(result).toEqual({ type: 'ok', value: 42 });
	});

	it('errAsync() should create a Promise resolving to Err', async () => {
		const result = await errAsync('error');
		expect(result).toEqual({ type: 'err', error: 'error' });
	});
});

describe('Guards', () => {
	it('isOk() should return true for Ok, false for Err', () => {
		expect(isOk(ok(42))).toBe(true);
		expect(isOk(err('error'))).toBe(false);
	});

	it('isErr() should return true for Err, false for Ok', () => {
		expect(isErr(err('error'))).toBe(true);
		expect(isErr(ok(42))).toBe(false);
	});
});

describe('Capture helpers', () => {
	describe('fromThrowable', () => {
		it('should return Ok when function returns value', () => {
			const result = fromThrowable(() => 42);
			expect(result).toEqual(ok(42));
		});

		it('should return Err when function throws', () => {
			const error = new Error('boom');
			const result = fromThrowable(() => {
				throw error;
			});
			expect(result).toEqual(err(error));
		});
	});

	describe('fromPromise', () => {
		it('should resolve to Ok when promise resolves', async () => {
			const result = await fromPromise(Promise.resolve(42), (e) => e);
			expect(result).toEqual(ok(42));
		});

		it('should resolve to Err when promise rejects', async () => {
			const error = new Error('boom');
			const result = await fromPromise(Promise.reject(error), (e) => e);
			expect(result).toEqual(err(error));
		});
	});

	describe('fromAsyncThrowable', () => {
		it('should resolve to Ok when async function returns', async () => {
			const result = await fromAsyncThrowable(
				async () => 42,
				(e) => e,
			);
			expect(result).toEqual(ok(42));
		});

		it('should resolve to Err when async function throws', async () => {
			const error = new Error('boom');
			const result = await fromAsyncThrowable(
				async () => {
					throw error;
				},
				(e) => e,
			);
			expect(result).toEqual(err(error));
		});
	});
});

describe('Mapping', () => {
	describe('map', () => {
		it('should transform Ok value', () => {
			const result = map(ok(21), (n) => n * 2);
			expect(result).toEqual(ok(42));
		});

		it('should pass through Err', () => {
			const result = map(err<string>('error'), (n: number) => n * 2);
			expect(result).toEqual(err('error'));
		});
	});

	describe('mapAsync', () => {
		it('should transform Ok value asynchronously', async () => {
			const result = await mapAsync(okAsync(21), async (n) => n * 2);
			expect(result).toEqual(ok(42));
		});

		it('should pass through Err asynchronously', async () => {
			const result = await mapAsync(errAsync<string>('error'), async (n: number) => n * 2);
			expect(result).toEqual(err('error'));
		});
	});

	describe('mapErr', () => {
		it('should transform Err value', () => {
			const result = mapErr(err('error'), (s) => s.toUpperCase());
			expect(result).toEqual(err('ERROR'));
		});

		it('should pass through Ok', () => {
			const result = mapErr(ok(42), (s: string) => s.toUpperCase());
			expect(result).toEqual(ok(42));
		});
	});

	describe('mapErrAsync', () => {
		it('should transform Err value asynchronously', async () => {
			const result = await mapErrAsync(errAsync('error'), async (s) => s.toUpperCase());
			expect(result).toEqual(err('ERROR'));
		});

		it('should pass through Ok asynchronously', async () => {
			const result = await mapErrAsync(okAsync(42), async (s: string) => s.toUpperCase());
			expect(result).toEqual(ok(42));
		});
	});

	describe('flatMap', () => {
		it('should chain Ok to Ok', () => {
			const result = flatMap(ok(21), (n) => ok(n * 2));
			expect(result).toEqual(ok(42));
		});

		it('should chain Ok to Err', () => {
			const result = flatMap(ok(21), () => err('error'));
			expect(result).toEqual(err('error'));
		});

		it('should pass through original Err', () => {
			const result = flatMap(err<string>('original'), () => ok(42));
			expect(result).toEqual(err('original'));
		});
	});

	describe('flatMapAsync', () => {
		it('should chain Ok to Ok asynchronously', async () => {
			const result = await flatMapAsync(okAsync(21), async (n) => ok(n * 2));
			expect(result).toEqual(ok(42));
		});

		it('should chain Ok to ResultAsync', async () => {
			const result = await flatMapAsync(okAsync(21), (n) => okAsync(n * 2));
			expect(result).toEqual(ok(42));
		});

		it('should pass through original Err asynchronously', async () => {
			const result = await flatMapAsync(errAsync<string>('original'), async () => ok(42));
			expect(result).toEqual(err('original'));
		});
	});
});

describe('Pattern matching', () => {
	describe('match', () => {
		it('should call onOk for Ok', () => {
			const onOk = vi.fn((n) => n * 2);
			const onErr = vi.fn();
			const result = match(ok(21), onOk, onErr);
			expect(result).toBe(42);
			expect(onOk).toHaveBeenCalledWith(21);
			expect(onErr).not.toHaveBeenCalled();
		});

		it('should call onErr for Err', () => {
			const onOk = vi.fn();
			const onErr = vi.fn((s) => s.toUpperCase());
			const result = match(err('error'), onOk, onErr);
			expect(result).toBe('ERROR');
			expect(onErr).toHaveBeenCalledWith('error');
			expect(onOk).not.toHaveBeenCalled();
		});
	});

	describe('matchAsync', () => {
		it('should await and call onOk for Ok', async () => {
			const result = await matchAsync(
				okAsync(21),
				async (n) => n * 2,
				async () => 0,
			);
			expect(result).toBe(42);
		});

		it('should await and call onErr for Err', async () => {
			const result = await matchAsync(
				errAsync('error'),
				async () => 0,
				async (s) => s.toUpperCase(),
			);
			expect(result).toBe('ERROR');
		});
	});
});

describe('Unwrap helpers', () => {
	describe('unwrap', () => {
		it('should return value for Ok', () => {
			expect(unwrap(ok(42))).toBe(42);
		});

		it('should throw original error for Err(Error)', () => {
			const error = new Error('boom');
			expect(() => unwrap(err(error))).toThrow(error);
		});

		it('should throw NonErrorThrown for Err(non-Error)', () => {
			try {
				unwrap(err('string error'));
				expect.fail('Should have thrown');
			} catch (e) {
				expect(e).toBeInstanceOf(NonErrorThrown);
				expect((e as NonErrorThrown).value).toBe('string error');
			}
		});
	});

	describe('unwrapAsync', () => {
		it('should unwrap Ok asynchronously', async () => {
			expect(await unwrapAsync(okAsync(42))).toBe(42);
		});
	});

	describe('unwrapOr', () => {
		it('should return value for Ok', () => {
			expect(unwrapOr(ok(42), 0)).toBe(42);
		});

		it('should return default for Err', () => {
			expect(unwrapOr(err('error'), 0)).toBe(0);
		});
	});

	describe('unwrapOrAsync', () => {
		it('should unwrapOr asynchronously', async () => {
			expect(await unwrapOrAsync(okAsync(42), 0)).toBe(42);
			expect(await unwrapOrAsync(errAsync('error'), 0)).toBe(0);
		});
	});

	describe('unwrapOrElse', () => {
		it('should return value for Ok', () => {
			expect(unwrapOrElse(ok(42), () => 0)).toBe(42);
		});

		it('should return result of onErr for Err', () => {
			expect(unwrapOrElse(err('error'), (s) => s.length)).toBe(5);
		});
	});

	describe('unwrapOrElseAsync', () => {
		it('should unwrapOrElse asynchronously', async () => {
			expect(await unwrapOrElseAsync(okAsync(42), async () => 0)).toBe(42);
			expect(await unwrapOrElseAsync(errAsync('error'), async (s) => s.length)).toBe(5);
		});
	});
});

describe('Factory (createResult)', () => {
	const AppError = (msg: string) => ({ message: msg, _tag: 'AppError' });
	const Result = createResult((e) => AppError(e instanceof Error ? e.message : String(e)));

	it('should provide bound ok/err constructors', () => {
		expect(Result.ok(42)).toEqual(ok(42));
		expect(Result.err(AppError('fail'))).toEqual(err(AppError('fail')));
	});

	it('should provide bound okAsync/errAsync constructors', async () => {
		expect(await Result.okAsync(42)).toEqual(ok(42));
		expect(await Result.errAsync(AppError('fail'))).toEqual(err(AppError('fail')));
	});

	describe('Result.from', () => {
		it('should handle sync factory', () => {
			expect(Result.from(() => 42)).toEqual(ok(42));
			expect(
				Result.from(() => {
					throw 'boom';
				}),
			).toEqual(err(AppError('boom')));
		});

		it('should handle async factory', async () => {
			expect(await Result.from(async () => 42)).toEqual(ok(42));
			expect(
				await Result.from(async () => {
					throw 'boom';
				}),
			).toEqual(err(AppError('boom')));
		});

		it('should handle Promise directly', async () => {
			expect(await Result.from(Promise.resolve(42))).toEqual(ok(42));
			expect(await Result.from(Promise.reject('boom'))).toEqual(err(AppError('boom')));
		});
	});

	it('should provide bound mapping helpers', () => {
		const r = ok(21);
		expect(Result.map(r, (n) => n * 2)).toEqual(ok(42));
		expect(Result.flatMap(r, (n) => ok(n * 2))).toEqual(ok(42));
	});

	it('should provide bound unwrap helpers', () => {
		expect(Result.unwrap(ok(42))).toBe(42);
		expect(Result.unwrapOr(err(AppError('fail')), 0)).toBe(0);
	});
});

describe('Factory coverage', () => {
	const Result = createResult((e) => String(e));

	it('should cover fromThrowable', () => {
		expect(Result.fromThrowable(() => 42)).toEqual(ok(42));
		expect(
			Result.fromThrowable(() => {
				throw 'boom';
			}),
		).toEqual(err('boom'));
	});

	it('should cover fromPromise', async () => {
		expect(await Result.fromPromise(Promise.resolve(42))).toEqual(ok(42));
	});

	it('should cover fromAsyncThrowable', async () => {
		expect(await Result.fromAsyncThrowable(async () => 42)).toEqual(ok(42));
	});
});
