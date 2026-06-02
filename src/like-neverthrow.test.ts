import { describe, expect, it, vi } from 'vitest'
import {
  FinallyError,
  NonErrorThrown,
  andThen,
  andThenAsync,
  combine,
  combineAsync,
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
  onFinally,
  onFinallyAsync,
  orElse,
  orElseAsync,
  unwrap,
  unwrapAsync,
  unwrapOr,
  unwrapOrAsync,
  unwrapOrElse,
  unwrapOrElseAsync,
} from './like-neverthrow'

describe('Basic Constructors', () => {
  it('ok() should create an Ok result', () => {
    const result = ok(42)
    expect(result).toEqual({ type: 'ok', value: 42 })
  })

  it('err() should create an Err result', () => {
    const result = err('error')
    expect(result).toEqual({ type: 'err', error: 'error' })
  })

  it('okAsync() should create a Promise resolving to Ok', async () => {
    const result = await okAsync(42)
    expect(result).toEqual({ type: 'ok', value: 42 })
  })

  it('errAsync() should create a Promise resolving to Err', async () => {
    const result = await errAsync('error')
    expect(result).toEqual({ type: 'err', error: 'error' })
  })
})

describe('Checks', () => {
  it('isOk() should return true for Ok, false for Err', () => {
    expect(isOk(ok(42))).toBe(true)
    expect(isOk(err('error'))).toBe(false)
  })

  it('isErr() should return true for Err, false for Ok', () => {
    expect(isErr(err('error'))).toBe(true)
    expect(isErr(ok(42))).toBe(false)
  })
})

describe('Capture helpers (Standalone)', () => {
  describe('fromThrowable', () => {
    it('should return Ok when function returns value', () => {
      const result = fromThrowable(
        () => 42,
        (e) => String(e),
      )
      expect(result).toEqual(ok(42))
    })

    it('should return Err when function throws', () => {
      const result = fromThrowable(
        () => {
          throw 'boom'
        },
        (e) => String(e),
      )
      expect(result).toEqual(err('boom'))
    })
  })

  describe('fromPromise', () => {
    it('should resolve to Ok when promise resolves', async () => {
      const result = await fromPromise(Promise.resolve(42), (e) => String(e))
      expect(result).toEqual(ok(42))
    })

    it('should resolve to Err when promise rejects', async () => {
      const result = await fromPromise(Promise.reject('boom'), (e) => String(e))
      expect(result).toEqual(err('boom'))
    })
  })

  describe('fromAsyncThrowable', () => {
    it('should resolve to Ok when async function returns', async () => {
      const result = await fromAsyncThrowable(
        async () => 42,
        (e) => String(e),
      )
      expect(result).toEqual(ok(42))
    })

    it('should resolve to Err when async function throws', async () => {
      const result = await fromAsyncThrowable(
        async () => {
          throw 'boom'
        },
        (e) => String(e),
      )
      expect(result).toEqual(err('boom'))
    })
  })
})

describe('Mapping', () => {
  describe('map', () => {
    it('should transform Ok value', () => {
      const result = map(ok(21), (n) => n * 2)
      expect(result).toEqual(ok(42))
    })

    it('should pass through Err', () => {
      const result = map(err('error'), (n: number) => n * 2)
      expect(result).toEqual(err('error'))
    })
  })

  describe('mapAsync', () => {
    it('should transform Ok value asynchronously', async () => {
      const result = await mapAsync(okAsync(21), async (n) => n * 2)
      expect(result).toEqual(ok(42))
    })

    it('should pass through Err asynchronously', async () => {
      const result = await mapAsync(errAsync('error'), async (n: number) => n * 2)
      expect(result).toEqual(err('error'))
    })
  })

  describe('mapErr', () => {
    it('should transform Err value', () => {
      const result = mapErr(err('error'), (s) => s.toUpperCase())
      expect(result).toEqual(err('ERROR'))
    })

    it('should pass through Ok', () => {
      const result = mapErr(ok(42), (s: string) => s.toUpperCase())
      expect(result).toEqual(ok(42))
    })
  })

  describe('mapErrAsync', () => {
    it('should transform Err value asynchronously', async () => {
      const result = await mapErrAsync(errAsync('error'), async (s) =>
        s.toUpperCase(),
      )
      expect(result).toEqual(err('ERROR'))
    })

    it('should pass through Ok asynchronously', async () => {
      const result = await mapErrAsync(okAsync(42), async (s: string) =>
        s.toUpperCase(),
      )
      expect(result).toEqual(ok(42))
    })
  })

  describe('flatMap', () => {
    it('should chain Ok to Ok', () => {
      const result = flatMap(ok(21), (n) => ok(n * 2))
      expect(result).toEqual(ok(42))
    })

    it('should chain Ok to Err', () => {
      const result = flatMap(ok(21), () => err('fail'))
      expect(result).toEqual(err('fail'))
    })

    it('should pass through original Err', () => {
      const result = flatMap(err('error'), (n: number) => ok(n * 2))
      expect(result).toEqual(err('error'))
    })
  })

  describe('flatMapAsync', () => {
    it('should chain Ok to Ok asynchronously', async () => {
      const result = await flatMapAsync(okAsync(21), async (n) => ok(n * 2))
      expect(result).toEqual(ok(42))
    })

    it('should chain Ok to ResultAsync', async () => {
      const result = await flatMapAsync(okAsync(21), (n) => okAsync(n * 2))
      expect(result).toEqual(ok(42))
    })

    it('should pass through original Err asynchronously', async () => {
      const result = await flatMapAsync(
        errAsync('error'),
        async (n: number) => ok(n * 2),
      )
      expect(result).toEqual(err('error'))
    })
  })
})

describe('Pattern Matching', () => {
  describe('match', () => {
    it('should call onOk for Ok', () => {
      const result = match(
        ok(42),
        (n) => n * 2,
        () => 0,
      )
      expect(result).toBe(84)
    })

    it('should call onErr for Err', () => {
      const result = match(
        err('error'),
        () => 0,
        (s) => s.toUpperCase(),
      )
      expect(result).toBe('ERROR')
    })
  })

  describe('matchAsync', () => {
    it('should await and call onOk for Ok', async () => {
      const result = await matchAsync(
        okAsync(42),
        async (n) => n * 2,
        async () => 0,
      )
      expect(result).toBe(84)
    })

    it('should await and call onErr for Err', async () => {
      const result = await matchAsync(
        errAsync('error'),
        async () => 0,
        async (s) => s.toUpperCase(),
      )
      expect(result).toBe('ERROR')
    })
  })
})

describe('Unwrap helpers', () => {
  describe('unwrap', () => {
    it('should return value for Ok', () => {
      expect(unwrap(ok(42))).toBe(42)
    })

    it('should throw original error for Err(Error)', () => {
      const error = new Error('boom')
      expect(() => unwrap(err(error))).toThrow(error)
    })

    it('should throw NonErrorThrown for Err(non-Error)', () => {
      try {
        unwrap(err('string error'))
        expect.fail('Should have thrown')
      } catch (e) {
        expect(e).toBeInstanceOf(NonErrorThrown)
        expect((e as NonErrorThrown).value).toBe('string error')
      }
    })
  })

  describe('unwrapAsync', () => {
    it('should unwrap Ok asynchronously', async () => {
      expect(await unwrapAsync(okAsync(42))).toBe(42)
    })
  })

  describe('unwrapOr', () => {
    it('should return value for Ok', () => {
      expect(unwrapOr(ok(42), 0)).toBe(42)
    })

    it('should return default for Err', () => {
      expect(unwrapOr(err('error'), 0)).toBe(0)
    })
  })

  describe('unwrapOrAsync', () => {
    it('should unwrapOr asynchronously', async () => {
      expect(await unwrapOrAsync(okAsync(42), 0)).toBe(42)
      expect(await unwrapOrAsync(errAsync('error'), 0)).toBe(0)
    })
  })

  describe('unwrapOrElse', () => {
    it('should return value for Ok', () => {
      expect(unwrapOrElse(ok(42), () => 0)).toBe(42)
    })

    it('should return result of onErr for Err', () => {
      expect(unwrapOrElse(err('error'), (s) => s.length)).toBe(5)
    })
  })

  describe('unwrapOrElseAsync', () => {
    it('should unwrapOrElse asynchronously', async () => {
      expect(await unwrapOrElseAsync(okAsync(42), async () => 0)).toBe(42)
      expect(
        await unwrapOrElseAsync(errAsync('error'), async (s) => s.length),
      ).toBe(5)
    })
  })
})

describe('Factory (createResult)', () => {
  const AppError = (msg: string) => ({ message: msg, _tag: 'AppError' })
  const Result = createResult((e) =>
    AppError(e instanceof Error ? e.message : String(e)),
  )

  it('should provide bound ok/err constructors', () => {
    expect(Result.ok(42)).toEqual(ok(42))
    expect(Result.err(AppError('fail'))).toEqual(err(AppError('fail')))
  })

  it('should provide bound okAsync/errAsync constructors', async () => {
    expect(await Result.okAsync(42)).toEqual(ok(42))
    expect(await Result.errAsync(AppError('fail'))).toEqual(
      err(AppError('fail')),
    )
  })

  describe('Result.from', () => {
    it('should handle sync factory', () => {
      expect(Result.from(() => 42)).toEqual(ok(42))
      expect(
        Result.from(() => {
          throw 'boom'
        }),
      ).toEqual(err(AppError('boom')))
    })

    it('should handle async factory', async () => {
      expect(await Result.from(async () => 42)).toEqual(ok(42))
      expect(
        await Result.from(async () => {
          throw 'boom'
        }),
      ).toEqual(err(AppError('boom')))
    })

    it('should handle Promise directly', async () => {
      expect(await Result.from(Promise.resolve(42))).toEqual(ok(42))
      expect(await Result.from(Promise.reject('boom'))).toEqual(
        err(AppError('boom')),
      )
    })
  })

  it('should provide bound mapping helpers', () => {
    const r = ok(21)
    expect(Result.map(r, (n) => n * 2)).toEqual(ok(42))
    expect(Result.flatMap(r, (n) => ok(n * 2))).toEqual(ok(42))
  })

  it('should provide bound unwrap helpers', () => {
    expect(Result.unwrap(ok(42))).toBe(42)
    expect(Result.unwrapOr(err(AppError('fail')), 0)).toBe(0)
  })
})

describe('Factory coverage', () => {
  const Result = createResult((e) => String(e))

  it('should cover fromThrowable', () => {
    expect(Result.fromThrowable(() => 42)).toEqual(ok(42))
    expect(
      Result.fromThrowable(() => {
        throw 'boom'
      }),
    ).toEqual(err('boom'))
  })

  it('should cover fromPromise', async () => {
    expect(
      await Result.fromPromise(Promise.resolve(42), {
        catch: (e: any) => String(e),
      }),
    ).toEqual(ok(42))
  })

  it('should cover fromAsyncThrowable', async () => {
    expect(
      await Result.fromAsyncThrowable(async () => 42, {
        catch: (e: any) => String(e),
      }),
    ).toEqual(ok(42))
  })
})

describe('Optional factory', () => {
  it('should work without config', () => {
    const Result = createResult()
    expect(Result.from(() => 42)).toEqual(ok(42))
    expect(
      Result.from(() => {
        throw 'err'
      }),
    ).toEqual(err('err'))
  })
})

describe('onFinally', () => {
  it('should run callback and return original Ok result', () => {
    const callback = vi.fn()
    const result = ok(42)
    const finalResult = onFinally(result, callback)
    expect(callback).toHaveBeenCalledWith(result)
    expect(finalResult).toEqual(result)
  })

  it('should run callback and return original Err result', () => {
    const callback = vi.fn()
    const result = err('error')
    const finalResult = onFinally(result, callback)
    expect(callback).toHaveBeenCalledWith(result)
    expect(finalResult).toEqual(result)
  })

  it('should return FinallyError if sync callback throws', () => {
    const error = 'cleanup failed'
    const result = ok(42)
    const finalResult = onFinally(result, () => {
      throw error
    })
    expect(finalResult).toEqual(err(new FinallyError(result, error)))
  })

  it('should return ResultAsync resolving to FinallyError if async callback rejects', async () => {
    const error = 'async cleanup failed'
    const result = ok(42)
    const finalResult = await onFinally(result, async () => {
      throw error
    })
    expect(finalResult).toEqual(err(new FinallyError(result, error)))
  })
})

describe('Factory with finally', () => {
  const Result = createResult({
    mapError: (e) => ({ msg: String(e), type: 'error' }),
    mapFinallyError: (e) => ({ msg: String(e), type: 'finally' }),
  })

  it('Result.from should support finally option (sync)', () => {
    const callback = vi.fn()
    const res = Result.from(() => 42, { finally: callback })
    expect(res).toEqual(ok(42))
    expect(callback).toHaveBeenCalledWith(ok(42))
  })

  it('Result.from should support finally option (async callback)', async () => {
    const callback = vi.fn().mockResolvedValue(undefined)
    const res = await Result.from(() => 42, { finally: callback })
    expect(res).toEqual(ok(42))
    expect(callback).toHaveBeenCalledWith(ok(42))
  })

  it('Result.from should capture finally error with mapFinallyError', () => {
    const res = Result.from(() => 42, {
      finally: () => {
        throw 'boom'
      },
    })
    expect(res).toEqual(
      err(new FinallyError(ok(42), { msg: 'boom', type: 'finally' })),
    )
  })

  it('Result.from should capture both catch and finally errors', () => {
    const res = Result.from(
      () => {
        throw 'catch me'
      },
      {
        finally: () => {
          throw 'finally me'
        },
      },
    )
    const originalErr = err({ msg: 'catch me', type: 'error' })
    expect(res).toEqual(
      err(
        new FinallyError(originalErr, { msg: 'finally me', type: 'finally' }),
      ),
    )
  })

  it('Result.from should allow overriding catch mapper', () => {
    const res = Result.from(
      () => {
        throw 'err'
      },
      { catch: (e) => `custom ${e}` },
    )
    expect(res).toEqual(err('custom err'))
  })
})

describe('Standalone onFinallyAsync', () => {
  it('should work with ResultAsync', async () => {
    const callback = vi.fn()
    const resPromise = Promise.resolve(ok(42))
    const finalRes = await onFinallyAsync(resPromise, callback)
    expect(callback).toHaveBeenCalledWith(ok(42))
    expect(finalRes).toEqual(ok(42))
  })
})

describe('createResult factory variant', () => {
  it('should support mapError function directly', () => {
    const Result = createResult((e) => `error ${e}`)
    expect(
      Result.from(() => {
        throw 'oops'
      }),
    ).toEqual(err('error oops'))
  })
})

describe('Edge cases and defaults', () => {
  it('onFinallyAsync default mapFinallyError', async () => {
    const res = await onFinallyAsync(Promise.resolve(ok(1)), () => {
      throw 'err'
    })
    expect(res).toEqual(err(new FinallyError(ok(1), 'err')))
  })

  it('createResult default FE mapper', () => {
    const Result = createResult({ mapError: (_e) => 'E' })
    const res = Result.from(() => 1, {
      finally: () => {
        throw 'FE'
      },
    })
    expect(res).toEqual(err(new FinallyError(ok(1), 'FE')))
  })
})

describe('createResult single function config', () => {
  it('should use provided function as mapError', () => {
    const Result = createResult((_e) => 'err')
    expect(
      Result.from(() => {
        throw 1
      }),
    ).toEqual(err('err'))
  })
})

describe('createResult no config', () => {
  it('should use default unknown mappers', () => {
    const Result = createResult()
    expect(
      Result.from(() => {
        throw 'err'
      }),
    ).toEqual(err('err'))
  })
})

describe('createResult single function config with finally', () => {
  it('should use default FE mapper in single function config', () => {
    const Result = createResult((_e) => 'err')
    const res = Result.from(() => 1, {
      finally: () => {
        throw 'FE'
      },
    })
    expect(res).toEqual(err(new FinallyError(ok(1), 'FE')))
  })
})

describe('onFinallyAsync with async callback', () => {
  it('should await callback and return result', async () => {
    const result = ok(1)
    const finalRes = await onFinallyAsync(Promise.resolve(result), async () => {
      await new Promise((resolve) => setTimeout(resolve, 1))
    })
    expect(finalRes).toEqual(result)
  })
})

describe('New Neverthrow methods', () => {
  describe('andThen / andThenAsync', () => {
    it('should be aliases for flatMap', () => {
      expect(andThen).toBe(flatMap)
      expect(andThenAsync).toBe(flatMapAsync)
    })
  })

  describe('orElse', () => {
    it('should return original Ok', () => {
      const r = ok(42)
      expect(orElse(r, () => ok(0))).toBe(r)
    })

    it('should return new result for Err', () => {
      const r = err('fail')
      expect(orElse(r, (e) => ok(e.length))).toEqual(ok(4))
    })
  })

  describe('orElseAsync', () => {
    it('should return original Ok asynchronously', async () => {
      const r = ok(42)
      expect(await orElseAsync(okAsync(42), async () => ok(0))).toEqual(r)
    })

    it('should return new result for Err asynchronously', async () => {
      expect(await orElseAsync(errAsync('fail'), async (e) => ok(e.length))).toEqual(ok(4))
    })
  })

  describe('combine', () => {
    it('should combine multiple Ok results', () => {
      const res = combine([ok(1), ok('two'), ok(true)])
      expect(res).toEqual(ok([1, 'two', true]))
    })

    it('should return the first Err encountered', () => {
      const res = combine([ok(1), err('fail'), ok(3)])
      expect(res).toEqual(err('fail'))
    })
  })

  describe('combineAsync', () => {
    it('should combine multiple async Ok results', async () => {
      const res = await combineAsync([okAsync(1), okAsync('two'), okAsync(true)])
      expect(res).toEqual(ok([1, 'two', true]))
    })

    it('should return the first Err encountered asynchronously', async () => {
      const res = await combineAsync([okAsync(1), errAsync('fail'), okAsync(3)])
      expect(res).toEqual(err('fail'))
    })
  })

  describe('Factory (createResult) with new methods', () => {
    const Result = createResult()

    it('should have andThen and andThenAsync', () => {
      expect(Result.andThen).toBe(andThen)
      expect(Result.andThenAsync).toBe(andThenAsync)
    })

    it('should have orElse and orElseAsync', () => {
      expect(Result.orElse).toBe(orElse)
      expect(Result.orElseAsync).toBe(orElseAsync)
    })

    it('should have combine and combineAsync', () => {
      expect(Result.combine).toBe(combine)
      expect(Result.combineAsync).toBe(combineAsync)
    })
  })
})
