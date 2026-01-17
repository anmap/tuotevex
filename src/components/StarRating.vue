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
    <Star v-if="stars.hasHalfStar" class="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
    <template v-for="i in stars.emptyStars" :key="`star-rating-empty-${i}`">
      <Star class="w-4 h-4 text-gray-300" />
    </template>
  </div>
</template>
