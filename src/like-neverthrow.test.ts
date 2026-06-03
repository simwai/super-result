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
  Ok,
  Err,
  Result,
} from './like-neverthrow.js'

describe('Basic Constructors', () => {
  it('ok() should create an Ok result', () => {
    const result = ok(42)
    expect(result.type).toBe('ok')
    expect(result).toBeInstanceOf(Ok)
    if (result.isOk()) {
      expect(result.value).toBe(42)
    }
  })

  it('err() should create an Err result', () => {
    const result = err('error')
    expect(result.type).toBe('err')
    expect(result).toBeInstanceOf(Err)
    if (result.isErr()) {
      expect(result.error).toBe('error')
    }
  })

  it('okAsync() should create a Promise resolving to Ok', async () => {
    const result = await okAsync(42)
    expect(result.isOk()).toBe(true)
  })

  it('errAsync() should create a Promise resolving to Err', async () => {
    const result = await errAsync('error')
    expect(result.isErr()).toBe(true)
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
        (e: unknown) => String(e),
      )
      expect(result.isOk()).toBe(true)
    })

    it('should return Err when function throws', () => {
      const result = fromThrowable(
        () => {
          throw 'boom'
        },
        (e: unknown) => String(e),
      )
      expect(result.isErr()).toBe(true)
    })
  })

  describe('fromPromise', () => {
    it('should resolve to Ok when promise resolves', async () => {
      const result = await fromPromise(Promise.resolve(42), (e: unknown) => String(e))
      expect(result.isOk()).toBe(true)
    })

    it('should resolve to Err when promise rejects', async () => {
      const result = await fromPromise(Promise.reject('boom'), (e: unknown) => String(e))
      expect(result.isErr()).toBe(true)
    })
  })

  describe('fromAsyncThrowable', () => {
    it('should resolve to Ok when async function returns', async () => {
      const result = await fromAsyncThrowable(
        async () => 42,
        (e: unknown) => String(e),
      )
      expect(result.isOk()).toBe(true)
    })

    it('should resolve to Err when async function throws', async () => {
      const result = await fromAsyncThrowable(
        async () => {
          throw 'boom'
        },
        (e: unknown) => String(e),
      )
      expect(result.isErr()).toBe(true)
    })
  })
})

describe('Mapping', () => {
  describe('map', () => {
    it('should transform Ok value', () => {
      const result = map(ok(21), (n: number) => n * 2)
      expect(unwrap(result)).toBe(42)
    })

    it('should pass through Err', () => {
      const result = map(err('error'), (n: number) => n * 2)
      expect(result.isErr()).toBe(true)
    })
  })

  describe('mapAsync', () => {
    it('should transform Ok value asynchronously', async () => {
      const result = await mapAsync(okAsync(21), async (n: number) => n * 2)
      expect(unwrap(result)).toBe(42)
    })

    it('should pass through Err asynchronously', async () => {
      const result = await mapAsync(errAsync('error'), async (n: number) => n * 2)
      expect(result.isErr()).toBe(true)
    })
  })

  describe('mapErr', () => {
    it('should transform Err value', () => {
      const result = mapErr(err('error'), (s: string) => s.toUpperCase())
      if (result.isErr()) {
        expect(result.error).toBe('ERROR')
      }
    })

    it('should pass through Ok', () => {
      const result = mapErr(ok(42), (s: string) => s.toUpperCase())
      expect(result.isOk()).toBe(true)
    })
  })

  describe('mapErrAsync', () => {
    it('should transform Err value asynchronously', async () => {
      const result = await mapErrAsync(errAsync('error'), async (s: string) =>
        s.toUpperCase(),
      )
      if (result.isErr()) {
        expect(result.error).toBe('ERROR')
      }
    })

    it('should pass through Ok asynchronously', async () => {
      const result = await mapErrAsync(okAsync(42), async (s: string) =>
        s.toUpperCase(),
      )
      expect(result.isOk()).toBe(true)
    })
  })

  describe('flatMap', () => {
    it('should chain Ok to Ok', () => {
      const result = flatMap(ok(21), (n: number) => ok(n * 2))
      expect(unwrap(result)).toBe(42)
    })

    it('should chain Ok to Err', () => {
      const result = flatMap(ok(21), () => err('fail'))
      expect(result.isErr()).toBe(true)
    })

    it('should pass through original Err', () => {
      const result = flatMap(err('error'), (n: number) => ok(n * 2))
      expect(result.isErr()).toBe(true)
    })
  })

  describe('flatMapAsync', () => {
    it('should chain Ok to Ok asynchronously', async () => {
      const result = await flatMapAsync(okAsync(21), async (n: number) => ok(n * 2))
      expect(unwrap(result)).toBe(42)
    })

    it('should chain Ok to ResultAsync', async () => {
      const result = await flatMapAsync(okAsync(21), (n: number) => okAsync(n * 2))
      expect(unwrap(result)).toBe(42)
    })

    it('should pass through original Err asynchronously', async () => {
      const result = await flatMapAsync(
        errAsync('error'),
        async (n: number) => ok(n * 2),
      )
      expect(result.isErr()).toBe(true)
    })
  })
})

describe('Pattern Matching', () => {
  describe('match', () => {
    it('should call onOk for Ok', () => {
      const result = match(
        ok(42),
        (n: number) => n * 2,
        () => 0,
      )
      expect(result).toBe(84)
    })

    it('should call onErr for Err', () => {
      const result = match(
        err('error'),
        () => 0,
        (s: string) => s.toUpperCase(),
      )
      expect(result).toBe('ERROR')
    })
  })

  describe('matchAsync', () => {
    it('should await and call onOk for Ok', async () => {
      const result = await matchAsync(
        okAsync(42),
        async (n: number) => n * 2,
        async () => 0,
      )
      expect(result).toBe(84)
    })

    it('should await and call onErr for Err', async () => {
      const result = await matchAsync(
        errAsync('error'),
        async () => 0,
        async (s: string) => s.toUpperCase(),
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
      expect(unwrapOrElse(err('error'), (s: string) => s.length)).toBe(5)
    })
  })

  describe('unwrapOrElseAsync', () => {
    it('should unwrapOrElse asynchronously', async () => {
      expect(await unwrapOrElseAsync(okAsync(42), async () => 0)).toBe(42)
      expect(
        await unwrapOrElseAsync(errAsync('error'), async (s: string) => s.length),
      ).toBe(5)
    })
  })
})

describe('Factory (createResult)', () => {
  const AppError = (msg: string) => ({ message: msg, _tag: 'AppError' })
  const ResultFactory = createResult((e: unknown) =>
    AppError(e instanceof Error ? e.message : String(e)),
  )

  it('should provide bound ok/err constructors', () => {
    expect(ResultFactory.ok(42).isOk()).toBe(true)
    expect(ResultFactory.err(AppError('fail')).isErr()).toBe(true)
  })

  it('should provide bound okAsync/errAsync constructors', async () => {
    expect((await ResultFactory.okAsync(42)).isOk()).toBe(true)
    expect((await ResultFactory.errAsync(AppError('fail'))).isErr()).toBe(true)
  })

  describe('ResultFactory.from', () => {
    it('should handle sync factory', () => {
      const res = ResultFactory.from(() => 42) as Result<number, any>
      expect(res.isOk()).toBe(true)
      const resErr = ResultFactory.from(() => {
        throw 'boom'
      }) as Result<never, any>
      expect(resErr.isErr()).toBe(true)
    })

    it('should handle async factory', async () => {
      const res = await ResultFactory.from(async () => 42)
      expect(res.isOk()).toBe(true)
      const resErr = await ResultFactory.from(async () => {
        throw 'boom'
      })
      expect(resErr.isErr()).toBe(true)
    })

    it('should handle Promise directly', async () => {
      const res = await ResultFactory.from(Promise.resolve(42))
      expect(res.isOk()).toBe(true)
      const resErr = await ResultFactory.from(Promise.reject('boom'))
      expect(resErr.isErr()).toBe(true)
    })
  })

  it('should provide bound mapping helpers', () => {
    const r = ok(21)
    expect(unwrap(ResultFactory.map(r, (n: number) => n * 2))).toBe(42)
    expect(unwrap(ResultFactory.flatMap(r, (n: number) => ok(n * 2)))).toBe(42)
  })

  it('should provide bound unwrap helpers', () => {
    expect(ResultFactory.unwrap(ok(42))).toBe(42)
    expect(ResultFactory.unwrapOr(err(AppError('fail')), 0)).toBe(0)
  })
})

describe('Factory coverage', () => {
  const ResultFactory = createResult((e: unknown) => String(e))

  it('should cover fromThrowable', () => {
    expect(ResultFactory.fromThrowable(() => 42).isOk()).toBe(true)
    expect(
      ResultFactory.fromThrowable(() => {
        throw 'boom'
      }).isErr(),
    ).toBe(true)
  })

  it('should cover fromPromise', async () => {
    expect(
      (await ResultFactory.fromPromise(Promise.resolve(42), {
        catch: (e: any) => String(e),
      })).isOk(),
    ).toBe(true)
  })

  it('should cover fromAsyncThrowable', async () => {
    expect(
      (await ResultFactory.fromAsyncThrowable(async () => 42, {
        catch: (e: any) => String(e),
      })).isOk(),
    ).toBe(true)
  })
})

describe('Optional factory', () => {
  it('should work without config', () => {
    const ResultFactory = createResult()
    expect((ResultFactory.from(() => 42) as Result<number, any>).isOk()).toBe(true)
    expect(
      (ResultFactory.from(() => {
        throw 'err'
      }) as Result<never, any>).isErr(),
    ).toBe(true)
  })
})

describe('onFinally', () => {
  it('should run callback and return original Ok result', () => {
    const callback = vi.fn()
    const result = ok(42)
    const finalResult = onFinally(result, callback) as Result<number, any>
    expect(callback).toHaveBeenCalledWith(result)
    expect(finalResult).toEqual(result)
  })

  it('should run callback and return original Err result', () => {
    const callback = vi.fn()
    const result = err('error')
    const finalResult = onFinally(result, callback) as Result<never, any>
    expect(callback).toHaveBeenCalledWith(result)
    expect(finalResult).toEqual(result)
  })

  it('should return FinallyError if sync callback throws', () => {
    const error = 'cleanup failed'
    const result = ok(42)
    const finalResult = onFinally(result, () => {
      throw error
    }) as Result<number, any>
    if (finalResult.isErr()) {
      expect(finalResult.error).toEqual(new FinallyError(result as any, error))
    }
  })

  it('should return ResultAsync resolving to FinallyError if async callback rejects', async () => {
    const error = 'async cleanup failed'
    const result = ok(42)
    const finalResult = await onFinally(result, async () => {
      throw error
    })
    if (finalResult.isErr()) {
      expect(finalResult.error).toEqual(new FinallyError(result as any, error))
    }
  })
})

describe('Factory with finally', () => {
  const ResultFactory = createResult({
    mapError: (e: unknown) => ({ msg: String(e), type: 'error' }),
    mapFinallyError: (e: unknown) => ({ msg: String(e), type: 'finally' }),
  })

  it('Result.from should support finally option (sync)', () => {
    const callback = vi.fn()
    const res = ResultFactory.from(() => 42, { finally: callback }) as Result<number, any>
    expect(res.isOk()).toBe(true)
    expect(callback).toHaveBeenCalledWith(ok(42))
  })

  it('Result.from should support finally option (async callback)', async () => {
    const callback = vi.fn().mockResolvedValue(undefined)
    const res = await ResultFactory.from(() => 42, { finally: callback })
    expect(res.isOk()).toBe(true)
    expect(callback).toHaveBeenCalledWith(ok(42))
  })

  it('Result.from should capture finally error with mapFinallyError', () => {
    const res = ResultFactory.from(() => 42, {
      finally: () => {
        throw 'boom'
      },
    }) as Result<number, any>
    if (res.isErr()) {
      expect(res.error).toEqual(
        new FinallyError(ok(42) as any, { msg: 'boom', type: 'finally' }),
      )
    }
  })

  it('Result.from should capture both catch and finally errors', () => {
    const res = ResultFactory.from(
      () => {
        throw 'catch me'
      },
      {
        finally: () => {
          throw 'finally me'
        },
      },
    ) as Result<never, any>
    const originalErr = err({ msg: 'catch me', type: 'error' })
    if (res.isErr()) {
      expect(res.error).toEqual(
        new FinallyError(originalErr as any, { msg: 'finally me', type: 'finally' }),
      )
    }
  })

  it('Result.from should allow overriding catch mapper', () => {
    const res = ResultFactory.from(
      () => {
        throw 'err'
      },
      { catch: (e: any) => "custom " + e },
    ) as Result<never, any>
    if (res.isErr()) {
      expect(res.error).toBe('custom err')
    }
  })
})

describe('Standalone onFinallyAsync', () => {
  it('should work with ResultAsync', async () => {
    const callback = vi.fn()
    const resPromise = Promise.resolve(ok(42))
    const finalRes = await onFinallyAsync(resPromise, callback)
    expect(callback).toHaveBeenCalledWith(ok(42))
    expect(finalRes.isOk()).toBe(true)
  })
})

describe('createResult factory variant', () => {
  it('should support mapError function directly', () => {
    const ResultFactory = createResult((e: unknown) => "error " + e)
    expect(
      (ResultFactory.from(() => {
        throw 'oops'
      }) as Result<never, any>).isErr(),
    ).toBe(true)
  })
})

describe('Edge cases and defaults', () => {
  it('onFinallyAsync default mapFinallyError', async () => {
    const res = await onFinallyAsync(Promise.resolve(ok(1)), () => {
      throw 'err'
    })
    if (res.isErr()) {
      expect(res.error).toEqual(new FinallyError(ok(1) as any, 'err'))
    }
  })

  it('createResult default FE mapper', () => {
    const ResultFactory = createResult({ mapError: (_e: unknown) => 'E' })
    const res = ResultFactory.from(() => 1, {
      finally: () => {
        throw 'FE'
      },
    }) as Result<number, any>
    if (res.isErr()) {
      expect(res.error).toEqual(new FinallyError(ok(1) as any, 'FE'))
    }
  })
})

describe('createResult single function config', () => {
  it('should use provided function as mapError', () => {
    const ResultFactory = createResult((_e: unknown) => 'err')
    expect(
      (ResultFactory.from(() => {
        throw 1
      }) as Result<never, any>).isErr(),
    ).toBe(true)
  })
})

describe('createResult no config', () => {
  it('should use default unknown mappers', () => {
    const ResultFactory = createResult()
    expect(
      (ResultFactory.from(() => {
        throw 'err'
      }) as Result<never, any>).isErr(),
    ).toBe(true)
  })
})

describe('createResult single function config with finally', () => {
  it('should use default FE mapper in single function config', () => {
    const ResultFactory = createResult((_e: unknown) => 'err')
    const res = ResultFactory.from(() => 1, {
      finally: () => {
        throw 'FE'
      },
    }) as Result<number, any>
    if (res.isErr()) {
      expect(res.error).toEqual(new FinallyError(ok(1) as any, 'FE'))
    }
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
      const r = ok(21)
      expect(andThen(r, (n: number) => ok(n * 2))).toEqual(flatMap(r, (n: number) => ok(n * 2)))
    })
  })

  describe('orElse', () => {
    it('should return original Ok', () => {
      const r = ok(42)
      expect(orElse(r, () => ok(0))).toBe(r)
    })

    it('should return new result for Err', () => {
      const r = err('fail')
      const next = orElse(r, (e: string) => ok(e.length))
      expect(unwrap(next)).toBe(4)
    })
  })

  describe('orElseAsync', () => {
    it('should return original Ok asynchronously', async () => {
      const r = ok(42)
      expect(await orElseAsync(okAsync(42), async () => ok(0))).toEqual(r)
    })

    it('should return new result for Err asynchronously', async () => {
      const next = await orElseAsync(errAsync('fail'), async (e: string) => ok(e.length))
      expect(unwrap(next)).toBe(4)
    })
  })

  describe('combine', () => {
    it('should combine multiple Ok results', () => {
      const res = combine([ok(1), ok('two'), ok(true)])
      expect(unwrap(res)).toEqual([1, 'two', true])
    })

    it('should return the first Err encountered', () => {
      const res = combine([ok(1), err('fail'), ok(3)])
      expect(res.isErr()).toBe(true)
    })
  })

  describe('combineAsync', () => {
    it('should combine multiple async Ok results', async () => {
      const res = await combineAsync([okAsync(1), okAsync('two'), okAsync(true)])
      expect(unwrap(res)).toEqual([1, 'two', true])
    })

    it('should return the first Err encountered asynchronously', async () => {
      const res = await combineAsync([okAsync(1), errAsync('fail'), okAsync(3)])
      expect(res.isErr()).toBe(true)
    })
  })

  describe('Factory (createResult) with new methods', () => {
    const ResultFactory = createResult()

    it('should have andThen and andThenAsync', () => {
      const r = ok(21)
      expect(ResultFactory.andThen(r, (n: number) => ok(n * 2))).toEqual(andThen(r, (n: number) => ok(n * 2)))
    })

    it('should have orElse and orElseAsync', () => {
      expect(ResultFactory.orElse).toBe(orElse)
      expect(ResultFactory.orElseAsync).toBe(orElseAsync)
    })

    it('should have combine and combineAsync', () => {
      expect(ResultFactory.combine).toBe(combine)
      expect(ResultFactory.combineAsync).toBe(combineAsync)
    })
  })
})
