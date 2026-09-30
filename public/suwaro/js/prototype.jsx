/* prototype — スマホ実機モック（画面の遷移。見た目は prototype.css） */

const PHOTOS = ['images/cafe-1.jpg', 'images/cafe-2.jpg', 'images/cafe-3.jpg']

const PARTY_SIZES = [1, 2, 3, '4+']

const Prototype = () => {
  const [screen, setScreen] = React.useState('home')
  const [partySize, setPartySize] = React.useState(2)

  // 「探しています」は演出なので、少し見せたら候補の画面へ進める
  React.useEffect(() => {
    if (screen !== 'search') return
    const timer = setTimeout(() => setScreen('select'), 2500)
    return () => clearTimeout(timer)
  }, [screen])

  const screenClass = (name) => 'proto-screen screen-' + name + (screen === name ? ' active' : '')

  return (
    <div className="proto-section">
      <div className="proto-text">
        <h3>体験してみてください</h3>
        <p>
          入力するのは<strong>人数だけ</strong>
          。届いた写真（最大3枚）から気になる1枚を選ぶと、お店までの案内が始まります。
        </p>
        <p>着いたら「座れましたか？」に答えて終わり。座れなかったときは、割引クーポンが出ます。</p>
        <div className="proto-hint">
          <i data-lucide="pointer" /> 画面をタップして操作できます
        </div>
      </div>

      <div className="phone">
        <div className="phone-dynamic-island" />
        <div className="phone-screen">
          <div className="phone-status">
            <span>9:41</span>
            <div className="phone-status-icons">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.3" />
                <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.5" />
                <rect x="9" y="1" width="3" height="11" rx="1" opacity="0.7" />
                <rect x="13.5" y="0" width="3" height="12" rx="1" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 24 12" fill="currentColor">
                <rect
                  x="0"
                  y="0"
                  width="22"
                  height="12"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                />
                <rect x="23" y="3.5" width="2" height="5" rx="1" opacity="0.4" />
                <rect x="2" y="2" width="16" height="8" rx="1.5" />
              </svg>
            </div>
          </div>
          <div className="phone-home-indicator" />

          {/* Home */}
          <div className={screenClass('home')}>
            <div className="logo-mark">S</div>
            <h2>SUWARO</h2>
            <p className="tagline">座りたい場所を見つけよう</p>
            <div className="location">
              <i data-lucide="map-pin" /> 新宿駅付近
            </div>
            <button className="btn-proto" onClick={() => setScreen('count')}>
              <i data-lucide="search" /> 空席を探す
            </button>
          </div>

          {/* Count */}
          <div className={screenClass('count')}>
            <h2>何名ですか？</h2>
            <div className="count-grid">
              {PARTY_SIZES.map((n) => (
                <button
                  key={n}
                  className={'count-btn' + (partySize === n ? ' selected' : '')}
                  onClick={() => setPartySize(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <button className="btn-proto" onClick={() => setScreen('search')}>
              この人数で探す
            </button>
          </div>

          {/* Searching */}
          <div className={screenClass('search')}>
            <div className="search-pulse">
              <i data-lucide="search" />
            </div>
            <p>空いている席を探しています...</p>
            <p className="search-sub">周辺の空き状況を分析中</p>
          </div>

          {/* Select — 写真だけ・最大3件（店名/地図/評価なし） */}
          <div className={screenClass('select')}>
            <div className="select-badge">
              <i data-lucide="sparkles" /> 近くで空いてる3つ
            </div>
            <p className="select-hint">気になる雰囲気を、ひとつ選んでください</p>
            <div className="photo-stack">
              {PHOTOS.map((src, i) => (
                <button
                  key={src}
                  className="photo-card"
                  style={{ backgroundImage: `url(${src})` }}
                  onClick={() => setScreen('nav')}
                  aria-label={'候補 ' + (i + 1)}
                />
              ))}
            </div>
          </div>

          {/* Nav — 経路案内（選んだ後に店名を開示） */}
          <div className={screenClass('nav')}>
            <div className="nav-map">
              <svg className="nav-svg" viewBox="0 0 300 210" preserveAspectRatio="none">
                <path
                  className="nav-path-bg"
                  d="M38 182 C 90 182, 92 96, 152 96 S 232 44, 264 32"
                />
                <path
                  className="nav-path-fg"
                  d="M38 182 C 90 182, 92 96, 152 96 S 232 44, 264 32"
                />
              </svg>
              <div className="nav-pin nav-pin--start" />
              <div className="nav-pin nav-pin--end">
                <i data-lucide="coffee" />
              </div>
            </div>
            <div className="nav-card">
              <div className="nav-eta">
                <span className="nav-eta-num">4</span>
                <span className="nav-eta-unit">分</span>
              </div>
              <div className="nav-dest-info">
                <span className="nav-reveal-tag">
                  <i data-lucide="eye" /> 選んだので店名を開示
                </span>
                <h3>CAFÉ MORINO</h3>
                <p>
                  <i data-lucide="navigation-2" /> 280m 先・まっすぐ進んで右
                </p>
              </div>
            </div>
            <button className="btn-proto" onClick={() => setScreen('feedback')}>
              <i data-lucide="flag" /> 到着した
            </button>
          </div>

          {/* Feedback */}
          <div className={screenClass('feedback')}>
            <h2>座れましたか？</h2>
            <p className="sub">CAFÉ MORINO での結果を教えてください</p>
            <div className="feedback-btns">
              <button
                className="feedback-btn feedback-btn--yes"
                onClick={() => setScreen('success')}
              >
                ✓ 座れた
              </button>
              <button className="feedback-btn feedback-btn--no" onClick={() => setScreen('qr')}>
                ✗ 座れなかった
              </button>
            </div>
          </div>

          {/* Success */}
          <div className={screenClass('success')}>
            <div className="success-check">
              <i data-lucide="check" />
            </div>
            <h2>ありがとうございます！</h2>
            <p>このデータが次の改善に活きます</p>
            <button className="btn-proto--ghost" onClick={() => setScreen('home')}>
              ホームに戻る
            </button>
          </div>

          {/* QR Scan */}
          <div className={screenClass('qr')}>
            <h2>来店証明</h2>
            <p>
              店舗に設置された QR コードを
              <br />
              スキャンしてください
            </p>
            <div className="qr-viewfinder">
              <i data-lucide="scan" />
              <div className="qr-scanning-line" />
            </div>
            <button className="btn-proto" onClick={() => setScreen('coupon')}>
              <i data-lucide="check" /> スキャン完了
            </button>
          </div>

          {/* Coupon */}
          <div className={screenClass('coupon')}>
            <h2>申し訳ありません</h2>
            <p>お詫びにクーポンをお送りします</p>
            <div className="coupon-card">
              <i data-lucide="gift" />
              <h3>次回 100円 割引クーポン</h3>
              <p>SUWARO が次に案内するお店で使えます</p>
            </div>
            <button className="btn-proto--ghost" onClick={() => setScreen('home')}>
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
