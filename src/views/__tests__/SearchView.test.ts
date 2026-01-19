import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed } from 'vue'
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
  useInfiniteQuery: vi.fn(),
}))

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  useIntersectionObserver: vi.fn(),
}))

import { useRoute } from 'vue-router'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { useIntersectionObserver } from '@vueuse/core'

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

const createMockProductsResponse = (
  products: Product[],
  options: { total?: number; skip?: number; limit?: number } = {},
): ProductsResponse => ({
  products,
  total: options.total ?? products.length,
  skip: options.skip ?? 0,
  limit: options.limit ?? 10,
})

// Helper to create paginated data structure for useInfiniteQuery
const createMockInfiniteData = (pages: ProductsResponse[]) => ({
  pages,
  pageParams: pages.map((_, i) => i * 10),
})

describe('SearchView', () => {
  const mockUseRoute = vi.mocked(useRoute)
  const mockUseInfiniteQuery = vi.mocked(useInfiniteQuery)
  const mockUseIntersectionObserver = vi.mocked(useIntersectionObserver)

  // Store the intersection observer callback for manual triggering in tests
  let intersectionCallback: (entries: IntersectionObserverEntry[]) => void

  beforeEach(() => {
    vi.clearAllMocks()

    // Capture the intersection observer callback
    mockUseIntersectionObserver.mockImplementation((_, callback) => {
      intersectionCallback = (entries) => callback(entries, {} as IntersectionObserver)
      return { stop: vi.fn(), isSupported: computed(() => true), isActive: ref(true), pause: vi.fn(), resume: vi.fn() }
    })
  })

  const createWrapper = () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div />' } },
        { path: '/search', component: SearchView },
      ],
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

  const mockInfiniteQuery = (options: {
    pages?: ProductsResponse[]
    isLoading?: boolean
    error?: Error | null
    hasNextPage?: boolean
    isFetchingNextPage?: boolean
    fetchNextPage?: ReturnType<typeof vi.fn>
  }) => {
    const {
      pages = [],
      isLoading = false,
      error = null,
      hasNextPage = false,
      isFetchingNextPage = false,
      fetchNextPage = vi.fn(),
    } = options

    mockUseInfiniteQuery.mockReturnValue({
      data: ref(pages.length > 0 ? createMockInfiniteData(pages) : undefined),
      isLoading: ref(isLoading),
      error: ref(error),
      hasNextPage: ref(hasNextPage),
      isFetchingNextPage: ref(isFetchingNextPage),
      fetchNextPage,
    } as unknown as ReturnType<typeof useInfiniteQuery>)
  }

  it('displays search query in heading when query is provided', () => {
    const searchQuery = 'test search'
    const products = [createMockProduct({ id: '1', title: 'Test Product' })]

    mockUseRoute.mockReturnValue({
      query: { q: searchQuery },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockInfiniteQuery({
      pages: [createMockProductsResponse(products, { total: 1 })],
    })

    const wrapper = createWrapper()
    expect(wrapper.text()).toContain(`Search Results for "${searchQuery}"`)
  })

  it('displays loading skeletons when search is in progress', () => {
    mockUseRoute.mockReturnValue({
      query: { q: 'test' },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockInfiniteQuery({ isLoading: true })

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

    mockInfiniteQuery({
      pages: [createMockProductsResponse(products, { total: 2 })],
    })

    const wrapper = createWrapper()
    const productCards = wrapper.findAllComponents({ name: 'ProductCard' })
    expect(productCards.length).toBe(2)
  })

  it('displays "No results found" message with homepage link when search returns empty results', () => {
    const searchQuery = 'nonexistent'
    mockUseRoute.mockReturnValue({
      query: { q: searchQuery },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockInfiniteQuery({
      pages: [createMockProductsResponse([], { total: 0 })],
    })

    const wrapper = createWrapper()
    expect(wrapper.text()).toContain(`No results found for "${searchQuery}"`)
    expect(wrapper.text()).toContain('Try checking your spelling or use more general keywords.')
    const homeLink = wrapper.findComponent({ name: 'RouterLink' })
    expect(homeLink.exists()).toBe(true)
    expect(homeLink.attributes('to')).toBe('/')
  })

  // ==================== Infinite Scrolling Tests ====================

  it('displays total results count from first page', () => {
    const products = [createMockProduct({ id: '1' })]

    mockUseRoute.mockReturnValue({
      query: { q: 'phone' },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockInfiniteQuery({
      pages: [createMockProductsResponse(products, { total: 25 })],
      hasNextPage: true,
    })

    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('(25 products)')
  })

  it('flattens products from multiple pages', () => {
    const page1Products = [
      createMockProduct({ id: '1' }),
      createMockProduct({ id: '2' }),
    ]
    const page2Products = [
      createMockProduct({ id: '3' }),
      createMockProduct({ id: '4' }),
    ]

    mockUseRoute.mockReturnValue({
      query: { q: 'test' },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockInfiniteQuery({
      pages: [
        createMockProductsResponse(page1Products, { total: 4, skip: 0 }),
        createMockProductsResponse(page2Products, { total: 4, skip: 2 }),
      ],
    })

    const wrapper = createWrapper()
    const productCards = wrapper.findAllComponents({ name: 'ProductCard' })
    expect(productCards.length).toBe(4)
  })

  it('shows loading spinner when fetching next page', () => {
    const products = [createMockProduct({ id: '1' })]

    mockUseRoute.mockReturnValue({
      query: { q: 'test' },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockInfiniteQuery({
      pages: [createMockProductsResponse(products, { total: 20 })],
      hasNextPage: true,
      isFetchingNextPage: true,
    })

    const wrapper = createWrapper()
    const loader = wrapper.find('.animate-spin')
    expect(loader.exists()).toBe(true)
  })

  it('shows "No more results" message when all pages are loaded', () => {
    const products = [createMockProduct({ id: '1' })]

    mockUseRoute.mockReturnValue({
      query: { q: 'test' },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockInfiniteQuery({
      pages: [createMockProductsResponse(products, { total: 1 })],
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('No more results')
  })

  it('calls fetchNextPage when sentinel is intersecting and has more pages', () => {
    const fetchNextPage = vi.fn()
    const products = [createMockProduct({ id: '1' })]

    mockUseRoute.mockReturnValue({
      query: { q: 'test' },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockInfiniteQuery({
      pages: [createMockProductsResponse(products, { total: 20 })],
      hasNextPage: true,
      isFetchingNextPage: false,
      fetchNextPage,
    })

    createWrapper()

    // Simulate intersection observer triggering
    intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry])

    expect(fetchNextPage).toHaveBeenCalledTimes(1)
  })

  it('does not call fetchNextPage when already fetching next page', () => {
    const fetchNextPage = vi.fn()
    const products = [createMockProduct({ id: '1' })]

    mockUseRoute.mockReturnValue({
      query: { q: 'test' },
    } as Partial<RouteLocationNormalized> as RouteLocationNormalized)

    mockInfiniteQuery({
      pages: [createMockProductsResponse(products, { total: 20 })],
      hasNextPage: true,
      isFetchingNextPage: true,
      fetchNextPage,
    })

    createWrapper()

    intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry])

    expect(fetchNextPage).not.toHaveBeenCalled()
  })
})
