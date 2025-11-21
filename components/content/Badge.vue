<template>
  <span :class="badgeClasses" class="inline-block px-2 py-0.5 text-xs font-semibold rounded">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { ColorVariant } from '~/composables/useComponentVariants'

interface Props {
  type: ColorVariant
}

const props = defineProps<Props>()

const { getVariant } = useComponentVariants()
const variant = computed(() => getVariant(props.type))

const badgeClasses = computed(() => {
  return `${variant.value.text} ${variant.value.bg}`
})
</script>
