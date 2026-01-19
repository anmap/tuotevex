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
})
