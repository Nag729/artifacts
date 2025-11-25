<template>
  <div class="flex my-8">
    <!-- Loading skeleton -->
    <div
      v-if="isLoading && likes === 0 && !hasLiked"
      class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
    >
      <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      <div class="w-8 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div class="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>

    <!-- Like button -->
    <button
      v-else
      :disabled="isLoading"
      :title="hasLiked ? 'いいねを取り消す' : 'いいね'"
      class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200"
      :class="[
        hasLiked
          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500',
        isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105',
      ]"
      @click="handleLike"
    >
      <Icon
        :name="hasLiked ? 'mdi:heart' : 'mdi:heart-outline'"
        class="text-2xl transition-transform"
        :class="{ 'scale-125': isAnimating }"
      />
      <span class="text-base">{{ likes }}</span>
      <span class="text-sm">{{ hasLiked ? 'いいね済み' : 'いいね' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  articleSlug: string
}>()

const { likes, hasLiked, isLoading, toggleLike } = useLikes(props.articleSlug)
const isAnimating = ref(false)

const handleLike = async () => {
  isAnimating.value = true
  await toggleLike()

  // Quick scale animation
  setTimeout(() => {
    isAnimating.value = false
  }, 200)
}
</script>
