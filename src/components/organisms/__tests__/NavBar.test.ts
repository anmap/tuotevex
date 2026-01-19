import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Ref } from 'vue'
import NavBar from '../NavBar.vue'

// Mock vue-router
const mockPush = vi.fn()
const mockRoute: { path: string; query: { q?: string } } = { path: '/', query: {} }

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => mockRoute,
  RouterLink: {
    name: 'RouterLink',
    template: '<a :href="to.path || to"><slot /></a>',
    props: ['to'],
  },
}))

// Mock @vueuse/core - capture the callback for testing
let watchDebouncedCallback: ((value: string) => void) | null = null

vi.mock('@vueuse/core', () => ({
  watchDebounced: (source: Ref<string>, callback: (value: string) => void) => {
    watchDebouncedCallback = callback
  },
}))

describe('NavBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRoute.path = '/'
    mockRoute.query = {}
    watchDebouncedCallback = null
  })

  describe('rendering and accessibility', () => {
    it('renders accessible navigation with logo and home link', () => {
      const wrapper = mount(NavBar)

      // Semantic navigation with aria-label
      const nav = wrapper.find('nav')
      expect(nav.exists()).toBe(true)
      expect(nav.attributes('aria-label')).toBe('Main navigation')

      // Logo with alt text for accessibility
      expect(wrapper.find('img[alt="TuoteVex logo"]').exists()).toBe(true)

      // Home link points to root
      const homeLink = wrapper.find('a')
      expect(homeLink.attributes('href')).toBe('/')
    })

    it('renders SearchBar component', () => {
      const wrapper = mount(NavBar)
      expect(wrapper.findComponent({ name: 'SearchBar' }).exists()).toBe(true)
    })
  })

  describe('search to route synchronization', () => {
    it('navigates to /search with query when search value is non-empty', () => {
      mount(NavBar)
      watchDebouncedCallback?.('test query')

      expect(mockPush).toHaveBeenCalledWith({
        path: '/search',
        query: { q: 'test query' },
      })
    })

    it('trims whitespace from search value before navigating', () => {
      mount(NavBar)
      watchDebouncedCallback?.('  hello world  ')

      expect(mockPush).toHaveBeenCalledWith({
        path: '/search',
        query: { q: 'hello world' },
      })
    })

    it('navigates to home when search is cleared while on /search', () => {
      mockRoute.path = '/search'
      mount(NavBar)
      watchDebouncedCallback?.('')

      expect(mockPush).toHaveBeenCalledWith({ path: '/' })
    })

    it('navigates to home when search is only whitespace while on /search', () => {
      mockRoute.path = '/search'
      mount(NavBar)
      watchDebouncedCallback?.('   ')

      expect(mockPush).toHaveBeenCalledWith({ path: '/' })
    })

    it('does not navigate when search is empty and not on /search', () => {
      mockRoute.path = '/'
      mount(NavBar)
      watchDebouncedCallback?.('')

      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('route to search synchronization', () => {
    it('initializes search value from route query param', () => {
      mockRoute.query = { q: 'initial query' }
      const wrapper = mount(NavBar)
      const searchBar = wrapper.findComponent({ name: 'SearchBar' })

      expect(searchBar.props('modelValue')).toBe('initial query')
    })
  })
})
