<template>
  <div class="my-8 not-prose">
    <div class="component-gradient-box">
      <!-- Background decoration -->
      <div class="component-decoration-blur component-decoration-blur-top" />
      <div class="component-decoration-blur component-decoration-blur-bottom" />

      <!-- Content -->
      <div class="relative p-8">
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div v-if="icon" class="component-icon-badge component-icon-badge-primary">
            <Icon :name="icon" class="w-6 h-6 text-white" />
          </div>

          <!-- Text content -->
          <div class="flex-1 min-w-0">
            <h3 v-if="title" class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-0">
              {{ title }}
            </h3>
            <div class="info-card-content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  icon?: string
}

defineProps<Props>()
</script>

<style scoped>
.info-card-content :deep(h3) {
  @apply text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3 first:mt-0;
}

.info-card-content :deep(ul) {
  @apply list-none p-0 m-0 flex flex-wrap gap-2;
}

.info-card-content :deep(li) {
  @apply inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all;
}

.info-card-content :deep(p) {
  @apply text-gray-700 dark:text-gray-300 mb-3;
}

.info-card-content :deep(strong) {
  @apply font-semibold text-gray-900 dark:text-white;
}
</style>
