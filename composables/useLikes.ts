interface LikeData {
  article_slug: string
  user_id: string
  created_at?: string
}

export const useLikes = (articleSlug: string) => {
  const { $supabase } = useNuxtApp()
  const likes = ref<number>(0)
  const hasLiked = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Get or create user ID from localStorage
  const getUserId = (): string => {
    if (import.meta.client) {
      const stored = localStorage.getItem('artifacts_user_id')
      if (stored) {
        return stored
      }

      // Generate new UUID and store it
      const newId = crypto.randomUUID()
      localStorage.setItem('artifacts_user_id', newId)
      return newId
    }

    // Fallback for SSR (won't be used in practice)
    return 'ssr-fallback'
  }

  // Fetch like count for the article by counting rows
  const fetchLikes = async (): Promise<number> => {
    try {
      const { count, error: fetchError } = await $supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('article_slug', articleSlug)

      if (fetchError) {
        throw fetchError
      }

      return count || 0
    } catch (err) {
      console.error('Failed to fetch likes:', err)
      throw err
    }
  }

  // Check if current user has already liked this article
  const checkHasLiked = async (): Promise<boolean> => {
    try {
      const userId = getUserId()

      const { data, error: checkError } = await $supabase
        .from('likes')
        .select('id')
        .eq('article_slug', articleSlug)
        .eq('user_id', userId)
        .maybeSingle()

      if (checkError) {
        // PGRST116 means no rows found, which means hasn't liked
        if (checkError.code === 'PGRST116') {
          return false
        }
        throw checkError
      }

      return !!data
    } catch (err) {
      console.error('Failed to check like status:', err)
      throw err
    }
  }

  // Add a like
  const addLike = async () => {
    if (isLoading.value) return

    try {
      isLoading.value = true
      error.value = null

      const userId = getUserId()

      const { error: insertError } = await $supabase.from('likes').insert({
        article_slug: articleSlug,
        user_id: userId,
      } as LikeData)

      if (insertError) {
        // Check if it's a duplicate key error (already liked)
        if (insertError.code === '23505') {
          hasLiked.value = true
          error.value = 'すでにいいね済みです'
          return
        }
        throw insertError
      }

      hasLiked.value = true
      likes.value += 1
    } catch (err) {
      console.error('Failed to add like:', err)
      error.value = 'いいねの追加に失敗しました'
    } finally {
      isLoading.value = false
    }
  }

  // Remove a like
  const removeLike = async () => {
    if (isLoading.value) return

    try {
      isLoading.value = true
      error.value = null

      const userId = getUserId()

      const { error: deleteError } = await $supabase
        .from('likes')
        .delete()
        .eq('article_slug', articleSlug)
        .eq('user_id', userId)

      if (deleteError) {
        throw deleteError
      }

      hasLiked.value = false
      likes.value = Math.max(0, likes.value - 1)
    } catch (err) {
      console.error('Failed to remove like:', err)
      error.value = 'いいねの削除に失敗しました'
    } finally {
      isLoading.value = false
    }
  }

  // Toggle like
  const toggleLike = async () => {
    if (hasLiked.value) {
      await removeLike()
    } else {
      await addLike()
    }
  }

  // Refresh likes data
  const refreshLikes = async () => {
    try {
      isLoading.value = true
      error.value = null

      // 両方の通信が終わってからまとめてUIを更新
      const [likeCount, liked] = await Promise.all([fetchLikes(), checkHasLiked()])

      likes.value = likeCount
      hasLiked.value = liked
    } catch (err) {
      console.error('Failed to refresh likes:', err)
      error.value = 'いいね情報の取得に失敗しました'
    } finally {
      isLoading.value = false
    }
  }

  // Initialize asynchronously (non-blocking)
  onMounted(() => {
    refreshLikes()
  })

  return {
    likes: readonly(likes),
    hasLiked: readonly(hasLiked),
    isLoading: readonly(isLoading),
    error: readonly(error),
    toggleLike,
    addLike,
    removeLike,
    refreshLikes,
  }
}
