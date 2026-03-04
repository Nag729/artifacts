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
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">記事一覧</h2>

      <div v-if="articles && articles.length > 0" class="grid gap-6">
        <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">記事がまだありません</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO設定
useSeo({
  title: 'ホーム',
  description: '開発・チーム運営に関する思考や手法をまとめたドキュメントサイト',
  type: 'website',
})

// 記事取得
const articlesStore = useArticlesStore()
const { sortedArticles: articles } = storeToRefs(articlesStore)
</script>
