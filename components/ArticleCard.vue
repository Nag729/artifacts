<template>
  <div class="card p-6 hover:scale-[1.02] transition-transform duration-200">
    <NuxtLink :to="`/${article.slug}`" class="flex items-start gap-5">
      <Icon :name="article.icon" size="56" class="shrink-0" />
      <div class="min-w-0">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {{ article.title }}
        </h2>

        <p class="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {{ article.description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-3">
          <span v-for="tag in article.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>

        <time class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <Icon name="mdi:calendar-outline" size="16" />
          {{ formatDate(article.date) }}
        </time>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'

defineProps<{
  article: Article
}>()

const dayjs = useDayjs()

const formatDate = (dateString: string) => {
  return dayjs(dateString).locale('ja').format('YYYY年M月D日')
}
</script>
