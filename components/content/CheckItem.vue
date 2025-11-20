<template>
  <div class="flex gap-3 mb-4 last:mb-0">
    <!-- Icon -->
    <Icon
      :name="type === 'good' ? 'mdi:check-circle' : 'mdi:close-circle'"
      :class="iconClasses"
      class="w-6 h-6 flex-shrink-0 mt-0.5"
    />

    <!-- Content -->
    <div class="flex-1">
      <div v-if="label" :class="labelClasses" class="font-bold mb-1">
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

const iconClasses = computed(() => {
  return props.type === 'good'
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400'
})

const labelClasses = computed(() => {
  return props.type === 'good'
    ? 'text-green-900 dark:text-green-100'
    : 'text-red-900 dark:text-red-100'
})
</script>
