<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

type ButtonVariant = 'primary' | 'secondary'
type ButtonType = 'button' | 'submit' | 'reset'

interface Props {
  variant?: ButtonVariant
  type?: ButtonType
  disabled?: boolean
  to?: RouteLocationRaw
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleLinkClick = (event: MouseEvent, navigate: (event: MouseEvent) => void) => {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
  navigate(event)
}

const attrs = useAttrs()

const variantClasses = computed(() => {
  const baseClasses = 'flex items-center gap-2 rounded-md px-6 py-3 transition-colors'

  switch (props.variant) {
    case 'primary':
      return `${baseClasses} bg-primary-bold text-white hover:bg-primary/90`
    case 'secondary':
      return `${baseClasses} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50`
    default:
      return baseClasses
  }
})

const disabledClasses = computed(() => {
  return props.disabled ? 'opacity-50 !cursor-not-allowed' : ''
})
</script>

<template>
  <RouterLink v-if="to" :to="to" custom v-slot="{ href, navigate }">
    <a :href="href" :class="[variantClasses, disabledClasses]" :aria-disabled="disabled ? 'true' : undefined"
      :tabindex="disabled ? -1 : undefined" v-bind="attrs" @click="handleLinkClick($event, navigate)">
      <slot />
    </a>
  </RouterLink>
  <button v-else :type="type" :disabled="disabled" :class="[variantClasses, disabledClasses]" v-bind="attrs"
    @click="emit('click', $event)">
    <slot />
  </button>
</template>
