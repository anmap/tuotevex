import { describe, it, expect } from 'vitest'
import { formatPrice, renderStars, normalizeQueryValue } from '@/utils'

describe('utils', () => {
  describe('formatPrice', () => {
    it('formats price as EUR in Finnish locale', () => {
      const formatted = formatPrice(100)
      expect(formatted).toContain('100')
      expect(formatted).toContain(',')
      expect(formatted).toContain('€')
    })
  })

  describe('renderStars', () => {
    it('returns correct star counts for integer rating', () => {
      expect(renderStars(3)).toEqual({
        fullStars: 3,
        hasHalfStar: false,
        emptyStars: 2,
      })
    })

    it('returns correct star counts for half rating', () => {
      expect(renderStars(4.5)).toEqual({
        fullStars: 4,
        hasHalfStar: true,
        emptyStars: 0,
      })
    })
  })

  describe('normalizeQueryValue', () => {
    it('returns string values unchanged', () => {
      expect(normalizeQueryValue('query')).toBe('query')
    })

    it('returns first value for arrays', () => {
      expect(normalizeQueryValue(['first', 'second'])).toBe('first')
    })

    it('returns empty string for non-string values', () => {
      expect(normalizeQueryValue(123)).toBe('')
      expect(normalizeQueryValue(undefined)).toBe('')
      expect(normalizeQueryValue(null)).toBe('')
    })
  })
})
