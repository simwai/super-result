import { describe, expect, it } from 'vitest'
import {
  err,
  fromThrowable,
  isErr,
  isOk,
  match,
  ok,
  unwrap,
} from './like-neverthrow.js'

describe('like-neverthrow API', () => {
  it('ok/err', () => {
    const res = ok(42)
    expect(isOk(res)).toBe(true)
    expect(unwrap(res)).toBe(42)

    const error = err('fail')
    expect(isErr(error)).toBe(true)
    expect(() => unwrap(error)).toThrow()
  })

  it('fromThrowable', async () => {
    const res = fromThrowable(() => 42)
    if (res instanceof Promise) {
      expect(isOk(await res)).toBe(true)
    } else {
      expect(isOk(res)).toBe(true)
    }

    const error = fromThrowable(() => {
      throw 'fail'
    })
    if (error instanceof Promise) {
      expect(isErr(await error)).toBe(true)
    } else {
      expect(isErr(error)).toBe(true)
    }
  })

  it('match', () => {
    const res = ok(42)
    const val = match(
      res,
      (v) => v + 1,
      (e) => 0,
    )
    expect(val).toBe(43)
  })
})
