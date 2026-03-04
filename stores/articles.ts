import { defineStore } from 'pinia'
import { getArticlesSortedByDate } from '~/data/articles'

export const useArticlesStore = defineStore('articles', () => {
  const sortedArticles = computed(() => getArticlesSortedByDate())

  return {
    sortedArticles,
  }
})
