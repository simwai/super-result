import { describe, expect, it } from 'vitest'
import { createResult, from, fromUnknown } from './index.js'

describe('super-result API', () => {
  describe('from', () => {
    it('handles sync success', () => {
      const res = from(() => 123)
      expect(res).toEqual({ ok: true, value: 123 })
    })

    it('handles sync throw', () => {
      const error = new Error('boom')
      const res = from(() => {
        throw error
      })
      expect(res).toEqual({ ok: false, error: error })
    })

    it('handles async success', async () => {
      const res = await from(async () => 123)
      expect(res).toEqual({ ok: true, value: 123 })
    })

    it('handles async failure', async () => {
      const error = new Error('boom')
      const res = await from(async () => {
        throw error
      })
      expect(res).toEqual({ ok: false, error: error })
    })

    it('handles promise success', async () => {
      const res = await from(Promise.resolve(123))
      expect(res).toEqual({ ok: true, value: 123 })
    })

    it('handles promise failure', async () => {
      const error = new Error('boom')
      const res = await from(Promise.reject(error))
      expect(res).toEqual({ ok: false, error: error })
    })
  })

  describe('fromUnknown', () => {
    it('preserves non-Error throws', () => {
      const res = fromUnknown(() => {
        throw 'wat'
      })
      expect(res).toEqual({ ok: false, error: 'wat' })
    })
  })

  describe('createResult', () => {
    it('uses custom mapper', () => {
      const R = createResult((e: unknown) => `mapped: ${e}`)
      const res = R.from(() => {
        throw 'err'
      })
      expect(res).toEqual({ ok: false, error: 'mapped: err' })
    })
  })
})
