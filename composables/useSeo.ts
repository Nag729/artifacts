/**
 * SEO メタタグとOGPタグを設定するコンポーザブル
 */
type WebsiteSeoOptions = {
  title: string
  description: string
  type: 'website'
  image?: string
}

type ArticleSeoOptions = {
  title: string
  description: string
  type: 'article'
  image?: string
  article: {
    publishedTime: string
    author: string
    tags: readonly string[]
    modifiedTime?: string
  }
}

export const useSeo = (options: WebsiteSeoOptions | ArticleSeoOptions) => {
  const siteUrl = 'https://nag729.github.io/artifacts'
  const siteName = 'Nag729 - artifacts'
  const defaultImage = `${siteUrl}/favicon.svg`

  const title = `${options.title} | ${siteName}`
  const description = options.description
  const image = options.image ? `${siteUrl}${options.image}` : defaultImage
  const type = options.type

  // 現在のページのURL
  const route = useRoute()
  const currentUrl = `${siteUrl}${route.path}`

  // 基本的なSEOメタタグ
  useHead({
    title: options.title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: '開発,チーム運営,エンジニアリング,ドキュメント' },
    ],
  })

  // OGPタグとTwitterカード
  const ogTags: Record<string, string> = {
    'og:site_name': siteName,
    'og:type': type,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': currentUrl,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  }

  // 記事固有のメタタグ
  if (type === 'article') {
    ogTags['article:published_time'] = options.article.publishedTime
    ogTags['article:author'] = options.article.author

    if (options.article.modifiedTime) {
      ogTags['article:modified_time'] = options.article.modifiedTime
    }
  }

  useSeoMeta(ogTags)

  // 記事タグを個別に追加
  if (type === 'article' && options.article.tags.length > 0) {
    useHead({
      meta: options.article.tags.map((tag) => ({
        property: 'article:tag',
        content: tag,
      })),
    })
  }

  // 構造化データ (JSON-LD)
  const structuredData =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: options.title,
          description,
          image,
          datePublished: options.article.publishedTime,
          dateModified: options.article.modifiedTime ?? options.article.publishedTime,
          author: {
            '@type': 'Person',
            name: options.article.author,
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/favicon.svg`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': currentUrl,
          },
          keywords: options.article.tags.join(', '),
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          description,
          url: siteUrl,
        }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData),
      },
    ],
  })
}
