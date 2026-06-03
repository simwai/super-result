import { describe, expect, it } from 'vitest'
import { Result, err, ok } from './index.js'

describe('Result Class', () => {
  it('should handle synchronous success', () => {
    const res = Result.ok(42)
    expect(res.isOkSync()).toBe(true)
    expect(res.value).toBe(42)
  })

  it('should handle synchronous error', () => {
    const res = Result.err('fail')
    expect(res.isErrSync()).toBe(true)
    expect(res.error).toBe('fail')
  })

  it('should handle asynchronous success', async () => {
    const res = Result.async(Promise.resolve(ok(42)))
    expect(await res.isOk()).toBe(true)
    expect(await res.unwrap()).toBe(42)
    expect(res.value).toBeUndefined()
  })

  it('should handle asynchronous error', async () => {
    const res = Result.async(Promise.resolve(err('fail')))
    expect(await res.isErr()).toBe(true)
    expect(res.error).toBeUndefined()
  })
})
