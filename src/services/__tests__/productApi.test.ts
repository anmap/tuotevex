import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { API_BASE_URL, DEFAULT_LIMIT, DEFAULT_SELECT, searchProducts } from '../productApi'

describe('searchProducts', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('calls the search endpoint with default params', async () => {
    const responseBody = { products: [], total: 0, skip: 0, limit: DEFAULT_LIMIT }
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>

    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(responseBody),
    })

    await expect(searchProducts({ query: 'hello world' })).resolves.toEqual(responseBody)

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/search?q=hello%20world&select=${DEFAULT_SELECT}&limit=${DEFAULT_LIMIT}&skip=0`,
      { signal: undefined },
    )
  })

  it('passes through the provided skip param', async () => {
    const responseBody = { products: [], total: 0, skip: 30, limit: DEFAULT_LIMIT }
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>

    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(responseBody),
    })

    await searchProducts({ query: 'shoes', skip: 30 })

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/search?q=shoes&select=${DEFAULT_SELECT}&limit=${DEFAULT_LIMIT}&skip=30`,
      { signal: undefined },
    )
  })

  it('throws when the API responds with an error', async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>

    fetchMock.mockResolvedValue({
      ok: false,
      json: vi.fn(),
    })

    await expect(searchProducts({ query: 'anything' })).rejects.toThrow(
      'Failed to search products',
    )
  })

  it('passes the abort signal to fetch', async () => {
    const responseBody = { products: [], total: 0, skip: 0, limit: DEFAULT_LIMIT }
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>
    const controller = new AbortController()

    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(responseBody),
    })

    await searchProducts({ query: 'test', signal: controller.signal })

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/search?q=test&select=${DEFAULT_SELECT}&limit=${DEFAULT_LIMIT}&skip=0`,
      { signal: controller.signal },
    )
  })

  it('aborts the request when signal is triggered', async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>
    const controller = new AbortController()

    // Mock fetch to respect the abort signal
    fetchMock.mockImplementation((_url, options?: { signal?: AbortSignal }) => {
      return new Promise((resolve, reject) => {
        options?.signal?.addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted.', 'AbortError'))
        })
      })
    })

    const request = searchProducts({ query: 'phone', signal: controller.signal })
    controller.abort()

    await expect(request).rejects.toThrow('The operation was aborted.')
  })

  it('cancels first request when second request is fired', async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>
    const responseBody = { products: [], total: 0, skip: 0, limit: DEFAULT_LIMIT }
    const controller1 = new AbortController()
    const controller2 = new AbortController()

    fetchMock.mockImplementation((_url, options?: { signal?: AbortSignal }) => {
      return new Promise((resolve, reject) => {
        options?.signal?.addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted.', 'AbortError'))
        })
        setTimeout(() => resolve({ ok: true, json: () => Promise.resolve(responseBody) }), 50)
      })
    })

    const firstRequest = searchProducts({ query: 'phone', signal: controller1.signal })
    controller1.abort() // Simulate TanStack Query aborting when query key changes
    const secondRequest = searchProducts({ query: 'phones', signal: controller2.signal })

    await expect(firstRequest).rejects.toThrow('The operation was aborted.')
    await expect(secondRequest).resolves.toEqual(responseBody)
  })
})
