<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'

const product = {
  id: '1',
  title: 'Product 1',
  price: 100,
  image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp',
  description: 'Product 1 description',
  category: 'Category 1',
  rating: 4.5,
  reviews: 1,
}

const product2 = {
  id: '2',
  title: 'Product 2',
  price: 200,
  description: 'Product 2 description',
  category: 'Category 2',
  rating: 4.5,
  reviews: 4,
};
</script>

<template>
  <div>
    <ProductCard :product="product" />
    <ProductCard :product="product2" />
    <ProductCard :product="product" />
    <ProductCard :product="product2" />
    <ProductCard :product="product" />
    <ProductCard :product="product2" />
    <ProductCard :product="product" />
    <ProductCard :product="product2" />
  </div>
</template>
