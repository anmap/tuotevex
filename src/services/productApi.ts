import type { Product } from '@/types/product'

const API_BASE_URL = 'https://dummyjson.com/products'
const DEFAULT_LIMIT = 30
const DEFAULT_SELECT = 'id,title,brand,sku,price,rating,reviews,description,images,stock'

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// Fetch all products
export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${API_BASE_URL}?select=${DEFAULT_SELECT}&limit=${DEFAULT_LIMIT}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

// Search products
export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}&select=${DEFAULT_SELECT}&limit=${DEFAULT_LIMIT}`)
  if (!response.ok) {
    throw new Error('Failed to search products')
  }
  return response.json()
}
