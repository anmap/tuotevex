export interface Product {
  id: string
  title: string
  category?: string
  brand?: string
  sku?: string
  price: number
  rating: number
  reviews: number
  description: string
  images: string[]
  stock: number
}
