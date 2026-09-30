/* layout — ページ全体の仕掛け（アイコン・スクロール表示）/ セクション枠 / ヒーローのムービー
   各 .jsx は Babel standalone が読み込み順にグローバルへ展開し、index.html の App から使う */

/* ===== Lucide のアイコン =====
   Lucide は React が描いた <i data-lucide> を、外から svg に差し替える。React の知らない書き換えなので、初回描画後に一度だけ呼び、
   アイコンは条件付きで出し入れしない（プロトタイプも全画面を描画しておき、class で切り替えている） */
const useLucideIcons = () => {
  React.useEffect(() => {
    lucide.createIcons()
  }, [])
}

/* ===== スクロール表示（控えめなフェードアップ） =====
   reduced-motion のときは motion.css が最初から表示させるので、ここでは分岐しない */
const useScrollReveal = () => {
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ===== Section =====
   collapsible: 本編の8分では触れず、質疑で聞かれたときだけ開く付録に使う */
const Section = ({ id, icon, label, title, alt, wide, collapsible, children }) => (
  <section className={'section' + (alt ? ' section--alt' : '')} id={id}>
    <div className={(wide ? 'section-wide' : 'section-inner') + ' reveal'}>
      <div className="section-label">
        <i data-lucide={icon} /> {label}
      </div>
      {collapsible ? (
        <details className="section-fold">
          <summary>
            <h2>
              {title}
              <i data-lucide="chevron-down" />
            </h2>
          </summary>
          <div className="section-fold-body">{children}</div>
        </details>
      ) : (
        <>
          <h2>{title}</h2>
          {children}
        </>
      )}
    </div>
  </section>
)

/* ===== ConceptMovieButton（コンセプトムービーを全画面で流す） =====
   ページ内に動画を置くとヒーローや本文の流れが途切れるので、動画は隠しておき、押したときだけ全画面で再生する */
const ConceptMovieButton = () => {
  const videoRef = React.useRef(null)

  React.useEffect(() => {
    const video = videoRef.current
    const rewindOnExit = () => {
      if (document.fullscreenElement === video) return
      video.pause()
      video.currentTime = 0
    }
    const exitOnEnd = () => {
      if (document.fullscreenElement === video) document.exitFullscreen()
    }
    document.addEventListener('fullscreenchange', rewindOnExit)
    video.addEventListener('ended', exitOnEnd)
    return () => {
      document.removeEventListener('fullscreenchange', rewindOnExit)
      video.removeEventListener('ended', exitOnEnd)
    }
  }, [])

  const play = () => {
    const video = videoRef.current
    // iOS Safari は要素の全画面 API を持たず、動画専用の webkitEnterFullscreen だけがある
    if (video.requestFullscreen) video.requestFullscreen()
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen()
    video.play()
  }

  return (
    <>
      <button type="button" className="hero-movie" onClick={play}>
        <i data-lucide="play" /> コンセプトムービー
      </button>
      <video
        ref={videoRef}
        className="hero-movie-video"
        src="videos/intro.mp4"
        controls
        preload="metadata"
      />
    </>
  )
}
