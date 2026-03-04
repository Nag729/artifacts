import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useArticlesStore } from './articles'

describe('useArticlesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('sortedArticles', () => {
    it('should return articles sorted by date in descending order', () => {
      // Given
      const store = useArticlesStore()

      // When
      const articles = store.sortedArticles

      // Then
      expect(articles.length).toBeGreaterThan(0)

      for (let i = 0; i < articles.length - 1; i++) {
        const current = new Date(articles[i]!.date).getTime()
        const next = new Date(articles[i + 1]!.date).getTime()
        expect(current).toBeGreaterThanOrEqual(next)
      }
    })

    it('should include all articles from data', () => {
      // Given
      const store = useArticlesStore()

      // When
      const articles = store.sortedArticles

      // Then
      expect(articles.length).toBe(6)
      expect(articles.map((a) => a.slug)).toContain('passing-trunk-to-ai')
      expect(articles.map((a) => a.slug)).toContain('sync-sandwich')
    })
  })
})
