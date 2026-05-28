import { describe, expect, it, vi } from 'vitest'
import { Result, err, ok } from './index.js'

describe('Result Class', () => {
  it('should create ok result', async () => {
    const r = Result.ok(42)
    expect(await r.isOk()).toBe(true)
    expect(await r.unwrap()).toBe(42)
  })

  it('should create err result', async () => {
    const r = Result.err('fail')
    expect(await r.isErr()).toBe(true)
    await expect(r.unwrap()).rejects.toBe('fail')
  })

  it('should map values', async () => {
    const r = Result.ok(21).map((n) => n * 2)
    expect(await r.unwrap()).toBe(42)
  })

  it('should flatMap values', async () => {
    const r = Result.ok(21).flatMap((n) => Result.ok(n * 2))
    expect(await r.unwrap()).toBe(42)
  })
})
