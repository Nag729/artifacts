<template>
  <div class="relative flex gap-4 pb-8 last:pb-0">
    <!-- Timeline line -->
    <div class="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 last:hidden" />

    <!-- Step number -->
    <div
      class="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500 dark:bg-primary-600 text-white flex items-center justify-center font-bold text-lg z-10"
    >
      {{ number }}
    </div>

    <!-- Content -->
    <div class="flex-1 pt-1">
      <h3 v-if="title" class="text-xl font-bold text-gray-900 dark:text-white mb-2 mt-0">
        {{ title }}
      </h3>
      <div
        v-if="duration"
        class="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 mb-3"
      >
        {{ duration }}
      </div>
      <div class="text-gray-700 dark:text-gray-300">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  number: number | string
  title?: string
  duration?: string
}

defineProps<Props>()
</script>
