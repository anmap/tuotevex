<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatPrice } from '@/utils'
import StarRating from '@/components/StarRating.vue'
import AnimatedSkeleton from '@/components/AnimatedSkeleton.vue'
import fallbackImage from '@/assets/logo.svg'
import type { Product } from '@/types/product'

const props = defineProps<{
  product: Product
}>()

const imageSrc = ref(props.product.images[0] || fallbackImage)
const imageLoading = ref(true)

const handleImageLoad = () => {
  imageLoading.value = false
}

// If the image fails to load, also use the fallback image
const handleImageError = () => {
  imageLoading.value = false
  imageSrc.value = fallbackImage
}

const thresholds = [
  { min: 100, text: '+100' },
  { min: 50, text: '+50' },
  { min: 25, text: '+25' },
  { min: 10, text: '+10' },
]

const stockInfo = computed(() => {
  const stock = props.product.stock

  // Out of stock
  if (stock === 0) {
    return { text: 'Out of stock', color: 'text-red-600' }
  }

  // Low stock
  if (stock > 0 && stock < 10) {
    return { text: `Only ${stock} in stock`, color: 'text-orange-600' }
  }

  const threshold = thresholds.find((t) => stock >= t.min)
  if (threshold) {
    return { text: `${threshold.text} in stock`, color: 'text-primary' }
  }

  // Fallback
  return { text: 'Stock info unavailable', color: 'text-muted' }
})
</script>

<template>
  <article
    class="flex flex-col md:flex-row border border-gray-300 bg-white rounded-lg mb-6 overflow-hidden md:h-48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow">
    <div class="w-full h-48 md:w-48 bg-gray-50 shrink-0 flex items-center justify-center">
      <AnimatedSkeleton v-if="imageLoading" class="w-36 h-36" />
      <img v-show="!imageLoading" :src="imageSrc" :alt="`Image of ${product.title}`" class="object-contain"
        :class="imageSrc === fallbackImage ? 'w-24 h-24' : 'w-full h-full'" @load="handleImageLoad"
        @error="handleImageError" />
    </div>
    <div class="flex-1 py-4 px-6 flex flex-col">
      <!-- Product brand -->
      <div class="text-sm mb-1" :class="product.brand ? 'text-gray-700' : 'text-gray-400 italic'"
        :aria-label="product.brand ? `Brand: ${product.brand}` : 'No brand'">
        {{ product.brand || 'No brand' }}
      </div>
      <!-- Product title -->
      <h3 class="font-bold text-lg mb-1">{{ product.title }}</h3>
      <!-- Product SKU -->
      <div v-if="product.sku" class="text-xs text-gray-500 mb-2 font-mono" :aria-label="`SKU: ${product.sku}`">
        {{ product.sku }}
      </div>
      <!-- Product rating -->
      <div class="flex items-center gap-1 mb-2" role="img" :aria-label="`Rating: ${product.rating} out of 5 stars`">
        <StarRating :rating="product.rating" />
        <span class="text-sm text-gray-700 ml-1">({{ product.reviews.length }} reviews)</span>
      </div>
      <!-- Product description -->
      <p class="text-sm text-gray-700 mb-2 flex-1">{{ product.description }}</p>
    </div>
    <div
      class="w-full md:w-1/4 p-4 flex flex-row md:flex-col items-center justify-between md:justify-center bg-gray-100">
      <div class="flex flex-col items-center">
        <div class="text-3xl font-bold mb-1">{{ formatPrice(product.price) }}</div>
        <div class="text-xs text-gray-700 mb-4 hidden md:block">VAT included.</div>
      </div>
      <div :class="['text-sm font-medium', stockInfo.color]" :aria-label="`Stock status: ${stockInfo.text}`">
        {{ stockInfo.text }}
      </div>
    </div>
  </article>
</template>
