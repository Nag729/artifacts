<template>
  <div class="component-card component-card-hover p-6 mb-4">
    <!-- Icon & Title -->
    <div class="flex items-start gap-4">
      <div class="component-icon-badge component-icon-badge-purple">
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
