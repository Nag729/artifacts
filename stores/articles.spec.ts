import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useArticlesStore } from './articles'

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

describe('useArticlesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorageMock.clear()
  })

  describe('sortArticles', () => {
    it('should fetch and sort articles by likes in descending order', async () => {
      // Given: Mock Supabase responses
      const mockLikeCounts = [
        { article_slug: 'sync-sandwich', like_count: 5 },
        { article_slug: 'kpgt-retrospective', like_count: 3 },
      ]

      const mockUserLikes = [{ article_slug: 'sync-sandwich' }]

      mockSupabase.from.mockImplementation((_table: string) => ({
        select: (_columns: string) => {
          if (_table === 'like_counts') {
            return { data: mockLikeCounts, error: null }
          } else if (_table === 'likes') {
            return {
              eq: () => ({ data: mockUserLikes, error: null }),
            }
          }
          return { data: [], error: null }
        },
      }))

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
      // Given: Mock Supabase responses
      mockSupabase.from.mockImplementation((_table: string) => ({
        select: () => {
          if (_table === 'like_counts') {
            return { data: [], error: null }
          } else if (_table === 'likes') {
            return {
              eq: () => ({ data: [], error: null }),
            }
          }
          return { data: [], error: null }
        },
      }))

      // When: Sort articles by date
      const store = useArticlesStore()
      await store.sortArticles('date')

      // Then: Articles should be sorted by date (newest first)
      expect(store.sortedArticles[0]?.date).toBe('2025-11-21')
      expect(store.currentSort).toBe('date')
    })

    it('should handle Supabase errors gracefully', async () => {
      // Given: Supabase returns an error
      const errorObj = { message: 'Database error', code: 'PGRST301' }
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({ data: null, error: errorObj }),
        }),
      }))

      // When: Sort articles
      const store = useArticlesStore()
      await store.sortArticles('likes')

      // Then: Should still return articles with 0 likes (no error message set)
      // fetchLikesData catches the error internally
      expect(store.sortedArticles.length).toBeGreaterThan(0)
      expect(store.sortedArticles.every((a) => a.likeCount === 0)).toBe(true)
      expect(store.sortedArticles.every((a) => a.hasLiked === false)).toBe(true)
    })
  })

  describe('toggleLike', () => {
    beforeEach(async () => {
      // Setup: Initialize store with mock data
      const mockLikeCounts = [{ article_slug: 'sync-sandwich', like_count: 2 }]
      const mockUserLikes: Array<{ article_slug: string }> = []

      mockSupabase.from.mockImplementation((_table: string) => ({
        select: () => {
          if (_table === 'like_counts') {
            return { data: mockLikeCounts, error: null }
          } else if (_table === 'likes') {
            return {
              eq: () => ({ data: mockUserLikes, error: null }),
            }
          }
          return { data: [], error: null }
        },
      }))

      const store = useArticlesStore()
      await store.sortArticles('likes')
    })

    it('should add a like when user has not liked', async () => {
      // Given: User hasn't liked the article
      mockSupabase.from.mockImplementation((_table: string) => ({
        insert: () => ({ error: null }),
      }))

      const store = useArticlesStore()
      const initialCount = store.sortedArticles[0]?.likeCount ?? 0

      // When: Toggle like
      const result = await store.toggleLike('sync-sandwich')

      // Then: Like count should increase
      expect(result).toBe(true)
      expect(store.sortedArticles[0]?.hasLiked).toBe(true)
      expect(store.sortedArticles[0]?.likeCount).toBe(initialCount + 1)
    })

    it('should remove a like when user has already liked', async () => {
      // Given: User has already liked the article
      const store = useArticlesStore()
      const firstArticle = store.sortedArticles[0]
      if (firstArticle) {
        firstArticle.hasLiked = true
      }

      mockSupabase.from.mockImplementation((_table: string) => ({
        delete: () => ({
          eq: () => ({
            eq: () => ({ error: null }),
          }),
        }),
      }))

      const initialCount = store.sortedArticles[0]?.likeCount ?? 0

      // When: Toggle like
      const result = await store.toggleLike('sync-sandwich')

      // Then: Like count should decrease
      expect(result).toBe(true)
      expect(store.sortedArticles[0]?.hasLiked).toBe(false)
      expect(store.sortedArticles[0]?.likeCount).toBe(Math.max(0, initialCount - 1))
    })

    it('should handle duplicate like attempts', async () => {
      // Given: Insert returns duplicate key error
      mockSupabase.from.mockImplementation(() => ({
        insert: () => ({
          error: { code: '23505', message: 'Duplicate key' },
        }),
      }))

      const store = useArticlesStore()

      // When: Toggle like
      const result = await store.toggleLike('sync-sandwich')

      // Then: Should mark as liked without incrementing count
      expect(result).toBe(true)
      expect(store.sortedArticles[0]?.hasLiked).toBe(true)
    })

    it('should return false for non-existent article', async () => {
      // Given: Article doesn't exist
      const store = useArticlesStore()

      // When: Toggle like for non-existent article
      const result = await store.toggleLike('non-existent-slug')

      // Then: Should return false
      expect(result).toBe(false)
    })
  })

  describe('getUserId', () => {
    it('should return existing user ID from localStorage', () => {
      // Given: User ID exists in localStorage
      localStorageMock.setItem('artifacts_user_id', 'existing-user-id')

      // When: Get user ID
      const store = useArticlesStore()
      const userId = store.getUserId()

      // Then: Should return existing ID
      expect(userId).toBe('existing-user-id')
    })

    it('should create and store new user ID if not exists', () => {
      // Given: No user ID in localStorage
      // When: Get user ID
      const store = useArticlesStore()
      const userId = store.getUserId()

      // Then: Should create and store new ID
      expect(userId).toBeTruthy()
      expect(localStorageMock.getItem('artifacts_user_id')).toBe(userId)
    })
  })
})
