<template>
  <div class="my-8 not-prose">
    <div
      class="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
    >
      <h3 class="text-xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
        <Icon :name="icon" class="w-6 h-6" />
        {{ title }}
      </h3>
      <div class="benefit-box-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'mdi:check-circle',
})
</script>

<style scoped>
.benefit-box-content :deep(ul) {
  @apply space-y-2 list-none p-0;
}

.benefit-box-content :deep(li) {
  @apply flex items-start gap-2;
}

.benefit-box-content :deep(li::before) {
  content: '';
  @apply w-5 h-5 flex-shrink-0 mt-0.5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2316a34a' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.dark .benefit-box-content :deep(li::before) {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2334d399' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
}
</style>
