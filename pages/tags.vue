<template>
  <div>
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">タグ一覧</h1>

    <div v-if="pending" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">読み込み中...</p>
    </div>

    <div v-else class="space-y-8">
      <div v-for="tag in allTags" :key="tag" class="card p-6">
        <h2
          class="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3"
        >
          <span class="tag">{{ tag }}</span>
          <span class="text-base text-gray-500 dark:text-gray-400">
            ({{ getArticlesByTag(tag).length }}件)
          </span>
        </h2>

        <div class="grid gap-4">
          <NuxtLink
            v-for="article in getArticlesByTag(tag)"
            :key="article.slug"
            :to="`/${article.slug}`"
            class="block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              {{ article.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {{ article.description }}
            </p>
          </NuxtLink>
        </div>
      </div>

      <div v-if="allTags.length === 0" class="text-center py-12 card">
        <p class="text-gray-500 dark:text-gray-400">タグがまだありません</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllTags, getArticlesByTag as getArticlesByTagFromData } from '~/data/articles'

// SEO設定
useHead({
  title: 'タグ一覧',
  meta: [{ name: 'description', content: 'タグごとの記事一覧' }],
})

// 全タグを取得
const allTags = getAllTags()
const pending = false

// タグで記事をフィルタリング
const getArticlesByTag = (tag: string) => {
  return getArticlesByTagFromData(tag)
}
</script>
