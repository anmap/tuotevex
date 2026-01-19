import type { Product } from '@/types/product'

export const API_BASE_URL = 'https://dummyjson.com/products'
export const DEFAULT_LIMIT = 15
export const DEFAULT_SELECT = 'id,title,brand,sku,price,rating,reviews,description,images,stock,shippingInformation'

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// Search products
export const searchProducts = async ({
  query,
  skip = 0,
}: {
  query: string,
  skip?: number,
}
): Promise<ProductsResponse> => {
  const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}&select=${DEFAULT_SELECT}&limit=${DEFAULT_LIMIT}&skip=${skip}`)
  if (!response.ok) {
    throw new Error('Failed to search products')
  }
  return response.json()
}
