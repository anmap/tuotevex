<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SearchBar from '@/components/molecules/SearchBar.vue'
import { useSearchQuerySync } from '@/composables/useSearchQuerySync';

const { searchQuery } = useSearchQuerySync()
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
        <SearchBar v-model="searchQuery" />
      </div>
    </div>
  </nav>
</template>
