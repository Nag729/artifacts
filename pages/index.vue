<template>
  <div>
    <!-- ヒーローセクション -->
    <section class="text-center mb-16 py-16 px-4 card">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        ドキュメントサイト
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        開発・チーム運営に関する思考や手法をまとめています
      </p>

      <!-- 検索ボックス -->
      <div class="max-w-2xl mx-auto">
        <SearchBox />
      </div>
    </section>

    <!-- 記事一覧 -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        最新の記事
      </h2>

      <div v-if="pending" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">読み込み中...</p>
      </div>

      <div v-else-if="articles && articles.length > 0" class="grid gap-6">
        <ArticleCard
          v-for="article in articles"
          :key="article._path"
          :article="article"
        />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">記事がまだありません</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO設定
useHead({
  title: 'ホーム',
  meta: [
    { name: 'description', content: '開発・チーム運営に関する思考や手法をまとめたドキュメントサイト' }
  ]
})

// 記事取得
const { data: articles, pending } = await useAsyncData('articles', () =>
  queryContent('/')
    .sort({ date: -1 })
    .find()
)
</script>
