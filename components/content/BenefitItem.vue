<template>
  <div
    class="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
  >
    <!-- Icon & Title -->
    <div class="flex items-start gap-4">
      <div
        class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-500/30"
      >
        <Icon :name="icon || 'mdi:check-circle'" class="w-6 h-6 text-white" />
      </div>

      <div class="flex-1 min-w-0">
        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-0">
          {{ title }}
        </h4>
        <p class="text-gray-600 dark:text-gray-300 text-sm m-0">
          <slot />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon?: string
}

defineProps<Props>()
</script>
