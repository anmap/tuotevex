import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
import fallbackImage from '@/assets/logo.svg'

const mockProduct = {
  id: '1',
  title: 'Ultra Volume Intense Mascara',
  category: 'BEAUTY',
  price: 12.50,
  rating: 4.5,
  reviews: 856,
  description: 'Instant lash lift and ultra volume with a deep black finish.',
  image: '/path/to/image.jpg',
}

describe('ProductCard', () => {
  it('renders', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays product name', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    expect(wrapper.text()).toContain('Ultra Volume Intense Mascara')
  })

  it('displays category', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    expect(wrapper.text()).toContain('BEAUTY')
  })

  it('displays price', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    expect(wrapper.text()).toContain('12,50')
  })

  it('displays rating and review count', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    expect(wrapper.text()).toContain('856')
  })

  it('displays product description', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    expect(wrapper.text()).toContain('Instant lash lift')
  })

  it('uses fallback image when product image is not available', () => {
    const productWithoutImage = {
      ...mockProduct,
      image: '',
    }
    const wrapper = mount(ProductCard, {
      props: { product: productWithoutImage },
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(fallbackImage)
  })

  it('uses fallback image when product image fails to load', async () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    const img = wrapper.find('img')

    // Simulate image load error
    await img.trigger('error')

    expect(img.attributes('src')).toBe(fallbackImage)
  })
})
