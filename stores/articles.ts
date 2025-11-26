import { defineStore } from 'pinia'
import type { Article } from '~/types/article'
import { articles } from '~/data/articles'

export type SortOrder = 'likes' | 'date'

export interface ArticleWithLikes extends Article {
  likeCount: number
  hasLiked: boolean
}

export const useArticlesStore = defineStore('articles', () => {
  const nuxtApp = useNuxtApp()
  const $supabase = nuxtApp.$supabase
  const dayjs = nuxtApp.$dayjs

  const sortedArticles = ref<ArticleWithLikes[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentSort = ref<SortOrder>('likes')

  /**
   * Get or create user ID from localStorage
   */
  const getUserId = (): string => {
    if (import.meta.client) {
      const stored = localStorage.getItem('artifacts_user_id')
      if (stored) {
        return stored
      }

      const newId = crypto.randomUUID()
      localStorage.setItem('artifacts_user_id', newId)
      return newId
    }

    return 'ssr-fallback'
  }

  /**
   * Fetch like counts and user's liked articles from Supabase
   */
  const fetchLikesData = async (): Promise<{
    likeCountMap: Map<string, number>
    hasLikedSet: Set<string>
  }> => {
    const likeCountMap = new Map<string, number>()
    const hasLikedSet = new Set<string>()

    try {
      const userId = getUserId()

      // Fetch both like counts and user's likes in parallel
      const [likeCountsResult, userLikesResult] = await Promise.all([
        $supabase.from('like_counts').select('article_slug, like_count'),
        $supabase.from('likes').select('article_slug').eq('user_id', userId),
      ])

      // Process like counts
      if (likeCountsResult.data) {
        likeCountsResult.data.forEach((item: { article_slug: string; like_count: number }) => {
          likeCountMap.set(item.article_slug, item.like_count)
        })
      }

      // Process user's likes
      if (userLikesResult.data) {
        userLikesResult.data.forEach((item: { article_slug: string }) => {
          hasLikedSet.add(item.article_slug)
        })
      }

      if (likeCountsResult.error) throw likeCountsResult.error
      if (userLikesResult.error) throw userLikesResult.error
    } catch (err) {
      console.error('Failed to fetch likes data:', err)
    }

    return { likeCountMap, hasLikedSet }
  }

  /**
   * Sort articles by the specified order
   */
  const sortArticles = async (order: SortOrder = 'likes') => {
    isLoading.value = true
    error.value = null
    currentSort.value = order

    try {
      // Fetch like counts and user's likes from Supabase
      const { likeCountMap, hasLikedSet } = await fetchLikesData()

      // Merge articles with like counts and hasLiked status
      const articlesWithLikes: ArticleWithLikes[] = articles.map((article) => ({
        ...article,
        likeCount: likeCountMap.get(article.slug) || 0,
        hasLiked: hasLikedSet.has(article.slug),
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
    try {
      const userId = getUserId()
      const articleIndex = sortedArticles.value.findIndex((a) => a.slug === articleSlug)
      if (articleIndex === -1) return false

      const article = sortedArticles.value[articleIndex]
      if (!article) return false

      if (article.hasLiked) {
        // Remove like
        const { error: deleteError } = await $supabase
          .from('likes')
          .delete()
          .eq('article_slug', articleSlug)
          .eq('user_id', userId)

        if (deleteError) throw deleteError

        // Update reactively
        const currentArticle = sortedArticles.value[articleIndex]
        if (currentArticle) {
          currentArticle.hasLiked = false
          currentArticle.likeCount = Math.max(0, currentArticle.likeCount - 1)
        }
      } else {
        // Add like
        const { error: insertError } = await $supabase.from('likes').insert({
          article_slug: articleSlug,
          user_id: userId,
        })

        if (insertError) {
          if (insertError.code === '23505') {
            const duplicateArticle = sortedArticles.value[articleIndex]
            if (duplicateArticle) {
              duplicateArticle.hasLiked = true
            }
            return true
          }
          throw insertError
        }

        // Update reactively
        const currentArticle = sortedArticles.value[articleIndex]
        if (currentArticle) {
          currentArticle.hasLiked = true
          currentArticle.likeCount += 1
        }
      }

      return true
    } catch (err) {
      console.error('Failed to toggle like:', err)
      return false
    }
  }

  return {
    sortedArticles,
    isLoading,
    error,
    currentSort,
    sortArticles,
    toggleLike,
    getUserId,
  }
})
