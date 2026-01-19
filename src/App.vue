<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <nav
    class="absolute left-0 top-0 z-100 -translate-y-full opacity-0 pointer-events-none rounded-br-lg border border-gray-200 bg-gray-50 p-4 text-gray-900 shadow-md transition duration-200 focus-within:translate-y-0 focus-within:opacity-100 focus-within:pointer-events-auto"
    aria-label="Skip links">
    <ul class="space-y-2">
      <li>
        <a class="block rounded px-2 py-1" href="#main-content">
          Skip to main content
        </a>
      </li>
      <li>
        <a class="block rounded px-2 py-1" href="#search-input">
          Skip to search
        </a>
      </li>
    </ul>
  </nav>
  <header class="sticky top-0 z-50">
    <NavBar />
  </header>
  <main id="main-content" class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" tabindex="-1">
    <RouterView />
  </main>
</template>
