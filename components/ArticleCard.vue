<template>
  <NuxtLink
    :to="`/${article.slug}`"
    class="card block p-6 hover:scale-[1.02] transition-transform duration-200"
  >
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
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'

defineProps<{
  article: Article
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
