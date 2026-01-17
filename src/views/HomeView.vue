<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import { testProducts } from '@/data/testProducts'

</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Products ({{ testProducts.length }})</h1>
    <div class="space-y-4">
      <ProductCard v-for="product in testProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>
