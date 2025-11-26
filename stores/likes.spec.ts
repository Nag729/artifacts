import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useLikesStore } from './likes'

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(),
}

// Mock Nuxt composables
mockNuxtImport('useNuxtApp', () => {
  return () => ({
    $supabase: mockSupabase,
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

describe('useLikesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorageMock.clear()
  })

  describe('fetchLikeCount', () => {
    it('should fetch and cache like count for an article', async () => {
      // Given: Supabase returns like count
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            maybeSingle: () => ({
              data: { like_count: 5 },
              error: null,
            }),
          }),
        }),
      }))

      // When: Fetch like count
      const store = useLikesStore()
      const count = await store.fetchLikeCount('test-article')

      // Then: Should return and cache the count
      expect(count).toBe(5)
      expect(store.getLikeCount('test-article')).toBe(5)
    })

    it('should return 0 when article has no likes', async () => {
      // Given: Supabase returns null
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            maybeSingle: () => ({
              data: null,
              error: null,
            }),
          }),
        }),
      }))

      // When: Fetch like count
      const store = useLikesStore()
      const count = await store.fetchLikeCount('new-article')

      // Then: Should return 0
      expect(count).toBe(0)
    })

    it('should handle Supabase errors', async () => {
      // Given: Supabase returns error
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            maybeSingle: () => ({
              data: null,
              error: { message: 'Database error' },
            }),
          }),
        }),
      }))

      // When: Fetch like count
      const store = useLikesStore()
      const count = await store.fetchLikeCount('error-article')

      // Then: Should return 0
      expect(count).toBe(0)
    })
  })

  describe('fetchAllLikeCounts', () => {
    it('should fetch and cache all like counts', async () => {
      // Given: Supabase returns multiple like counts
      const mockData = [
        { article_slug: 'article-1', like_count: 5 },
        { article_slug: 'article-2', like_count: 3 },
      ]

      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          data: mockData,
          error: null,
        }),
      }))

      // When: Fetch all like counts
      const store = useLikesStore()
      const counts = await store.fetchAllLikeCounts()

      // Then: Should return and cache all counts
      expect(counts.get('article-1')).toBe(5)
      expect(counts.get('article-2')).toBe(3)
      expect(store.getLikeCount('article-1')).toBe(5)
      expect(store.getLikeCount('article-2')).toBe(3)
    })

    it('should handle empty result', async () => {
      // Given: Supabase returns empty array
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          data: [],
          error: null,
        }),
      }))

      // When: Fetch all like counts
      const store = useLikesStore()
      const counts = await store.fetchAllLikeCounts()

      // Then: Should return empty map
      expect(counts.size).toBe(0)
    })
  })

  describe('checkHasLiked', () => {
    it('should return true when user has liked the article', async () => {
      // Given: User has liked the article
      localStorageMock.setItem('artifacts_user_id', 'test-user')
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: () => ({
                data: { id: 1 },
                error: null,
              }),
            }),
          }),
        }),
      }))

      // When: Check has liked
      const store = useLikesStore()
      const hasLiked = await store.checkHasLiked('test-article')

      // Then: Should return true
      expect(hasLiked).toBe(true)
      expect(store.hasLiked('test-article')).toBe(true)
    })

    it('should return false when user has not liked the article', async () => {
      // Given: User has not liked the article
      localStorageMock.setItem('artifacts_user_id', 'test-user')
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: () => ({
                data: null,
                error: null,
              }),
            }),
          }),
        }),
      }))

      // When: Check has liked
      const store = useLikesStore()
      const hasLiked = await store.checkHasLiked('test-article')

      // Then: Should return false
      expect(hasLiked).toBe(false)
      expect(store.hasLiked('test-article')).toBe(false)
    })
  })

  describe('fetchUserLikes', () => {
    it('should fetch all articles liked by user', async () => {
      // Given: User has liked multiple articles
      localStorageMock.setItem('artifacts_user_id', 'test-user')
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            data: [{ article_slug: 'article-1' }, { article_slug: 'article-2' }],
            error: null,
          }),
        }),
      }))

      // When: Fetch user likes
      const store = useLikesStore()
      const liked = await store.fetchUserLikes()

      // Then: Should cache liked articles
      expect(liked.has('article-1')).toBe(true)
      expect(liked.has('article-2')).toBe(true)
      expect(store.hasLiked('article-1')).toBe(true)
      expect(store.hasLiked('article-2')).toBe(true)
    })

    it('should handle empty result', async () => {
      // Given: User has not liked any articles
      localStorageMock.setItem('artifacts_user_id', 'test-user')
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            data: [],
            error: null,
          }),
        }),
      }))

      // When: Fetch user likes
      const store = useLikesStore()
      const liked = await store.fetchUserLikes()

      // Then: Should return empty set
      expect(liked.size).toBe(0)
    })
  })

  describe('toggleLike', () => {
    beforeEach(() => {
      localStorageMock.setItem('artifacts_user_id', 'test-user')
    })

    it('should add like when not liked', async () => {
      // Given: User hasn't liked the article
      mockSupabase.from.mockImplementation(() => ({
        insert: () => ({
          error: null,
        }),
      }))

      // When: Toggle like
      const store = useLikesStore()
      const result = await store.toggleLike('test-article')

      // Then: Should add like
      expect(result).toBe(true)
      expect(store.hasLiked('test-article')).toBe(true)
    })

    it('should remove like when already liked', async () => {
      // Given: User has liked the article
      // First add a like
      mockSupabase.from.mockImplementation(() => ({
        insert: () => ({
          error: null,
        }),
      }))

      const store = useLikesStore()
      await store.toggleLike('test-article')

      // Now setup delete mock
      mockSupabase.from.mockImplementation(() => ({
        delete: () => ({
          eq: () => ({
            eq: () => ({
              error: null,
            }),
          }),
        }),
      }))

      // When: Toggle like
      const result = await store.toggleLike('test-article')

      // Then: Should remove like
      expect(result).toBe(true)
      expect(store.hasLiked('test-article')).toBe(false)
    })
  })

  describe('getLikeCount', () => {
    it('should return cached like count', async () => {
      // Given: Like count is cached via fetch
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            maybeSingle: () => ({
              data: { like_count: 10 },
              error: null,
            }),
          }),
        }),
      }))

      const store = useLikesStore()
      await store.fetchLikeCount('test-article')

      // When: Get like count
      const count = store.getLikeCount('test-article')

      // Then: Should return cached value
      expect(count).toBe(10)
    })

    it('should return 0 for unknown article', () => {
      // Given: Article not in cache
      const store = useLikesStore()

      // When: Get like count
      const count = store.getLikeCount('unknown-article')

      // Then: Should return 0
      expect(count).toBe(0)
    })
  })

  describe('hasLiked', () => {
    it('should return true when user has liked', async () => {
      // Given: User has liked the article
      localStorageMock.setItem('artifacts_user_id', 'test-user')

      // Add a like first
      mockSupabase.from.mockImplementation(() => ({
        insert: () => ({
          error: null,
        }),
      }))

      const store = useLikesStore()
      await store.toggleLike('test-article')

      // When: Check has liked
      const result = store.hasLiked('test-article')

      // Then: Should return true
      expect(result).toBe(true)
    })

    it('should return false when user has not liked', () => {
      // Given: User has not liked the article
      const store = useLikesStore()

      // When: Check has liked
      const result = store.hasLiked('unknown-article')

      // Then: Should return false
      expect(result).toBe(false)
    })
  })
})
