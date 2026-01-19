<script setup lang="ts">
import { computed } from 'vue'
import { Star } from 'lucide-vue-next'
import { renderStars } from '@/utils'

interface Props {
  rating: number
}

const props = defineProps<Props>()

const stars = computed(() => renderStars(props.rating))
</script>

<template>
  <div class="flex items-center gap-1" role="img" :aria-label="`${props.rating} out of 5 stars`">
    <template v-for="i in stars.fullStars" :key="`star-rating-full-${i}`">
      <Star class="w-4 h-4 fill-amber-600 text-amber-600" aria-hidden="true" />
    </template>
    <div v-if="stars.hasHalfStar" class="relative w-4 h-4" aria-hidden="true">
      <Star class="absolute w-4 h-4 text-gray-500" aria-hidden="true" />
      <Star class="absolute w-4 h-4 fill-amber-600 text-amber-600 [clip-path:inset(0_50%_0_0)]" aria-hidden="true" />
    </div>
    <template v-for="i in stars.emptyStars" :key="`star-rating-empty-${i}`">
      <Star class="w-4 h-4 text-gray-500" aria-hidden="true" />
    </template>
  </div>
</template>
