<script setup lang="ts">
import AnimatedSkeleton from '@/components/atoms/AnimatedSkeleton.vue'
</script>

<template>
  <article class="flex flex-col md:flex-row border border-gray-300 bg-white rounded-lg mb-6 overflow-hidden md:h-48">
    <div class="w-full h-48 md:w-48 bg-gray-50 shrink-0 flex items-center justify-center">
      <AnimatedSkeleton class="w-36 h-36" />
    </div>
    <div class="flex-1 py-4 px-6 flex flex-col">
      <AnimatedSkeleton class="h-4 w-20 mb-2" />
      <AnimatedSkeleton class="h-6 w-3/4 mb-2" />
      <AnimatedSkeleton class="h-3 w-24 mb-2" />
      <div class="flex items-center gap-1 mb-2">
        <AnimatedSkeleton class="h-4 w-20" />
        <AnimatedSkeleton class="h-4 w-16 ml-1" />
      </div>
      <div class="flex-1 space-y-2 mb-2">
        <AnimatedSkeleton class="h-3 w-full" />
        <AnimatedSkeleton class="h-3 w-full" />
        <AnimatedSkeleton class="h-3 w-5/6" />
      </div>
    </div>
    <div
      class="w-full md:w-1/4 p-4 flex flex-row md:flex-col items-center justify-between md:justify-center bg-gray-100">
      <div class="flex flex-col items-center">
        <AnimatedSkeleton class="h-8 w-24 mb-2" />
        <AnimatedSkeleton class="h-3 w-20 mb-4 hidden md:block" />
      </div>
      <AnimatedSkeleton class="h-4 w-24" />
    </div>
  </article>
</template>
