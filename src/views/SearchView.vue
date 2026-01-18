<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { SearchX, Home } from 'lucide-vue-next'
import ProductCard from '@/components/ProductCard.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'
import BaseButton from '@/components/BaseButton.vue'
import { searchProducts } from '@/services/productApi'

const route = useRoute()
const searchQuery = computed(() => route.query.q as string || '')

// Fetch search results
const { data: searchData, isLoading, error } = useQuery({
  queryKey: computed(() => ['search', searchQuery.value]),
  queryFn: () => searchProducts(searchQuery.value),
  enabled: computed(() => searchQuery.value.length > 0),
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="!isLoading && !error && searchQuery && searchData?.products.length === 0"
      class="flex min-h-[60vh] flex-col items-center justify-center py-16 px-4">
      <div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
        <SearchX class="h-12 w-12 text-slate-400" />
      </div>
      <h2 class="mb-4 text-2xl font-bold text-slate-900">
        No results found for <span class="text-slate-700">"{{ searchQuery }}"</span>
      </h2>
      <p class="mb-8 text-slate-600">
        Try checking your spelling or use more general keywords.
      </p>
      <RouterLink to="/" class="inline-flex">
        <BaseButton>
          <Home class="h-5 w-5" aria-hidden="true" />
          Go to Homepage
        </BaseButton>
      </RouterLink>
    </div>
    <template v-else>
      <h1 class="mb-6 text-3xl font-bold">
        Search Results for <span class="text-primary">"{{ searchQuery }}"</span>
      </h1>

      <div v-if="isLoading" class="space-y-4">
        <ProductCardSkeleton v-for="n in 5" :key="n" />
      </div>

      <div v-else class="space-y-4">
        <ProductCard v-for="product in searchData?.products" :key="product.id" :product="product" />
      </div>
    </template>
  </div>
</template>
