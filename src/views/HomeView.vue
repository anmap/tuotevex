<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-center">
    <section aria-labelledby="welcome-heading"
      class="animate-fade-slide-up duration-300 w-full px-4 pb-16 pt-12 text-center">
      <div class="mx-auto max-w-2xl">
        <img src="@/assets/logo.svg" alt="" class="mx-auto mb-6 h-24 w-24 sm:h-36 sm:w-36" />

        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-bold">
          <Sparkles class="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Discover amazing random products!</span>
        </div>

        <h1 id="welcome-heading" class="font-title text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
          Welcome to
          <span class="text-primary">TuoteVex</span>
        </h1>

        <p class="mt-4 text-lg text-muted">
          Start typing in the search box to see our selection of products.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-slide-up {
  animation: fade-slide-up 0.6s ease-out both;
}

@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
