<template>
  <div>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <!-- 記事ヘッダー -->
      <header class="not-prose mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ page?.title }}
        </h1>

        <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {{ page?.description }}
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <!-- タグ -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in page?.tags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>

          <!-- 日付 -->
          <time class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(page?.date) }}
          </time>
        </div>
      </header>

      <!-- 記事本文 -->
      <ContentRenderer :value="page" class="prose-custom" />
    </article>

    <!-- 関連記事やナビゲーションをここに追加可能 -->
    <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        記事一覧に戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 記事取得
const { data: page } = await useAsyncData('page-' + route.path, () =>
  queryContent(route.path).findOne()
)

// 404チェック
if (!page.value) {
  throw createError({
    statusCode: 404,
    message: 'ページが見つかりません'
  })
}

// SEO設定
useHead({
  title: page.value?.title,
  meta: [
    { name: 'description', content: page.value?.description },
    { property: 'og:title', content: page.value?.title },
    { property: 'og:description', content: page.value?.description },
    { property: 'og:type', content: 'article' }
  ]
})

// 日付フォーマット
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
