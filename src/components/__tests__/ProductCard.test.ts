import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
import fallbackImage from '@/assets/logo.svg'
import type { Review } from '@/types/product'

const createMockReviews = (count: number): Review[] => {
  return Array.from({ length: count }, (_, i) => ({
    rating: 4.5,
    comment: `Review ${i + 1}`,
    date: '2024-01-01',
    reviewerName: `Reviewer ${i + 1}`,
    reviewerEmail: `reviewer${i + 1}@example.com`,
  }))
}

const mockProduct = {
  id: '1',
  title: 'Ultra Volume Intense Mascara',
  brand: 'Beauty Brand',
  sku: 'BEA-001-UVIM',
  price: 12.50,
  rating: 4.5,
  reviews: createMockReviews(856),
  description: 'Instant lash lift and ultra volume with a deep black finish.',
  images: ['/path/to/image.jpg'],
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

  it('displays SKU under product title', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    expect(wrapper.text()).toContain('BEA-001-UVIM')
    // Verify SKU appears after title
    const text = wrapper.text()
    const titleIndex = text.indexOf('Ultra Volume Intense Mascara')
    const skuIndex = text.indexOf('BEA-001-UVIM')
    expect(skuIndex).toBeGreaterThan(titleIndex)
  })

  it('displays SKU with proper accessibility attributes', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    const skuElement = wrapper.find('[aria-label*="SKU"]')
    expect(skuElement.exists()).toBe(true)
    expect(skuElement.text()).toContain('BEA-001-UVIM')
  })

  it('displays brand when provided', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    })
    expect(wrapper.text()).toContain('Beauty Brand')
    const brandElement = wrapper.find('[aria-label*="Brand"]')
    expect(brandElement.exists()).toBe(true)
    expect(brandElement.text()).toBe('Beauty Brand')
  })

  it('displays "No brand" when brand is not provided', () => {
    const productWithoutBrand = {
      ...mockProduct,
      brand: undefined,
    }
    const wrapper = mount(ProductCard, {
      props: { product: productWithoutBrand },
    })
    expect(wrapper.text()).toContain('No brand')
    const brandElement = wrapper.find('[aria-label="No brand"]')
    expect(brandElement.exists()).toBe(true)
    expect(brandElement.text()).toBe('No brand')
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
      images: [],
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
