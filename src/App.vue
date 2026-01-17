<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <RouterView />
  </main>
</template>

<style scoped></style>
