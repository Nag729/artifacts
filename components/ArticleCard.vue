<template>
  <div class="card p-6 hover:scale-[1.02] transition-transform duration-200 relative">
    <NuxtLink :to="`/${article.slug}`" class="block">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {{ article.title }}
      </h2>

      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {{ article.description }}
      </p>

      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="tag in article.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <time class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatDate(article.date) }}
      </time>
    </NuxtLink>

    <!-- Like button -->
    <div class="absolute bottom-5 right-5">
      <button
        :disabled="isLoading"
        :title="article.hasLiked ? 'いいねを取り消す' : 'いいね'"
        class="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200"
        :class="[
          article.hasLiked
            ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500',
          isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105',
        ]"
        @click.prevent="handleLike"
      >
        <Icon
          :name="article.hasLiked ? 'mdi:heart' : 'mdi:heart-outline'"
          class="text-lg transition-transform"
          :class="{ 'scale-125': isAnimating }"
        />
        <span class="text-sm font-medium">{{ article.likeCount }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticleWithLikes } from '~/stores/articles'

const props = defineProps<{
  article: ArticleWithLikes
}>()

const articlesStore = useArticlesStore()
const isLoading = ref(false)
const isAnimating = ref(false)
const dayjs = useDayjs()

const formatDate = (dateString: string) => {
  return dayjs(dateString).locale('ja').format('YYYY年M月D日')
}

const handleLike = async () => {
  if (isLoading.value) return

  isLoading.value = true
  isAnimating.value = true

  await articlesStore.toggleLike(props.article.slug)

  isLoading.value = false
  setTimeout(() => {
    isAnimating.value = false
  }, 200)
}
</script>
