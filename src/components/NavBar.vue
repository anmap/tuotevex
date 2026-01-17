<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
  <nav aria-label="Main navigation" class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
    <div class="mx-auto w-full max-w-7xl px-4 py-3 sm:flex sm:items-center sm:gap-4">
      <div class="flex items-center justify-between gap-3 sm:flex-1">
        <RouterLink to="/" class="flex items-center select-none">
          <img src="@/assets/logo.svg" alt="TuoteVex logo" class="mr-2 h-7 w-7" />
          <span class="font-title text-xl font-semibold tracking-tight text-primary select-none">
            TuoteVex
          </span>
        </RouterLink>
      </div>

      <div class="mt-3 w-full sm:mt-0 sm:flex-1">
        <SearchBar />
      </div>
    </div>
  </nav>
</template>
