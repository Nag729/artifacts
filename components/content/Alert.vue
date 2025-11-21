<template>
  <div :class="alertClasses" class="rounded-xl p-4 mb-6">
    <div class="flex items-center gap-3">
      <Icon :name="displayIcon" :class="variant.icon" class="w-6 h-6 flex-shrink-0" />
      <span v-if="title" class="font-bold">{{ title }}</span>
    </div>
    <div v-if="$slots.default" class="mt-2 ml-9">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColorVariant } from '~/composables/useComponentVariants'

interface Props {
  type: ColorVariant
  title: string
}

const props = defineProps<Props>()

const { getVariant } = useComponentVariants()
const variant = computed(() => getVariant(props.type))

const alertClasses = computed(() => {
  return `border-l-4 ${variant.value.bg} ${variant.value.border}`
})

const displayIcon = computed(() => variant.value.defaultIcon)
</script>
