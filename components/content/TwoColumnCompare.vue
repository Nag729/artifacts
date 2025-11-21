<template>
  <div class="my-8 not-prose">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="component-card p-6">
        <h4
          class="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-0 flex items-center gap-2"
        >
          <span v-if="leftIcon" class="text-xl">{{ leftIcon }}</span>
          {{ leftTitle }}
        </h4>
        <div class="text-gray-600 dark:text-gray-300 text-sm">
          <slot name="left" />
        </div>
      </div>

      <div class="component-card p-6">
        <h4
          class="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-0 flex items-center gap-2"
        >
          <span v-if="rightIcon" class="text-xl">{{ rightIcon }}</span>
          {{ rightTitle }}
        </h4>
        <div class="text-gray-600 dark:text-gray-300 text-sm">
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  leftTitle: string
  rightTitle: string
  leftIcon?: string
  rightIcon?: string
}

defineProps<Props>()
</script>
