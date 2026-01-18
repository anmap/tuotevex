import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, type Ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import SearchView from '../SearchView.vue'
import type { Product, Review } from '@/types/product'
import type { ProductsResponse } from '@/services/productApi'

// Mock vue-router
vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRoute: vi.fn(),
  }
})

// Mock @tanstack/vue-query
vi.mock('@tanstack/vue-query', () => ({
  useQuery: vi.fn(),
}))

import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'

const createMockReviews = (count: number): Review[] => {
  return Array.from({ length: count }, (_, i) => ({
    rating: 4.5,
    comment: `Review ${i + 1}`,
    date: '2024-01-01',
    reviewerName: `Reviewer ${i + 1}`,
    reviewerEmail: `reviewer${i + 1}@example.com`,
  }))
}

const createMockProduct = (overrides?: Partial<Product>): Product => ({
  id: '1',
  title: 'Test Product',
  brand: 'Test Brand',
  sku: 'TEST-001',
  price: 29.99,
  rating: 4.5,
  reviews: createMockReviews(10),
  description: 'Test product description',
  images: ['/test-image.jpg'],
  stock: 100,
  ...overrides,
})

const createMockProductsResponse = (products: Product[]) => ({
  products,
  total: products.length,
  skip: 0,
  limit: 30,
})

describe('SearchView', () => {
  const mockUseRoute = vi.mocked(useRoute)
  const mockUseQuery = vi.mocked(useQuery)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createWrapper = () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/search', component: SearchView }],
    })

    return mount(SearchView, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: true,
          ProductCard: true,
          ProductCardSkeleton: true,
        },
      },
    })
  }

  it('displays search query in heading when query is provided', () => {
    const searchQuery = 'test search'
    const products = [createMockProduct({ id: '1', title: 'Test Product' })]
    mockUseRoute.mockReturnValue({
      query: { q: searchQuery },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockUseQuery.mockReturnValue({
      data: ref(createMockProductsResponse(products)) as Ref<ProductsResponse | undefined>,
      isLoading: ref(false) as Ref<boolean>,
      error: ref(null) as Ref<Error | null>,
    } as ReturnType<typeof useQuery>)

    const wrapper = createWrapper()
    expect(wrapper.text()).toContain(`Search Results for "${searchQuery}"`)
  })

  it('displays loading skeletons when search is in progress', () => {
    mockUseRoute.mockReturnValue({
      query: { q: 'test' },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockUseQuery.mockReturnValue({
      data: ref(undefined) as Ref<ProductsResponse | undefined>,
      isLoading: ref(true) as Ref<boolean>,
      error: ref(null) as Ref<Error | null>,
    } as ReturnType<typeof useQuery>)

    const wrapper = createWrapper()
    const skeletons = wrapper.findAllComponents({ name: 'ProductCardSkeleton' })
    expect(skeletons.length).toBe(5)
  })

  it('displays product cards when search returns results', () => {
    const products = [
      createMockProduct({ id: '1', title: 'Product 1' }),
      createMockProduct({ id: '2', title: 'Product 2' }),
    ]

    mockUseRoute.mockReturnValue({
      query: { q: 'test' },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockUseQuery.mockReturnValue({
      data: ref(createMockProductsResponse(products)) as Ref<ProductsResponse | undefined>,
      isLoading: ref(false) as Ref<boolean>,
      error: ref(null) as Ref<Error | null>,
    } as ReturnType<typeof useQuery>)

    const wrapper = createWrapper()
    const productCards = wrapper.findAllComponents({ name: 'ProductCard' })
    expect(productCards.length).toBe(2)
  })

  it('displays "No results found" message with homepage link when search returns empty results', () => {
    const searchQuery = 'nonexistent'
    mockUseRoute.mockReturnValue({
      query: { q: searchQuery },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockUseQuery.mockReturnValue({
      data: ref(createMockProductsResponse([])) as Ref<ProductsResponse | undefined>,
      isLoading: ref(false) as Ref<boolean>,
      error: ref(null) as Ref<Error | null>,
    } as ReturnType<typeof useQuery>)

    const wrapper = createWrapper()
    expect(wrapper.text()).toContain(`No results found for "${searchQuery}"`)
    expect(wrapper.text()).toContain('Try checking your spelling or use more general keywords.')
    const homeLink = wrapper.findComponent({ name: 'RouterLink' })
    expect(homeLink.exists()).toBe(true)
    expect(homeLink.attributes('to')).toBe('/')
  })
})
