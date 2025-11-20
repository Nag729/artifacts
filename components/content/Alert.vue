<template>
  <div :class="alertClasses" class="rounded-xl p-4 mb-6 flex gap-3">
    <Icon :name="iconName" :class="iconClasses" class="w-6 h-6 flex-shrink-0 mt-0.5" />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'info' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
})

const alertClasses = computed(() => {
  const base = 'border-l-4'
  const variants = {
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-500',
    success: 'bg-green-50 dark:bg-green-950/30 border-green-500',
    warning: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500',
    danger: 'bg-red-50 dark:bg-red-950/30 border-red-500',
  }
  return `${base} ${variants[props.type]}`
})

const iconClasses = computed(() => {
  const variants = {
    info: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
  }
  return variants[props.type]
})

const iconName = computed(() => {
  const icons = {
    info: 'mdi:information-outline',
    success: 'mdi:check-circle-outline',
    warning: 'mdi:alert-outline',
    danger: 'mdi:alert-circle-outline',
  }
  return icons[props.type]
})
</script>
