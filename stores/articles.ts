import { defineStore } from 'pinia'
import type { Article } from '~/types/article'
import { articles } from '~/data/articles'
import { useLikesStore } from './likes'

export type SortOrder = 'likes' | 'date'

export interface ArticleWithLikes extends Article {
  likeCount: number
  hasLiked: boolean
}

export const useArticlesStore = defineStore('articles', () => {
  const dayjs = useDayjs()
  const likesStore = useLikesStore()

  const sortedArticles = ref<ArticleWithLikes[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentSort = ref<SortOrder>('date')

  /**
   * Sort articles by the specified order
   */
  const sortArticles = async (order: SortOrder) => {
    isLoading.value = true
    error.value = null
    currentSort.value = order

    try {
      // Fetch like counts and user's likes from likes store
      await likesStore.fetchAllLikeCounts()
      await likesStore.fetchUserLikes()

      // Merge articles with like counts and hasLiked status
      const articlesWithLikes: ArticleWithLikes[] = articles.map((article) => ({
        ...article,
        likeCount: likesStore.getLikeCount(article.slug),
        hasLiked: likesStore.hasLiked(article.slug),
      }))

      // Sort based on the specified order
      if (order === 'likes') {
        sortedArticles.value = articlesWithLikes.sort((a, b) => {
          // Sort by likes (descending), then by date (newest first) as tiebreaker
          if (b.likeCount !== a.likeCount) {
            return b.likeCount - a.likeCount
          }
          return dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
        })
      } else {
        // Sort by date (newest first)
        sortedArticles.value = articlesWithLikes.sort(
          (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
        )
      }
    } catch (err) {
      console.error('Failed to sort articles:', err)
      error.value = '記事の取得に失敗しました'
      // Fallback to date sorting
      sortedArticles.value = articles.map((article) => ({
        ...article,
        likeCount: 0,
        hasLiked: false,
      }))
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Toggle like for a specific article
   */
  const toggleLike = async (articleSlug: string): Promise<boolean> => {
    const articleIndex = sortedArticles.value.findIndex((a) => a.slug === articleSlug)
    if (articleIndex === -1) return false

    // Toggle like in likes store
    const success = await likesStore.toggleLike(articleSlug)
    if (!success) return false

    // Update local article state
    const article = sortedArticles.value[articleIndex]
    if (article) {
      article.likeCount = likesStore.getLikeCount(articleSlug)
      article.hasLiked = likesStore.hasLiked(articleSlug)
    }

    return true
  }

  return {
    sortedArticles,
    isLoading,
    currentSort,
    sortArticles,
    toggleLike,
  }
})
