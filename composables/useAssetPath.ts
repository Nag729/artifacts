/**
 * baseURL を考慮したアセットパスを生成する
 * GitHub Pages など baseURL が設定されている環境で正しいパスを返す
 */
export const useAssetPath = () => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL ?? '/'

  /**
   * 画像パスを baseURL 付きで返す
   * @param path - /images/... 形式のパス
   * @returns baseURL を含む完全なパス
   */
  const imagePath = (path: string): string => {
    // 既に baseURL が含まれている場合はそのまま返す
    if (path.startsWith(baseURL)) {
      return path
    }

    // 先頭の / を除去して baseURL と結合
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path
    const normalizedBase = baseURL.endsWith('/') ? baseURL : `${baseURL}/`

    return `${normalizedBase}${normalizedPath}`
  }

  return {
    imagePath,
    baseURL,
  }
}
