export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('sitemap:resolved', (ctx) => {
    const siteUrl = 'https://nag729.github.io'
    const baseURL = '/artifacts'

    // 各URLの画像パスに baseURL を付与
    ctx.urls = ctx.urls.map((url) => {
      if (!url.images?.length) return url

      url.images = url.images.map((img) => {
        // フルURLから相対パスを抽出
        const loc = String(img.loc)
        const imagePath = loc.replace(siteUrl, '')

        // 既に baseURL が含まれている場合はそのまま
        if (imagePath.startsWith(`${baseURL}/images/`)) {
          return img
        }

        // /images/ で始まる場合のみ baseURL を挿入
        const fixedPath = imagePath.startsWith('/images/')
          ? `${siteUrl}${baseURL}${imagePath}`
          : loc

        return { ...img, loc: fixedPath }
      })

      return url
    })
  })
})
