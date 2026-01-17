import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StarRating from '@/components/StarRating.vue'

describe('StarRating', () => {
  it('renders', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 4.5 },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays 5 full stars for rating 5.0', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 5.0 },
    })
    const fullStars = wrapper.findAll('[class*="fill-yellow-400"]')
    const emptyStars = wrapper.findAll('[class*="text-gray-300"]')
    expect(fullStars.length).toBe(5)
    expect(emptyStars.length).toBe(0)
  })

  it('displays 4 full stars and 1 empty star for rating 4.0', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 4.0 },
    })
    const fullStars = wrapper.findAll('[class*="fill-yellow-400"]')
    const emptyStars = wrapper.findAll('[class*="text-gray-300"]')
    expect(fullStars.length).toBe(4)
    expect(emptyStars.length).toBe(1)
  })

  it('displays 4 full stars, 1 half star, and 0 empty stars for rating 4.5', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 4.5 },
    })
    const fullStars = wrapper.findAll('[class*="fill-yellow-400"]').filter(
      (star) => !star.classes().includes('opacity-50')
    )
    const halfStars = wrapper.findAll('[class*="fill-yellow-400 opacity-50"]')
    const emptyStars = wrapper.findAll('[class*="text-gray-300"]')
    expect(fullStars.length).toBe(4)
    expect(halfStars.length).toBe(1)
    expect(emptyStars.length).toBe(0)
  })

  it('displays 2 full stars, 1 half star, and 2 empty stars for rating 2.5', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 2.5 },
    })
    const fullStars = wrapper.findAll('[class*="fill-yellow-400"]').filter(
      (star) => !star.classes().includes('opacity-50')
    )
    const halfStars = wrapper.findAll('[class*="fill-yellow-400 opacity-50"]')
    const emptyStars = wrapper.findAll('[class*="text-gray-300"]')
    expect(fullStars.length).toBe(2)
    expect(halfStars.length).toBe(1)
    expect(emptyStars.length).toBe(2)
  })

  it('displays 0 full stars and 5 empty stars for rating 0.0', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 0.0 },
    })
    const fullStars = wrapper.findAll('[class*="fill-yellow-400"]')
    const emptyStars = wrapper.findAll('[class*="text-gray-300"]')
    expect(fullStars.length).toBe(0)
    expect(emptyStars.length).toBe(5)
  })

  it('handles decimal ratings correctly', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 3.7 },
    })
    const fullStars = wrapper.findAll('[class*="fill-yellow-400"]').filter(
      (star) => !star.classes().includes('opacity-50')
    )
    const halfStars = wrapper.findAll('[class*="fill-yellow-400 opacity-50"]')
    const emptyStars = wrapper.findAll('[class*="text-gray-300"]')
    expect(fullStars.length).toBe(3)
    expect(halfStars.length).toBe(1)
    expect(emptyStars.length).toBe(1)
  })
})
