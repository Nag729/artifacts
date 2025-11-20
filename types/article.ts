/**
 * 記事のメタデータ型定義
 */
export interface Article {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
}

/**
 * 記事の全情報（ルーティング用）
 */
export interface ArticleRoute extends Article {
  path: string
}
