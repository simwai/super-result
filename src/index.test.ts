import { describe, expect, it } from 'vitest'
import { createResult, err, from, fromUnknown, ok } from './index.js'

describe('super-result API', () => {
  it('ok constructor', () => {
    const res = ok(42)
    expect(res).toEqual({ ok: true, value: 42 })
  })

  it('err constructor', () => {
    const res = err('fail')
    expect(res).toEqual({ ok: false, error: 'fail' })
  })

  describe('from', () => {
    it('handles sync success', () => {
      const res = from(() => 123)
      expect(res).toEqual(ok(123))
    })

    it('handles sync throw', () => {
      const error = new Error('boom')
      const res = from(() => {
        throw error
      })
      expect(res).toEqual(err(error))
    })

    it('handles async success', async () => {
      const res = await from(async () => 123)
      expect(res).toEqual(ok(123))
    })

    it('handles async failure', async () => {
      const error = new Error('boom')
      const res = await from(async () => {
        throw error
      })
      expect(res).toEqual(err(error))
    })

    it('handles promise success', async () => {
      const res = await from(Promise.resolve(123))
      expect(res).toEqual(ok(123))
    })

    it('handles promise failure', async () => {
      const error = new Error('boom')
      const res = await from(Promise.reject(error))
      expect(res).toEqual(err(error))
    })
  })

  describe('fromUnknown', () => {
    it('preserves non-Error throws', () => {
      const res = fromUnknown(() => {
        throw 'wat'
      })
      expect(res).toEqual(err('wat'))
    })
  })

  describe('createResult', () => {
    it('uses custom mapper', () => {
      const R = createResult((e: unknown) => `mapped: ${e}`)
      const res = R.from(() => {
        throw 'err'
      })
      expect(res).toEqual(err('mapped: err'))
    })
  })
})
