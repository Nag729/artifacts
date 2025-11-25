<template>
  <div>
    <!-- ヒーローセクション -->
    <section class="text-center mb-16 py-16 px-4 card">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Nag729 - artifacts
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        開発・チーム運営に関する思考や手法をまとめています
      </p>
    </section>

    <!-- 記事一覧 -->
    <section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">記事一覧</h2>

        <!-- Sort toggle -->
        <div class="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center',
              currentSort === 'likes'
                ? 'bg-white dark:bg-gray-700 text-pink-600 dark:text-pink-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400',
            ]"
            @click="handleSort('likes')"
          >
            <Icon name="mdi:heart" class="mr-1" />
            いいね順
          </button>
          <button
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center',
              currentSort === 'date'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
            ]"
            @click="handleSort('date')"
          >
            <Icon name="mdi:clock-outline" class="mr-1" />
            最新順
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">読み込み中...</p>
      </div>

      <div v-else-if="articles && articles.length > 0" class="grid gap-6">
        <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">記事がまだありません</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { SortOrder } from '~/composables/useArticles'

// SEO設定
useHead({
  title: 'ホーム',
  meta: [
    {
      name: 'description',
      content: '開発・チーム運営に関する思考や手法をまとめたドキュメントサイト',
    },
  ],
})

// 記事取得とソート管理
const { articles, isLoading, currentSort, sortArticles } = useArticles()

const handleSort = (order: SortOrder) => {
  sortArticles(order)
}
</script>
