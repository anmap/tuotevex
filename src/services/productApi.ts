import type { Product } from '@/types/product'

const API_BASE_URL = 'https://dummyjson.com/products'

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// Fetch all products
export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${API_BASE_URL}?select=id,title,brand,sku,price,rating,reviews,description,images,stock&limit=30`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}
