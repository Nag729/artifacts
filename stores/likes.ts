import { defineStore } from 'pinia'

interface LikeData {
  article_slug: string
  user_id: string
  created_at?: string
}

export const useLikesStore = defineStore('likes', () => {
  const { $supabase } = useNuxtApp()

  // State: いいね数のキャッシュ (slug -> count)
  const likeCounts = ref<Map<string, number>>(new Map())

  // State: 自分がいいねした記事のSet
  const likedArticles = ref<Set<string>>(new Set())

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
   * Fetch like count for a specific article
   */
  const fetchLikeCount = async (articleSlug: string): Promise<number> => {
    try {
      const { data, error } = await $supabase
        .from('like_counts')
        .select('like_count')
        .eq('article_slug', articleSlug)
        .maybeSingle()

      if (error) throw error

      const count = data?.like_count || 0
      likeCounts.value.set(articleSlug, count)
      return count
    } catch (err) {
      console.error('Failed to fetch like count:', err)
      return 0
    }
  }

  /**
   * Fetch all like counts (for article list)
   */
  const fetchAllLikeCounts = async (): Promise<Map<string, number>> => {
    try {
      const { data, error } = await $supabase.from('like_counts').select('article_slug, like_count')

      if (error) throw error

      const counts = new Map<string, number>()
      if (data) {
        data.forEach((item: { article_slug: string; like_count: number }) => {
          counts.set(item.article_slug, item.like_count)
        })
      }

      likeCounts.value = counts
      return counts
    } catch (err) {
      console.error('Failed to fetch all like counts:', err)
      return new Map()
    }
  }

  /**
   * Check if current user has liked a specific article
   */
  const checkHasLiked = async (articleSlug: string): Promise<boolean> => {
    try {
      const userId = getUserId()

      const { data, error } = await $supabase
        .from('likes')
        .select('id')
        .eq('article_slug', articleSlug)
        .eq('user_id', userId)
        .maybeSingle()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      const hasLiked = !!data
      if (hasLiked) {
        likedArticles.value.add(articleSlug)
      } else {
        likedArticles.value.delete(articleSlug)
      }

      return hasLiked
    } catch (err) {
      console.error('Failed to check like status:', err)
      return false
    }
  }

  /**
   * Fetch all articles liked by current user
   */
  const fetchUserLikes = async (): Promise<Set<string>> => {
    try {
      const userId = getUserId()

      const { data, error } = await $supabase
        .from('likes')
        .select('article_slug')
        .eq('user_id', userId)

      if (error) throw error

      const liked = new Set<string>()
      if (data) {
        data.forEach((item: { article_slug: string }) => {
          liked.add(item.article_slug)
        })
      }

      likedArticles.value = liked
      return liked
    } catch (err) {
      console.error('Failed to fetch user likes:', err)
      return new Set()
    }
  }

  /**
   * Add a like to an article
   */
  const addLike = async (articleSlug: string): Promise<boolean> => {
    try {
      const userId = getUserId()

      const { error } = await $supabase.from('likes').insert({
        article_slug: articleSlug,
        user_id: userId,
      } as LikeData)

      if (error) {
        // Duplicate key error - already liked
        if (error.code === '23505') {
          likedArticles.value.add(articleSlug)
          return true
        }
        throw error
      }

      // Update state
      likedArticles.value.add(articleSlug)
      const currentCount = likeCounts.value.get(articleSlug) || 0
      likeCounts.value.set(articleSlug, currentCount + 1)

      return true
    } catch (err) {
      console.error('Failed to add like:', err)
      return false
    }
  }

  /**
   * Remove a like from an article
   */
  const removeLike = async (articleSlug: string): Promise<boolean> => {
    try {
      const userId = getUserId()

      const { error } = await $supabase
        .from('likes')
        .delete()
        .eq('article_slug', articleSlug)
        .eq('user_id', userId)

      if (error) throw error

      // Update state
      likedArticles.value.delete(articleSlug)
      const currentCount = likeCounts.value.get(articleSlug) || 0
      likeCounts.value.set(articleSlug, Math.max(0, currentCount - 1))

      return true
    } catch (err) {
      console.error('Failed to remove like:', err)
      return false
    }
  }

  /**
   * Toggle like for an article
   */
  const toggleLike = async (articleSlug: string): Promise<boolean> => {
    const hasLiked = likedArticles.value.has(articleSlug)

    if (hasLiked) {
      return await removeLike(articleSlug)
    } else {
      return await addLike(articleSlug)
    }
  }

  /**
   * Get like count for an article (from cache or fetch)
   */
  const getLikeCount = (articleSlug: string): number => {
    return likeCounts.value.get(articleSlug) || 0
  }

  /**
   * Check if user has liked an article (from cache)
   */
  const hasLiked = (articleSlug: string): boolean => {
    return likedArticles.value.has(articleSlug)
  }

  return {
    // State
    likeCounts: readonly(likeCounts),
    likedArticles: readonly(likedArticles),

    // Getters
    getLikeCount,
    hasLiked,

    // Actions
    fetchLikeCount,
    fetchAllLikeCounts,
    checkHasLiked,
    fetchUserLikes,
    addLike,
    removeLike,
    toggleLike,
    getUserId,
  }
})
