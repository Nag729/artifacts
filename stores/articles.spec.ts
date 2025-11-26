import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useArticlesStore } from './articles'
import { useLikesStore } from './likes'

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(),
}

// Mock dayjs
const mockDayjs = (date?: string) => {
  const dayjsMock = {
    valueOf: () => (date ? new Date(date).getTime() : Date.now()),
    locale: () => dayjsMock,
    format: () => date || '',
  }
  return dayjsMock
}

// Mock Nuxt composables
mockNuxtImport('useNuxtApp', () => {
  return () => ({
    $supabase: mockSupabase,
    $dayjs: mockDayjs,
  })
})

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Helper to setup likes store mock
const setupLikesStoreMock = (likeCounts: Record<string, number>, userLikes: string[]) => {
  const likesStore = useLikesStore()

  // Mock fetchAllLikeCounts
  vi.spyOn(likesStore, 'fetchAllLikeCounts').mockResolvedValue(new Map(Object.entries(likeCounts)))

  // Mock fetchUserLikes
  vi.spyOn(likesStore, 'fetchUserLikes').mockResolvedValue(new Set(userLikes))

  // Mock getLikeCount
  vi.spyOn(likesStore, 'getLikeCount').mockImplementation((slug: string) => {
    return likeCounts[slug] || 0
  })

  // Mock hasLiked
  vi.spyOn(likesStore, 'hasLiked').mockImplementation((slug: string) => {
    return userLikes.includes(slug)
  })

  return likesStore
}

describe('useArticlesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorageMock.clear()
  })

  describe('sortArticles', () => {
    it('should fetch and sort articles by likes in descending order', async () => {
      // Given: Mock likes store
      setupLikesStoreMock(
        {
          'sync-sandwich': 5,
          'kpgt-retrospective': 3,
        },
        ['sync-sandwich']
      )

      // When: Sort articles by likes
      const store = useArticlesStore()
      await store.sortArticles('likes')

      // Then: Articles should be sorted by like count (descending)
      expect(store.sortedArticles[0]?.slug).toBe('sync-sandwich')
      expect(store.sortedArticles[0]?.likeCount).toBe(5)
      expect(store.sortedArticles[0]?.hasLiked).toBe(true)

      expect(store.sortedArticles[1]?.slug).toBe('kpgt-retrospective')
      expect(store.sortedArticles[1]?.likeCount).toBe(3)
      expect(store.sortedArticles[1]?.hasLiked).toBe(false)
    })

    it('should sort articles by date when order is "date"', async () => {
      // Given: Mock likes store with no likes
      setupLikesStoreMock({}, [])

      // When: Sort articles by date
      const store = useArticlesStore()
      await store.sortArticles('date')

      // Then: Articles should be sorted by date (newest first)
      expect(store.sortedArticles[0]?.date).toBe('2025-11-21')
      expect(store.currentSort).toBe('date')
    })

    it('should handle likes store errors gracefully', async () => {
      // Given: Likes store throws an error
      const likesStore = useLikesStore()
      vi.spyOn(likesStore, 'fetchAllLikeCounts').mockRejectedValue(new Error('Database error'))
      vi.spyOn(likesStore, 'fetchUserLikes').mockRejectedValue(new Error('Database error'))
      vi.spyOn(likesStore, 'getLikeCount').mockReturnValue(0)
      vi.spyOn(likesStore, 'hasLiked').mockReturnValue(false)

      // When: Sort articles
      const store = useArticlesStore()
      await store.sortArticles('likes')

      // Then: Should still return articles with 0 likes and error message
      expect(store.sortedArticles.length).toBeGreaterThan(0)
      expect(store.sortedArticles.every((a) => a.likeCount === 0)).toBe(true)
      expect(store.sortedArticles.every((a) => a.hasLiked === false)).toBe(true)
    })
  })

  describe('toggleLike', () => {
    it('should add a like when user has not liked', async () => {
      // Given: Mock likes store and initialize articles
      const likesStore = setupLikesStoreMock({ 'sync-sandwich': 2 }, [])

      const store = useArticlesStore()
      await store.sortArticles('likes')

      const initialCount = store.sortedArticles[0]?.likeCount ?? 0

      // Mock toggleLike to succeed and update counts
      vi.spyOn(likesStore, 'toggleLike').mockResolvedValue(true)
      vi.spyOn(likesStore, 'getLikeCount').mockReturnValue(initialCount + 1)
      vi.spyOn(likesStore, 'hasLiked').mockReturnValue(true)

      // When: Toggle like
      const result = await store.toggleLike('sync-sandwich')

      // Then: Like count should increase
      expect(result).toBe(true)
      expect(store.sortedArticles[0]?.hasLiked).toBe(true)
      expect(store.sortedArticles[0]?.likeCount).toBe(initialCount + 1)
    })

    it('should remove a like when user has already liked', async () => {
      // Given: Mock likes store with user having liked the article
      const likesStore = setupLikesStoreMock({ 'sync-sandwich': 3 }, ['sync-sandwich'])

      const store = useArticlesStore()
      await store.sortArticles('likes')

      const initialCount = store.sortedArticles[0]?.likeCount ?? 0

      // Mock toggleLike to succeed and update counts
      vi.spyOn(likesStore, 'toggleLike').mockResolvedValue(true)
      vi.spyOn(likesStore, 'getLikeCount').mockReturnValue(initialCount - 1)
      vi.spyOn(likesStore, 'hasLiked').mockReturnValue(false)

      // When: Toggle like
      const result = await store.toggleLike('sync-sandwich')

      // Then: Like count should decrease
      expect(result).toBe(true)
      expect(store.sortedArticles[0]?.hasLiked).toBe(false)
      expect(store.sortedArticles[0]?.likeCount).toBe(initialCount - 1)
    })

    it('should handle toggle like failure', async () => {
      // Given: Mock likes store and toggleLike to fail
      const likesStore = setupLikesStoreMock({ 'sync-sandwich': 2 }, [])

      const store = useArticlesStore()
      await store.sortArticles('likes')

      vi.spyOn(likesStore, 'toggleLike').mockResolvedValue(false)

      // When: Toggle like
      const result = await store.toggleLike('sync-sandwich')

      // Then: Should return false and not update state
      expect(result).toBe(false)
    })

    it('should return false for non-existent article', async () => {
      // Given: Mock likes store and initialize articles
      setupLikesStoreMock({ 'sync-sandwich': 2 }, [])

      const store = useArticlesStore()
      await store.sortArticles('likes')

      // When: Toggle like for non-existent article
      const result = await store.toggleLike('non-existent-slug')

      // Then: Should return false
      expect(result).toBe(false)
    })
  })
})
