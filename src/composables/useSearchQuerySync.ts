import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { watchDebounced } from '@vueuse/core'
import { normalizeQueryValue } from '@/utils'

/**
 * useSearchQuerySync
 *
 * Provides a reactive search value bound to the `q` query parameter in the route.
 * Automatically updates the route as the search value changes (debounced),
 * and keeps the search value in sync when the query changes (e.g., via browser navigation).
 *
 * Usage: const { searchQuery } = useSearchQuerySync()
 */
export const useSearchQuerySync = () => {
  const router = useRouter()
  const route = useRoute()

  // Local ref for immediate UI updates (synced with route.query.q)
  const searchQuery = ref<string>(normalizeQueryValue(route.query.q))

  // Debounced watch to update route path (with automatic cleanup on unmount)
  watchDebounced(
    searchQuery,
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
    if (nextValue !== searchQuery.value) {
      searchQuery.value = nextValue
    }
  })

  return {
    searchQuery,
  }
}
