<template>
  <div
    class="component-card p-6 flex flex-col"
    :class="{
      'ring-2 ring-green-500 dark:ring-green-400': highlighted,
    }"
  >
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <span v-if="icon" class="text-2xl">{{ icon }}</span>
      <h4 class="text-lg font-bold text-gray-900 dark:text-white m-0">
        {{ title }}
      </h4>
    </div>

    <!-- Image -->
    <div v-if="image" class="mb-4">
      <ImageWithModal
        :src="image"
        :alt="imageAlt || title"
        thumbnail-class="w-full h-32 object-cover rounded-lg"
      />
    </div>

    <!-- Description -->
    <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
      {{ description }}
    </p>

    <!-- Points -->
    <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400 m-0 p-0 list-none">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon?: string
  highlighted?: boolean
  image?: string
  imageAlt?: string
}

defineProps<Props>()
</script>
