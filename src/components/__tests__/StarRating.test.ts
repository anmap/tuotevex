import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StarRating from '@/components/StarRating.vue'

describe('StarRating', () => {
  it('renders', () => {
    const wrapper = mount(StarRating, { props: { rating: 4.5 } })
    expect(wrapper.exists()).toBe(true)
  })

  describe('full star ratings', () => {
    it('displays 5 full stars for rating 5.0', () => {
      const wrapper = mount(StarRating, { props: { rating: 5.0 } })
      expect(wrapper.findAll('[class*="fill-yellow-400"]').length).toBe(5)
      expect(wrapper.findAll('[class*="text-gray-300"]').length).toBe(0)
    })

    it('displays 4 full stars and 1 empty for rating 4.0', () => {
      const wrapper = mount(StarRating, { props: { rating: 4.0 } })
      expect(wrapper.findAll('[class*="fill-yellow-400"]').length).toBe(4)
      expect(wrapper.findAll('[class*="text-gray-300"]').length).toBe(1)
    })

    it('displays 0 full stars and 5 empty for rating 0.0', () => {
      const wrapper = mount(StarRating, { props: { rating: 0.0 } })
      expect(wrapper.findAll('[class*="fill-yellow-400"]').length).toBe(0)
      expect(wrapper.findAll('[class*="text-gray-300"]').length).toBe(5)
    })
  })

  describe('half star ratings', () => {
    it('displays 4 full stars, 1 half star for rating 4.5', () => {
      const wrapper = mount(StarRating, { props: { rating: 4.5 } })
      const allFilled = wrapper.findAll('[class*="fill-yellow-400"]')
      const fullStars = allFilled.filter(
        (star) => !star.element.parentElement?.classList.contains('relative')
      )
      expect(fullStars.length).toBe(4)
      expect(wrapper.findAll('.relative').length).toBe(1)
    })

    it('displays 2 full stars, 1 half star, 2 empty for rating 2.5', () => {
      const wrapper = mount(StarRating, { props: { rating: 2.5 } })
      const allFilled = wrapper.findAll('[class*="fill-yellow-400"]')
      const fullStars = allFilled.filter(
        (star) => !star.element.parentElement?.classList.contains('relative')
      )
      expect(fullStars.length).toBe(2)
      expect(wrapper.findAll('.relative').length).toBe(1)
      expect(wrapper.findAll('[class*="text-gray-300"]').length).toBe(3)
    })

    it('displays 3 full stars, 1 half star, 1 empty for rating 3.7', () => {
      const wrapper = mount(StarRating, { props: { rating: 3.7 } })
      const allFilled = wrapper.findAll('[class*="fill-yellow-400"]')
      const fullStars = allFilled.filter(
        (star) => !star.element.parentElement?.classList.contains('relative')
      )
      expect(fullStars.length).toBe(3)
      expect(wrapper.findAll('.relative').length).toBe(1)
      expect(wrapper.findAll('[class*="text-gray-300"]').length).toBe(2)
    })
  })
})
