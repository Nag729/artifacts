/**
 * リトライ設定
 */
const SCROLL_CONFIG = {
  maxRetries: 5,
  baseDelay: 100,
  maxDelay: 2000,
  backoffFactor: 2,
  headerOffset: 80, // ヘッダーの高さ + 余白
} as const

/**
 * リトライロジック付きでハッシュ位置までスクロール
 */
const scrollToElementWithRetry = async (hash: string): Promise<void> => {
  for (let attempt = 0; attempt < SCROLL_CONFIG.maxRetries; attempt++) {
    // URL デコードして # を除去
    const id = decodeURIComponent(hash.replace('#', ''))
    const element = document.getElementById(id)

    if (element) {
      // 要素の絶対位置を取得（ページトップからの距離）
      const elementRect = element.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.scrollY

      // ヘッダー分を引いた最終的なスクロール位置
      const targetScrollPosition = absoluteElementTop - SCROLL_CONFIG.headerOffset

      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth',
      })
      return
    }

    const delay = Math.min(
      SCROLL_CONFIG.baseDelay * Math.pow(SCROLL_CONFIG.backoffFactor, attempt),
      SCROLL_CONFIG.maxDelay
    )
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  console.warn(
    `[useAnchorScroll] Element ${hash} not found after ${SCROLL_CONFIG.maxRetries} retries`
  )
}

/**
 * 指定した ID の要素までスクロール（外部から呼び出し可能）
 */
export const scrollToElement = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return

  const elementRect = element.getBoundingClientRect()
  const absoluteElementTop = elementRect.top + window.scrollY
  const targetScrollPosition = absoluteElementTop - SCROLL_CONFIG.headerOffset

  window.scrollTo({
    top: targetScrollPosition,
    behavior: 'smooth',
  })
}

/**
 * アンカースクロール機能のセットアップ（グローバル）
 * プラグインまたはレイアウトで一度だけ呼ぶ
 */
export const setupAnchorScroll = () => {
  onMounted(() => {
    if (window.location.hash) {
      scrollToElementWithRetry(window.location.hash)
    }
  })
}
