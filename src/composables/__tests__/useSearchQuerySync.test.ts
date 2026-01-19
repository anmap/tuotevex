import { describe, it, expect, vi, beforeEach } from 'vitest'
import { reactive, nextTick } from 'vue'
import type { Ref } from 'vue'
import { useSearchQuerySync } from '../useSearchQuerySync'

const mockPush = vi.fn()
let mockRoute = reactive<{ path: string; query: { q?: string } }>({ path: '/', query: {} })
let watchDebouncedCallback: ((value: string) => void) | null = null

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => mockRoute,
}))

vi.mock('@vueuse/core', () => ({
  watchDebounced: (source: Ref<string>, callback: (value: string) => void) => {
    watchDebouncedCallback = callback
  },
}))

describe('useSearchQuerySync', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRoute = reactive({ path: '/', query: {} })
    watchDebouncedCallback = null
  })

  it('initializes search value from route query param', () => {
    mockRoute = reactive({ path: '/', query: { q: 'initial query' } })
    const { searchQuery } = useSearchQuerySync()

    expect(searchQuery.value).toBe('initial query')
  })

  it('navigates to /search with query when search value is non-empty', () => {
    useSearchQuerySync()
    watchDebouncedCallback?.('test query')

    expect(mockPush).toHaveBeenCalledWith({
      path: '/search',
      query: { q: 'test query' },
    })
  })

  it('trims whitespace from search value before navigating', () => {
    useSearchQuerySync()
    watchDebouncedCallback?.('  hello world  ')

    expect(mockPush).toHaveBeenCalledWith({
      path: '/search',
      query: { q: 'hello world' },
    })
  })

  it('navigates to home when search is cleared while on /search', () => {
    mockRoute.path = '/search'
    useSearchQuerySync()
    watchDebouncedCallback?.('')

    expect(mockPush).toHaveBeenCalledWith({ path: '/' })
  })

  it('navigates to home when search is only whitespace while on /search', () => {
    mockRoute.path = '/search'
    useSearchQuerySync()
    watchDebouncedCallback?.('   ')

    expect(mockPush).toHaveBeenCalledWith({ path: '/' })
  })

  it('does not navigate when search is empty and not on /search', () => {
    mockRoute.path = '/'
    useSearchQuerySync()
    watchDebouncedCallback?.('')

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('updates search value when route query changes', async () => {
    mockRoute = reactive({ path: '/', query: { q: 'initial' } })
    const { searchQuery } = useSearchQuerySync()

    mockRoute.query.q = 'next'
    await nextTick()

    expect(searchQuery.value).toBe('next')
  })
})
