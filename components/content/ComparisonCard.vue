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

    <!-- Image (clickable for modal) -->
    <div v-if="image" class="mb-4">
      <img
        :src="image"
        :alt="imageAlt || title"
        class="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
        @click="openModal"
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

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        @click="closeModal"
      >
        <div class="relative max-w-4xl max-h-[90vh]" @click.stop>
          <button
            class="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            @click="closeModal"
          >
            <Icon name="mdi:close" class="w-8 h-8" />
          </button>
          <img
            :src="image"
            :alt="imageAlt || title"
            class="max-w-full max-h-[85vh] object-contain rounded-lg bg-white p-4 shadow-2xl"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  description: string
  icon?: string
  highlighted?: boolean
  image?: string
  imageAlt?: string
}

defineProps<Props>()

const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
}
</script>
