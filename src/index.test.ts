import { describe, expect, it, vi } from 'vitest'
import * as Fn from './functions.js'
import { NonErrorThrown, Result } from './index.js'

describe('Result Class', () => {
  it('Result.ok()', () => {
    const r = Result.ok(42)
    expect(r.isOk()).toBe(true)
    expect(r.unwrap()).toBe(42)
  })

  it('Result.err()', () => {
    const r = Result.err('fail')
    expect(r.isErr()).toBe(true)
    expect(() => r.unwrap()).toThrow(NonErrorThrown)
  })

  it('Result.from() unified', async () => {
    expect(Result.from(42).unwrap()).toBe(42)
    expect(Result.from(() => 42).unwrap()).toBe(42)
    const res = await Result.from(Promise.resolve(42)).unwrap()
    expect(res).toBe(42)
  })

  it('then() error wrapping', async () => {
    const r = Result.ok(42).then(() => {
      throw 'oops'
    })
    await expect(r).rejects.toThrow(NonErrorThrown)
  })
})

describe('Functional API', () => {
  it('from() unified', async () => {
    const r1 = Fn.from(42) as Fn.RawResult<number, unknown>
    expect(Fn.unwrap(r1)).toBe(42)

    const r2 = Fn.from(() => 42) as Fn.RawResult<number, unknown>
    expect(Fn.unwrap(r2)).toBe(42)

    const r3 = await Fn.from(Promise.resolve(42))
    expect(Fn.unwrap(r3)).toBe(42)
  })

  it('final()', () => {
    const spy = vi.fn()
    Fn.final(Fn.ok(42), spy)
    expect(spy).toHaveBeenCalled()
  })

  it('isOk/isErr sync and async', async () => {
    expect(Fn.isOk(Fn.ok(1))).toBe(true)
    expect(await Fn.isOk(Promise.resolve(Fn.ok(1)))).toBe(true)
  })
})
