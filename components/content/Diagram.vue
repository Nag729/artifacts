<template>
  <div class="my-8 not-prose">
    <div
      class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-50/50 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-900 border border-purple-200/60 dark:border-purple-800/50 shadow-sm p-8"
    >
      <!-- Background decoration -->
      <div
        class="absolute -top-24 -right-24 w-48 h-48 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50"
      />

      <!-- Content -->
      <div class="relative">
        <h3 v-if="title" class="text-xl font-bold text-gray-900 dark:text-white mb-6 mt-0">
          {{ title }}
        </h3>
        <div class="diagram-content font-mono text-sm">
          <slot />
        </div>
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
.diagram-content :deep(pre) {
  @apply bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-xl p-6 overflow-x-auto;
}

.diagram-content :deep(code) {
  @apply text-sm;
}
</style>
