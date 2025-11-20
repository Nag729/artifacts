<template>
  <div class="flex gap-3 mb-4 last:mb-0">
    <!-- Icon -->
    <Icon :name="iconName" :class="variant.icon" class="w-6 h-6 flex-shrink-0 mt-0.5" />

    <!-- Content -->
    <div class="flex-1">
      <div v-if="label" :class="variant.text" class="font-bold mb-1">
        {{ label }}
      </div>
      <div class="text-gray-700 dark:text-gray-300">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: 'good' | 'bad'
  label?: string
}

const props = defineProps<Props>()

const { mapGoodBad, getVariant, getCheckIcon } = useComponentVariants()

const variant = computed(() => getVariant(mapGoodBad(props.type)))
const iconName = computed(() => getCheckIcon(props.type))
</script>
