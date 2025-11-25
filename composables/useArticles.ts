import type { Article } from '~/types/article'
import { articles } from '~/data/articles'

export type SortOrder = 'likes' | 'date'

interface ArticleWithLikes extends Article {
  likeCount: number
}

export const useArticles = () => {
  const { $supabase } = useNuxtApp()
  const sortedArticles = ref<ArticleWithLikes[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentSort = ref<SortOrder>('likes')

  /**
   * Fetch like counts for all articles from Supabase
   */
  const fetchLikeCounts = async (): Promise<Map<string, number>> => {
    const likeCountMap = new Map<string, number>()

    try {
      const { data, error: fetchError } = await $supabase
        .from('article_likes')
        .select('article_slug, like_count')

      if (fetchError) throw fetchError

      if (data) {
        data.forEach((item: { article_slug: string; like_count: number }) => {
          likeCountMap.set(item.article_slug, item.like_count)
        })
      }
    } catch (err) {
      console.error('Failed to fetch like counts:', err)
    }

    return likeCountMap
  }

  /**
   * Sort articles by the specified order
   */
  const sortArticles = async (order: SortOrder = 'likes') => {
    isLoading.value = true
    error.value = null
    currentSort.value = order

    try {
      // Fetch like counts from Supabase
      const likeCountMap = await fetchLikeCounts()

      // Merge articles with like counts
      const articlesWithLikes: ArticleWithLikes[] = articles.map((article) => ({
        ...article,
        likeCount: likeCountMap.get(article.slug) || 0,
      }))

      // Sort based on the specified order
      if (order === 'likes') {
        sortedArticles.value = articlesWithLikes.sort((a, b) => {
          // Sort by likes (descending), then by date (newest first) as tiebreaker
          if (b.likeCount !== a.likeCount) {
            return b.likeCount - a.likeCount
          }
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
      } else {
        // Sort by date (newest first)
        sortedArticles.value = articlesWithLikes.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      }
    } catch (err) {
      console.error('Failed to sort articles:', err)
      error.value = '記事の取得に失敗しました'
      // Fallback to date sorting
      sortedArticles.value = articles.map((article) => ({
        ...article,
        likeCount: 0,
      }))
    } finally {
      isLoading.value = false
    }
  }

  // Initialize on mount with default sort (likes)
  onMounted(() => {
    sortArticles('likes')
  })

  return {
    articles: readonly(sortedArticles),
    isLoading: readonly(isLoading),
    error: readonly(error),
    currentSort: readonly(currentSort),
    sortArticles,
  }
}
