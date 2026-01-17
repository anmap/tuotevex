<script setup lang="ts">
import { ref, computed } from 'vue'
import { Star } from 'lucide-vue-next'
import { formatPrice, renderStars } from '@/utils'
import fallbackImage from '@/assets/logo.svg'

interface Product {
  id: string
  title: string
  category: string
  price: number
  rating: number
  reviews: number
  description: string
  image?: string
}

const props = defineProps<{
  product: Product
}>()

const imageSrc = ref(props.product.image || fallbackImage)

const handleImageError = () => {
  imageSrc.value = fallbackImage
}

const isFallbackImage = computed(() => imageSrc.value === fallbackImage)
</script>

<template>
  <div class="flex border border-gray-200 bg-white rounded h-48 mb-6">
    <div class="h-48 w-48 bg-gray-50 shrink-0 flex items-center justify-center">
      <img :src="imageSrc" :alt="`Image of ${product.title}`"
        :class="isFallbackImage ? 'w-24 h-24 object-contain' : 'w-full h-full object-cover'"
        @error="handleImageError" />
    </div>

    <div class="flex-1 p-4">
      <div class="text-xs uppercase text-gray-400 mb-1">{{ product.category }}</div>
      <h3 class="font-bold text-lg mb-2">{{ product.title }}</h3>

      <div class="flex items-center gap-1 mb-2">
        <template v-for="i in renderStars(product.rating).fullStars" :key="`full-${i}`">
          <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </template>
        <Star v-if="renderStars(product.rating).hasHalfStar"
          class="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
        <template v-for="i in renderStars(product.rating).emptyStars" :key="`empty-${i}`">
          <Star class="w-4 h-4 text-gray-300" />
        </template>
        <span class="text-sm text-gray-600 ml-1">({{ product.reviews }} reviews)</span>
      </div>

      <p class="text-sm text-gray-600">{{ product.description }}</p>
    </div>

    <div class="w-1/4 p-4 flex flex-col items-center justify-center bg-gray-100 border-l border-gray-200">
      <div class="text-2xl font-bold text-green-600 mb-1">{{ formatPrice(product.price) }}</div>
      <div class="text-xs text-gray-400 mb-4">VAT included.</div>
    </div>
  </div>
</template>
