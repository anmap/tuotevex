<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import ProductCard from '@/components/ProductCard.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'
import { fetchProducts } from '@/services/productApi';

// Fetch all products when no search query
const { data: allProductsData, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Products ({{ allProductsData?.products.length || 0 }})</h1>
    <div class="space-y-4">
      <template v-if="isLoading">
        <ProductCardSkeleton v-for="n in 5" :key="n" />
      </template>
      <template v-else>
        <ProductCard v-for="product in allProductsData?.products" :key="product.id" :product="product" />
      </template>
    </div>
  </div>
</template>
