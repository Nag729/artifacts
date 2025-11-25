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
    <button
      :disabled="hasLiked || isLoading"
      :title="hasLiked ? 'いいね済み' : 'いいね'"
      class="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200"
      :class="[
        hasLiked
          ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500',
        isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click.prevent="handleLike"
    >
      <Icon
        :name="hasLiked ? 'mdi:heart' : 'mdi:heart-outline'"
        class="text-lg"
        :class="{ 'animate-pulse': isLoading }"
      />
      <span class="text-sm font-medium">{{ likes }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'

const props = defineProps<{
  article: Article
}>()

const { likes, hasLiked, isLoading, addLike } = useLikes(props.article.slug)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const handleLike = async () => {
  await addLike()
}
</script>
