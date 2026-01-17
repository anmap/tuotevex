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
  image?: string
  stock: number
}
