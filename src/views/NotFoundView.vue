<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { Home, Link2Off, ArrowLeft } from 'lucide-vue-next'

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
  <div class="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4"
    aria-labelledby="not-found-heading">
    <div class="text-center">
      <!-- Screen reader announcement -->
      <span class="sr-only">Error 404: Page not found</span>

      <!-- Large faded 404 background with broken link icon -->
      <div class="relative mb-8 flex items-center justify-center">
        <span aria-hidden="true" class="text-[200px] font-bold leading-none text-gray-200 sm:text-[30rem] select-none">
          404
        </span>
        <div
          class="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-primary bg-white shadow-lg sm:h-40 sm:w-40"
          aria-hidden="true">
          <Link2Off class="h-12 w-12 text-primary sm:h-16 sm:w-16" aria-hidden="true" />
        </div>
      </div>

      <!-- Heading -->
      <h1 id="not-found-heading" class="font-title text-3xl font-bold text-gray-900 sm:text-4xl">
        Oops! Page not found
      </h1>

      <!-- Description -->
      <p class="mt-4 text-base text-gray-600 sm:text-lg">
        It looks like the link you followed is broken or the page has been moved. Let's get you back
        on track.
      </p>

      <!-- Action buttons -->
      <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <button type="button" @click="goBack"
          class="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-offset-2">
          <ArrowLeft class="h-5 w-5" aria-hidden="true" />
          <span>Go Back</span>
        </button>

        <RouterLink to="/"
          class="flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2">
          <Home class="h-5 w-5" aria-hidden="true" />
          <span>Back to Homepage</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
