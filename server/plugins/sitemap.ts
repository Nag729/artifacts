interface SitemapImage {
  loc: string
  [key: string]: unknown
}

interface SitemapUrl {
  loc: string
  images?: SitemapImage[]
  [key: string]: unknown
}

interface SitemapContext {
  urls: SitemapUrl[]
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('sitemap:resolved', async (ctx: SitemapContext) => {
    const siteUrl = 'https://nag729.github.io'
    const baseURL = '/artifacts'

    // 各URLの画像パスに baseURL を付与
    ctx.urls = ctx.urls.map((url: SitemapUrl) => {
      if (url.images && url.images.length > 0) {
        url.images = url.images.map((img: SitemapImage) => {
          // フルURLから相対パスを抽出
          const imagePath = img.loc.replace(siteUrl, '')

          // 既に baseURL が含まれている場合はそのまま
          if (imagePath.startsWith(`${baseURL}/images/`)) {
            return img
          }

          // /images/ で始まる場合のみ baseURL を挿入
          const fixedPath = imagePath.startsWith('/images/')
            ? `${siteUrl}${baseURL}${imagePath}`
            : img.loc

          return {
            ...img,
            loc: fixedPath,
          }
        })
      }
      return url
    })
  })
})
