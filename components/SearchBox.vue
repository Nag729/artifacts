<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="query"
        type="text"
        placeholder="記事を検索..."
        class="w-full px-4 py-3 pl-11 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition"
        @input="handleSearch"
      />
      <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <!-- 検索結果 -->
    <div v-if="query && results.length > 0" class="absolute w-full mt-2 card max-h-96 overflow-y-auto">
      <NuxtLink
        v-for="result in results"
        :key="result._path"
        :to="result._path"
        class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition rounded-lg"
        @click="query = ''"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
          {{ result.title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {{ result.description }}
        </p>
      </NuxtLink>
    </div>

    <!-- 結果なし -->
    <div v-else-if="query && results.length === 0" class="absolute w-full mt-2 card">
      <p class="p-4 text-center text-gray-500 dark:text-gray-400">
        該当する記事が見つかりませんでした
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const query = ref('')
const results = ref<any[]>([])

const handleSearch = async () => {
  if (!query.value) {
    results.value = []
    return
  }

  const articles = await queryContent('/')
    .where({
      $or: [
        { title: { $contains: query.value } },
        { description: { $contains: query.value } },
        { tags: { $contains: query.value } }
      ]
    })
    .limit(5)
    .find()

  results.value = articles
}
</script>
