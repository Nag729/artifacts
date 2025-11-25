import type { Article } from '~/types/article'
import dayjs from 'dayjs'

/**
 * 全記事のメタデータ
 */
export const articles: Article[] = [
  {
    slug: 'libertarian-paternalism-in-software',
    title: 'ソフトウェア設計にリバタリアンパターナリズムを持ち込む',
    description: 'ユーザーの自由を尊重しながら、より良い行動へ導くUX設計の考え方',
    tags: ['UX設計', '行動経済学', 'プロダクトデザイン'],
    date: '2025-11-21',
  },
  {
    slug: 'sync-sandwich',
    title: '同期サンドイッチ - 同期時間を最大活用するミーティングの進め方',
    description:
      '分散チームで重要な作成物を完成させたり重要な判断を下したりする必要がある場合のミーティング構成',
    tags: ['ミーティング', 'コミュニケーション'],
    date: '2025-11-21',
  },
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
 * 記事数の多い順にソート
 */
export const getAllTags = (): string[] => {
  const tagSet = new Set<string>()
  articles.forEach((article) => {
    article.tags.forEach((tag) => tagSet.add(tag))
  })

  // 各タグの記事数をカウント
  const tagCounts = new Map<string, number>()
  Array.from(tagSet).forEach((tag) => {
    const count = articles.filter((article) => article.tags.includes(tag)).length
    tagCounts.set(tag, count)
  })

  // 記事数の多い順にソート(同数の場合はアルファベット順)
  return Array.from(tagSet).sort((a, b) => {
    const countDiff = (tagCounts.get(b) ?? 0) - (tagCounts.get(a) ?? 0)
    if (countDiff !== 0) return countDiff
    return a.localeCompare(b)
  })
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
  return [...articles].sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
}
