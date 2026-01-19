<script setup lang="ts">
import { Search } from 'lucide-vue-next'

const searchValue = defineModel<string>()
</script>

<template>
  <div
    class="flex w-full items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm transition focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-white">
    <Search class="h-4 w-4 text-slate-400" aria-hidden="true" />
    <input id="search-input" v-model="searchValue" type="search" name="search" placeholder="Search products"
      autocomplete="off" aria-label="Search products"
      class="w-full bg-transparent text-sm placeholder:text-slate-400 focus-visible:outline-none" />
  </div>
</template>
