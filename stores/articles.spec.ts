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
      // Given: Mock likes store with varying like counts
      const likeCounts: Record<string, number> = {
        'sync-sandwich': 5,
        'kpgt-retrospective': 3,
        'passing-trunk-to-ai': 10,
      }
      setupLikesStoreMock(likeCounts, ['sync-sandwich'])

      // When: Sort articles by likes
      const store = useArticlesStore()
      await store.sortArticles('likes')

      // Then: Articles should be sorted by like count (descending), then by date
      expect(store.sortedArticles.length).toBeGreaterThan(0)

      // Verify likes are in descending order (with date as tiebreaker)
      for (let i = 0; i < store.sortedArticles.length - 1; i++) {
        const current = store.sortedArticles[i]!
        const next = store.sortedArticles[i + 1]!

        if (current.likeCount === next.likeCount) {
          // Same like count: verify date order (newest first)
          const currentDate = new Date(current.date).getTime()
          const nextDate = new Date(next.date).getTime()
          expect(currentDate).toBeGreaterThanOrEqual(nextDate)
        } else {
          // Verify like count descending order
          expect(current.likeCount).toBeGreaterThan(next.likeCount)
        }
      }

      // Verify hasLiked is set correctly for liked article
      const likedArticle = store.sortedArticles.find((a) => a.slug === 'sync-sandwich')
      expect(likedArticle?.hasLiked).toBe(true)
    })

    it('should sort articles by date when order is "date"', async () => {
      // Given: Mock likes store with no likes
      setupLikesStoreMock({}, [])

      // When: Sort articles by date
      const store = useArticlesStore()
      await store.sortArticles('date')

      // Then: Articles should be sorted by date (newest first)
      expect(store.sortedArticles.length).toBeGreaterThan(0)
      expect(store.currentSort).toBe('date')

      // Verify dates are in descending order
      for (let i = 0; i < store.sortedArticles.length - 1; i++) {
        const current = new Date(store.sortedArticles[i]!.date).getTime()
        const next = new Date(store.sortedArticles[i + 1]!.date).getTime()
        expect(current).toBeGreaterThanOrEqual(next)
      }
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
      const likesStore = setupLikesStoreMock({}, [])

      const store = useArticlesStore()
      await store.sortArticles('date')

      // Use the first article dynamically
      const targetArticle = store.sortedArticles[0]
      expect(targetArticle).toBeDefined()
      const articleSlug = targetArticle!.slug
      const initialCount = targetArticle!.likeCount

      // Mock toggleLike to succeed and update counts
      vi.spyOn(likesStore, 'toggleLike').mockResolvedValue(true)
      vi.spyOn(likesStore, 'getLikeCount').mockReturnValue(initialCount + 1)
      vi.spyOn(likesStore, 'hasLiked').mockReturnValue(true)

      // When: Toggle like
      const result = await store.toggleLike(articleSlug)

      // Then: Like count should increase
      expect(result).toBe(true)
      const updatedArticle = store.sortedArticles.find((a) => a.slug === articleSlug)
      expect(updatedArticle?.hasLiked).toBe(true)
      expect(updatedArticle?.likeCount).toBe(initialCount + 1)
    })

    it('should remove a like when user has already liked', async () => {
      // Given: Mock likes store and initialize articles
      const store = useArticlesStore()
      await store.sortArticles('date')

      // Use the first article dynamically
      const targetArticle = store.sortedArticles[0]
      expect(targetArticle).toBeDefined()
      const articleSlug = targetArticle!.slug
      const initialCount = 5

      // Setup likes store with user having liked the article
      const likesStore = useLikesStore()
      vi.spyOn(likesStore, 'getLikeCount').mockReturnValue(initialCount)
      vi.spyOn(likesStore, 'hasLiked').mockReturnValue(true)

      // Update the article in store to reflect initial liked state
      targetArticle!.likeCount = initialCount
      targetArticle!.hasLiked = true

      // Mock toggleLike to succeed and update counts
      vi.spyOn(likesStore, 'toggleLike').mockResolvedValue(true)
      vi.spyOn(likesStore, 'getLikeCount').mockReturnValue(initialCount - 1)
      vi.spyOn(likesStore, 'hasLiked').mockReturnValue(false)

      // When: Toggle like
      const result = await store.toggleLike(articleSlug)

      // Then: Like count should decrease
      expect(result).toBe(true)
      const updatedArticle = store.sortedArticles.find((a) => a.slug === articleSlug)
      expect(updatedArticle?.hasLiked).toBe(false)
      expect(updatedArticle?.likeCount).toBe(initialCount - 1)
    })

    it('should handle toggle like failure', async () => {
      // Given: Mock likes store and initialize articles
      const likesStore = setupLikesStoreMock({}, [])

      const store = useArticlesStore()
      await store.sortArticles('date')

      // Use the first article dynamically
      const targetArticle = store.sortedArticles[0]
      expect(targetArticle).toBeDefined()
      const articleSlug = targetArticle!.slug

      vi.spyOn(likesStore, 'toggleLike').mockResolvedValue(false)

      // When: Toggle like
      const result = await store.toggleLike(articleSlug)

      // Then: Should return false and not update state
      expect(result).toBe(false)
    })

    it('should return false for non-existent article', async () => {
      // Given: Mock likes store and initialize articles
      setupLikesStoreMock({}, [])

      const store = useArticlesStore()
      await store.sortArticles('date')

      // When: Toggle like for non-existent article
      const result = await store.toggleLike('non-existent-slug-that-will-never-exist')

      // Then: Should return false
      expect(result).toBe(false)
    })
  })
})
