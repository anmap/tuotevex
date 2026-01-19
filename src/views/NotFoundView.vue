<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Home, Link2Off, ArrowLeft } from 'lucide-vue-next'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center"
    aria-labelledby="not-found-heading">
    <div class="text-center">
      <!-- Screen reader announcement -->
      <span class="sr-only">Error 404: Page not found</span>

      <!-- Large faded 404 background with broken link icon -->
      <div class="relative mb-8 flex items-center justify-center">
        <span aria-hidden="true" class="text-[12em] font-bold leading-none text-gray-200 md:text-[30em] select-none">
          404
        </span>
        <div
          class="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-primary bg-white shadow-lg md:h-40 md:w-40"
          aria-hidden="true">
          <Link2Off class="h-8 w-8 text-primary md:h-16 md:w-16" aria-hidden="true" />
        </div>
      </div>

      <!-- Error heading and description -->
      <h1 id="not-found-heading" class="font-title text-3xl font-bold text-gray-900 md:text-4xl">
        Oops! Page not found
      </h1>

      <p class="mt-4 text-base text-gray-600 md:text-lg">
        It looks like the link you followed is broken or the page has been moved. Let's get you back
        on track.
      </p>

      <!-- Action buttons -->
      <div class="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <BaseButton variant="secondary" @click="goBack">
          <ArrowLeft class="h-5 w-5" aria-hidden="true" />
          <span>Go Back</span>
        </BaseButton>

        <BaseButton to="/">
          <Home class="h-5 w-5" aria-hidden="true" />
          <span>Back to Homepage</span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>
