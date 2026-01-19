export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Product {
  id: string
  title: string
  category?: string
  brand?: string
  sku?: string
  price: number
  rating: number
  reviews: Review[]
  description: string
  images: string[]
  stock: number
  shippingInformation?: string
}
