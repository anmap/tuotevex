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
  <div class="flex items-center gap-1">
    <template v-for="i in stars.fullStars" :key="`star-rating-full-${i}`">
      <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
    </template>
    <div v-if="stars.hasHalfStar" class="relative w-4 h-4">
      <Star class="absolute w-4 h-4 text-gray-300" />
      <Star class="absolute w-4 h-4 fill-yellow-400 text-yellow-400 [clip-path:inset(0_50%_0_0)]" />
    </div>
    <template v-for="i in stars.emptyStars" :key="`star-rating-empty-${i}`">
      <Star class="w-4 h-4 text-gray-300" />
    </template>
  </div>
</template>
