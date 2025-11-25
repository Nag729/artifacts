<template>
  <div class="card p-6 hover:scale-[1.02] transition-transform duration-200 relative">
    <NuxtLink :to="`/${article.slug}`" class="block">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {{ article.title }}
      </h2>

      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {{ article.description }}
      </p>

      <div class="flex flex-wrap gap-2 mb-3">
        <span v-for="tag in article.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <time class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatDate(article.date) }}
      </time>
    </NuxtLink>

    <!-- Like button -->
    <div class="absolute top-4 right-4">
      <!-- Loading skeleton -->
      <div
        v-if="isLoading && likes === 0 && !hasLiked"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
      >
        <div class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div class="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>

      <!-- Like button -->
      <button
        v-else
        :disabled="isLoading"
        :title="hasLiked ? 'いいねを取り消す' : 'いいね'"
        class="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200"
        :class="[
          hasLiked
            ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500',
          isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105',
        ]"
        @click.prevent="handleLike"
      >
        <Icon
          :name="hasLiked ? 'mdi:heart' : 'mdi:heart-outline'"
          class="text-lg transition-transform"
          :class="{ 'scale-125': isAnimating }"
        />
        <span class="text-sm font-medium">{{ likes }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'

const props = defineProps<{
  article: Article
}>()

const { likes, hasLiked, isLoading, toggleLike } = useLikes(props.article.slug)
const isAnimating = ref(false)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const handleLike = async () => {
  isAnimating.value = true
  await toggleLike()

  // Quick scale animation
  setTimeout(() => {
    isAnimating.value = false
  }, 200)
}
</script>
