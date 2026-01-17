<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import ProductCard from '@/components/ProductCard.vue'
import { fetchProducts } from '@/services/productApi';

// Fetch all products when no search query
const { data: allProductsData, isLoading: isLoadingAllProducts, error: allProductsError } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Products ({{ allProductsData?.products.length }})</h1>
    <div class="space-y-4">
      <ProductCard v-for="product in allProductsData?.products" :key="product.id" :product="product" />
    </div>
  </div>
</template>
