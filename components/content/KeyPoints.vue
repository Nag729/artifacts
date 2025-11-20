<template>
  <div class="my-8 not-prose">
    <div
      class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/50 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-900 border border-green-200/60 dark:border-green-800/50 shadow-sm p-8"
    >
      <!-- Background decoration -->
      <div
        class="absolute -top-24 -right-24 w-48 h-48 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-50"
      />

      <!-- Icon & Title -->
      <div class="relative flex items-center gap-3 mb-6">
        <div
          class="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 flex items-center justify-center shadow-lg shadow-green-500/30"
        >
          <Icon name="mdi:lightbulb-on" class="w-5 h-5 text-white" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white m-0">
          {{ title || 'ポイント' }}
        </h3>
      </div>

      <!-- Content -->
      <div class="relative key-points-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<style scoped>
.key-points-content :deep(ul) {
  @apply list-none p-0 m-0 space-y-3;
}

.key-points-content :deep(li) {
  @apply flex items-start gap-3 text-gray-700 dark:text-gray-300;
}

.key-points-content :deep(li::before) {
  content: '✓';
  @apply flex-shrink-0 w-6 h-6 rounded-full bg-green-500 dark:bg-green-600 text-white font-bold flex items-center justify-center text-sm;
}
</style>
