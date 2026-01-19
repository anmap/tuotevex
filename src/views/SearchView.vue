<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { useIntersectionObserver } from '@vueuse/core'
import { SearchX, Home, LoaderCircle } from 'lucide-vue-next'
import ProductCard from '@/components/ProductCard.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'
import BaseButton from '@/components/BaseButton.vue'
import { searchProducts } from '@/services/productApi'

const route = useRoute()
const searchQuery = computed(() => route.query.q as string || '')

// Infinite query for search results
const {
  data: searchData,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: computed(() => ['search', searchQuery.value]),
  queryFn: ({ pageParam }) => searchProducts({ query: searchQuery.value, skip: pageParam }),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => {
    const nextSkip = lastPage.skip + lastPage.limit
    return nextSkip < lastPage.total ? nextSkip : undefined
  },
  enabled: computed(() => searchQuery.value.length > 0),
})

// Infinte query returns an array of pages,
// so we need to flatten the products from all pages
const allProducts = computed(() => searchData.value?.pages.flatMap((page) => page.products) ?? [])

// Total results is the total number of products across all pages
const totalResults = computed(() => searchData.value?.pages[0]?.total ?? 0)

// Scroll to top when search query changes
watch(searchQuery, () => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})

// Sentinel element for infinite scroll detection
const sentinelRef = ref<HTMLElement | null>(null)

// Load more when sentinel becomes visible
useIntersectionObserver(
  sentinelRef,
  ([entry]) => {
    if (entry?.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
      fetchNextPage()
    }
  },
  { rootMargin: '200px' },
)
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <!-- No result -->
    <div v-if="!isLoading && !error && searchQuery && allProducts.length === 0"
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
    <!-- Results -->
    <template v-else>
      <h1 class="mb-12 text-3xl font-bold">
        Search Results for <span class="text-primary">"{{ searchQuery }}"</span>&nbsp;
        <span v-if="totalResults > 0">
          ({{ totalResults }} {{ totalResults === 1 ? 'product' : 'products' }})
        </span>
      </h1>

      <div v-if="isLoading" class="space-y-4">
        <ProductCardSkeleton v-for="n in 5" :key="n" />
      </div>

      <div v-else class="space-y-4">
        <ProductCard v-for="product in allProducts" :key="product.id" :product="product" />
      </div>

      <!-- Sentinel element for infinite scroll -->
      <div ref="sentinelRef" class="h-1" aria-hidden="true" />

      <!-- Loading indicator for next page -->
      <div v-if="isFetchingNextPage" role="status" aria-label="Loading more results" class="flex justify-center py-4">
        <LoaderCircle class="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      </div>

      <!-- No more results -->
      <div v-if="!isFetchingNextPage && hasNextPage === false" class="flex justify-center py-4">
        <p class="text-slate-500">No more results</p>
      </div>
    </template>
  </div>
</template>
