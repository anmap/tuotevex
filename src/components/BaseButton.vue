<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type ButtonVariant = 'primary' | 'secondary'
type ButtonType = 'button' | 'submit' | 'reset'

interface Props {
  variant?: ButtonVariant
  type?: ButtonType
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const attrs = useAttrs()

const variantClasses = computed(() => {
  const baseClasses = 'flex items-center gap-2 rounded-md px-6 py-3 cursor-pointer transition-colors'

  switch (props.variant) {
    case 'primary':
      return `${baseClasses} bg-primary text-white hover:bg-primary/90`
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
  <button :type="type" :disabled="disabled" :class="[variantClasses, disabledClasses, attrs.class]" v-bind="attrs"
    @click="emit('click', $event)">
    <slot />
  </button>
</template>
