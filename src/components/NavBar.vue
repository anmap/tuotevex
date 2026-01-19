<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { watchDebounced } from '@vueuse/core'
import SearchBar from '@/components/SearchBar.vue'
import { normalizeQueryValue } from '@/utils'

const router = useRouter()
const route = useRoute()

// Local ref for immediate UI updates (synced with route.query.q)
const searchValue = ref<string>(normalizeQueryValue(route.query.q))

// Debounced watch to update route path (with automatic cleanup on unmount)
watchDebounced(
  searchValue,
  (value) => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
      router.push({ path: '/search', query: { q: trimmedValue } })
    } else if (route.path === '/search') {
      router.push({ path: '/' })
    }
  },
  { debounce: 300 }
)

// Update search value when route query changes
watch(() => route.query.q, (q) => {
  const nextValue = normalizeQueryValue(q)
  if (nextValue !== searchValue.value) {
    searchValue.value = nextValue
  }
})
</script>

<template>
  <nav aria-label="Main navigation" class="w-full border-b border-gray-200 bg-white/95 backdrop-blur shadow-sm">
    <div class="mx-auto w-full max-w-7xl px-4 py-3 sm:flex sm:items-center sm:gap-4">
      <div class="flex items-center justify-center gap-3 sm:justify-start sm:flex-1">
        <RouterLink :to="{ path: '/' }" class="flex items-center select-none">
          <img src="@/assets/logo.svg" alt="TuoteVex logo" class="mr-2 h-7 w-7" />
          <span class="font-title text-xl font-semibold tracking-tight text-primary">
            TuoteVex
          </span>
        </RouterLink>
      </div>

      <div class="mt-3 w-full sm:mt-0 sm:flex-1">
        <SearchBar v-model="searchValue" />
      </div>
    </div>
  </nav>
</template>
