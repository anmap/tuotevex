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
  stock: 100,
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

  describe('stock display', () => {
    it('displays "Out of stock" with red color when stock is 0', () => {
      const product = { ...mockProduct, stock: 0 }
      const wrapper = mount(ProductCard, {
        props: { product },
      })
      expect(wrapper.text()).toContain('Out of stock')
      const stockElement = wrapper.find('[class*="text-red"]')
      expect(stockElement.exists()).toBe(true)
    })

    it('displays "Only X in stock" with orange color when stock is between 1 and 9', () => {
      const product = { ...mockProduct, stock: 5 }
      const wrapper = mount(ProductCard, {
        props: { product },
      })
      expect(wrapper.text()).toContain('Only 5 in stock')
      const stockElement = wrapper.find('[class*="text-orange"]')
      expect(stockElement.exists()).toBe(true)
    })

    it('displays "+10 in stock" with primary color when stock is 10', () => {
      const product = { ...mockProduct, stock: 10 }
      const wrapper = mount(ProductCard, {
        props: { product },
      })
      expect(wrapper.text()).toContain('+10 in stock')
      const stockElement = wrapper.find('[class*="text-primary"]')
      expect(stockElement.exists()).toBe(true)
    })

    it('displays "+25 in stock" with primary color when stock is 25', () => {
      const product = { ...mockProduct, stock: 25 }
      const wrapper = mount(ProductCard, {
        props: { product },
      })
      expect(wrapper.text()).toContain('+25 in stock')
      const stockElement = wrapper.find('[class*="text-primary"]')
      expect(stockElement.exists()).toBe(true)
    })

    it('displays "+50 in stock" with primary color when stock is 50', () => {
      const product = { ...mockProduct, stock: 50 }
      const wrapper = mount(ProductCard, {
        props: { product },
      })
      expect(wrapper.text()).toContain('+50 in stock')
      const stockElement = wrapper.find('[class*="text-primary"]')
      expect(stockElement.exists()).toBe(true)
    })

    it('displays "+100 in stock" with primary color when stock is 100', () => {
      const product = { ...mockProduct, stock: 100 }
      const wrapper = mount(ProductCard, {
        props: { product },
      })
      expect(wrapper.text()).toContain('+100 in stock')
      const stockElement = wrapper.find('[class*="text-primary"]')
      expect(stockElement.exists()).toBe(true)
    })

    it('displays "+100 in stock" with primary color when stock exceeds 100', () => {
      const product = { ...mockProduct, stock: 150 }
      const wrapper = mount(ProductCard, {
        props: { product },
      })
      expect(wrapper.text()).toContain('+100 in stock')
      const stockElement = wrapper.find('[class*="text-primary"]')
      expect(stockElement.exists()).toBe(true)
    })
  })
})
