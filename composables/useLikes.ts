interface LikeData {
  article_slug: string
  ip_address: string
  created_at?: string
}

interface ArticleLike {
  article_slug: string
  like_count: number
}

export const useLikes = (articleSlug: string) => {
  const { $supabase } = useNuxtApp()
  const likes = ref<number>(0)
  const hasLiked = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Get client IP address
  const getClientIp = async (): Promise<string> => {
    try {
      const response = await $fetch<{ ip: string }>('/api/client-ip')
      return response.ip
    } catch (err) {
      console.error('Failed to get client IP:', err)
      return '127.0.0.1'
    }
  }

  // Fetch like count for the article
  const fetchLikes = async () => {
    try {
      isLoading.value = true
      error.value = null

      const { data, error: fetchError } = await $supabase
        .from('article_likes')
        .select('like_count')
        .eq('article_slug', articleSlug)
        .single()

      if (fetchError) {
        // If no likes found, it's not an error, just return 0
        if (fetchError.code === 'PGRST116') {
          likes.value = 0
          return
        }
        throw fetchError
      }

      likes.value = (data as ArticleLike)?.like_count || 0
    } catch (err) {
      console.error('Failed to fetch likes:', err)
      error.value = 'いいね数の取得に失敗しました'
    } finally {
      isLoading.value = false
    }
  }

  // Check if current IP has already liked this article
  const checkHasLiked = async () => {
    try {
      const ip = await getClientIp()

      const { data, error: checkError } = await $supabase
        .from('likes')
        .select('id')
        .eq('article_slug', articleSlug)
        .eq('ip_address', ip)
        .single()

      if (checkError) {
        // PGRST116 means no rows found, which means hasn't liked
        if (checkError.code === 'PGRST116') {
          hasLiked.value = false
          return
        }
        throw checkError
      }

      hasLiked.value = !!data
    } catch (err) {
      console.error('Failed to check like status:', err)
      hasLiked.value = false
    }
  }

  // Add a like
  const addLike = async () => {
    if (isLoading.value) return

    try {
      isLoading.value = true
      error.value = null

      const ip = await getClientIp()

      const { error: insertError } = await $supabase.from('likes').insert({
        article_slug: articleSlug,
        ip_address: ip,
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

      const ip = await getClientIp()

      const { error: deleteError } = await $supabase
        .from('likes')
        .delete()
        .eq('article_slug', articleSlug)
        .eq('ip_address', ip)

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

  // Initialize on mount
  onMounted(() => {
    fetchLikes()
    checkHasLiked()
  })

  return {
    likes: readonly(likes),
    hasLiked: readonly(hasLiked),
    isLoading: readonly(isLoading),
    error: readonly(error),
    toggleLike,
    addLike,
    removeLike,
    refreshLikes: fetchLikes,
  }
}
