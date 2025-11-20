<template>
  <div :class="alertClasses" class="rounded-xl p-4 mb-6 flex gap-3">
    <Icon :name="displayIcon" :class="variant.icon" class="w-6 h-6 flex-shrink-0 mt-0.5" />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColorVariant } from '~/composables/useComponentVariants'

interface Props {
  type?: ColorVariant
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  icon: undefined,
})

const { getVariant } = useComponentVariants()
const variant = computed(() => getVariant(props.type))

const alertClasses = computed(() => {
  return `border-l-4 ${variant.value.bg} ${variant.value.border}`
})

const displayIcon = computed(() => {
  return props.icon || variant.value.defaultIcon
})
</script>
