import type { Article } from '~/types/article'

/**
 * 全記事のメタデータ
 */
export const articles: Article[] = [
  {
    slug: 'kpgt-retrospective',
    title: 'KPGTふりかえり手法の提案',
    description: '従来のKPTふりかえりの課題を解決する新しいアプローチ',
    tags: ['ふりかえり', 'KPT'],
    date: '2025-11-20',
  },
  {
    slug: 'problem-evaluation-guide',
    title: '「それ、本当に困ってる？」を見極める3点セット',
    description: 'ふりかえりで出てくる問題が本当に対処すべきものなのかを判断する3つの観点',
    tags: ['問題分析', 'ふりかえり'],
    date: '2025-11-20',
  },
  {
    slug: 'ai-first-development-convergence',
    title: '生成AIファーストなソフトウェア開発の収束状態',
    description: 'AIの能力が成熟し、枠組みが整ったとき、開発はどう変わるか',
    tags: ['生成AI', '思考実験', '開発プロセス'],
    date: '2025-11-20',
  },
]

/**
 * 全タグの一覧を取得
 */
export const getAllTags = (): string[] => {
  const tagSet = new Set<string>()
  articles.forEach((article) => {
    article.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

/**
 * スラグから記事を取得
 */
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((article) => article.slug === slug)
}

/**
 * タグで記事をフィルタリング
 */
export const getArticlesByTag = (tag: string): Article[] => {
  return articles.filter((article) => article.tags.includes(tag))
}

/**
 * 日付順（新しい順）に記事を取得
 */
export const getArticlesSortedByDate = (): Article[] => {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
