<template>
  <div class="grid md:grid-cols-2 gap-6 my-8">
    <!-- Before -->
    <div
      class="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 p-6"
    >
      <div class="flex items-center gap-2 mb-4">
        <Icon name="mdi:close-circle" class="w-6 h-6 text-red-600 dark:text-red-400" />
        <h3 class="text-lg font-bold text-red-900 dark:text-red-100 m-0">
          {{ beforeTitle }}
        </h3>
      </div>
      <div class="text-gray-700 dark:text-gray-300">
        <slot name="before" />
      </div>
    </div>

    <!-- After -->
    <div
      class="rounded-xl border-2 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20 p-6"
    >
      <div class="flex items-center gap-2 mb-4">
        <Icon name="mdi:check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
        <h3 class="text-lg font-bold text-green-900 dark:text-green-100 m-0">
          {{ afterTitle }}
        </h3>
      </div>
      <div class="text-gray-700 dark:text-gray-300">
        <slot name="after" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  beforeTitle?: string
  afterTitle?: string
}

withDefaults(defineProps<Props>(), {
  beforeTitle: 'Before（曖昧）',
  afterTitle: 'After（明確）',
})
</script>
