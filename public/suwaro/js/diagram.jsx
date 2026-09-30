/* diagram — 図解コンポーネント（原則カード・強調ボックス・循環図・ビジネスモデル図・ポジショニング・採算・市場規模） */

/* ===== Principles（番号付きカード） ===== */
const Principles = ({ items }) => (
  <div className="principles">
    {items.map((p, i) => (
      <div className="principle" key={p.title}>
        <div className="principle-num">{i + 1}</div>
        <h4>{p.title}</h4>
        <p>{p.desc}</p>
      </div>
    ))}
  </div>
)

/* ===== InsightBox ===== */
const InsightBox = ({ icon, children }) => (
  <div className="insight-box">
    <i data-lucide={icon} className="insight-box-icon" />
    <p>{children}</p>
  </div>
)

/* ===== CycleDiagram（悪循環 / 好循環）縦フロー＋戻り線 ===== */
const CycleDiagram = ({ steps, loop, tone }) => (
  <div className={'cycle cycle--' + tone}>
    <div className="cycle-track">
      <div className="cycle-rail" />
      <div className="cycle-list">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className="cycle-node">{s}</div>
            {i < steps.length - 1 && (
              <div className="cycle-down">
                <i data-lucide="chevron-down" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
    <div className="cycle-caption">
      <i data-lucide={tone === 'good' ? 'rotate-cw' : 'rotate-ccw'} />
      {loop}
    </div>
  </div>
)

/* ===== BizDiagram（VACAN × 施設・店舗） =====
   上段は VACAN → 施設・店舗への提供価値、下段は逆向きの対価。SUWARO で増える分を hl で示す。 */
const BizDiagram = () => (
  <div className="biz">
    <div className="biz-side">
      <div className="biz-ic">V</div>
      <span>VACAN</span>
    </div>
    <div className="biz-arrows">
      <div className="biz-flow">
        <span className="biz-flow-title">提供価値 →</span>
        <div className="biz-arrow to-right">
          <span className="lbl">混雑を見える化（従来）</span>
        </div>
        <div className="biz-arrow to-right hl">
          <span className="lbl">空席に送客（SUWARO で追加）</span>
        </div>
      </div>
      <div className="biz-flow biz-flow--pay">
        <span className="biz-flow-title">← 対価</span>
        <div className="biz-arrow to-left">
          <span className="lbl">月額 SaaS（従来）</span>
        </div>
        <div className="biz-arrow to-left hl">
          <span className="lbl">送客の成果報酬（SUWARO で追加）</span>
        </div>
      </div>
    </div>
    <div className="biz-side">
      <div className="biz-ic">☕</div>
      <span>施設・店舗</span>
    </div>
  </div>
)

/* ===== PositionMap（競合ポジショニング 2軸） =====
   kind: self は VACAN の既存サービス、target は SUWARO が取りに行く象限 */
const QUADRANTS = [
  { axis: '店が目的 × 表示', players: ['食べログ / Google Maps'] },
  { axis: '店が目的 × 割り当て', players: ['予約サービス（食べログ / ホットペッパー）'] },
  {
    axis: '席が目的 × 表示',
    players: ['VACAN Maps / Pages', 'いいオフィス / BizSPOT'],
    kind: 'self',
  },
  { axis: '席が目的 × 割り当て', players: ['SUWARO'], kind: 'target' },
]

const PositionMap = () => (
  <div className="posmap">
    <div className="posmap-yaxis">
      <span>店が目的</span>
      <i data-lucide="arrow-down" />
      <span>席が目的</span>
    </div>
    <div className="posmap-main">
      <div className="posmap-quads">
        {QUADRANTS.map((q) => (
          <div className={'posmap-quad' + (q.kind ? ' posmap-quad--' + q.kind : '')} key={q.axis}>
            <h4>{q.axis}</h4>
            {q.players.map((name) => (
              <span className="posmap-player" key={name}>
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="posmap-xaxis">
        <span>表示（全員に同じ情報）</span>
        <i data-lucide="arrow-right" />
        <span>割り当て（人ごとに違う席）</span>
      </div>
    </div>
  </div>
)

/* ===== ProfitLine（成功率と1送客あたりの粗利） =====
   数直線の左端を50%、右端を100%に取る。採算ラインを境に損益が反転し、目標までの差が事業側の余裕になる。 */
const RATE_MIN = 50
const RATE_MAX = 100
const BREAK_EVEN_RATE = 67
const GOAL_RATE = 80
const ratePos = (rate) => ((rate - RATE_MIN) / (RATE_MAX - RATE_MIN)) * 100

const PROFIT_MARKS = [
  { rate: BREAK_EVEN_RATE, profit: '±0円', note: '採算ライン', kind: 'even' },
  { rate: GOAL_RATE, profit: '+20円', note: '目標', kind: 'goal' },
  { rate: 90, profit: '+35円', note: '学習が進んだ状態', kind: 'good' },
]

const ProfitLine = () => (
  <div className="pline-scroll">
    <div className="pline">
      <div
        className="pline-gap"
        style={{
          left: ratePos(BREAK_EVEN_RATE) + '%',
          width: ratePos(GOAL_RATE) - ratePos(BREAK_EVEN_RATE) + '%',
        }}
      >
        <span>{GOAL_RATE - BREAK_EVEN_RATE}ポイントの余裕</span>
      </div>
      <div className="pline-track">
        <div
          className="pline-zone pline-zone--loss"
          style={{ width: ratePos(BREAK_EVEN_RATE) + '%' }}
        >
          赤字
        </div>
        <div className="pline-zone pline-zone--gain">黒字</div>
      </div>
      {PROFIT_MARKS.map((m) => (
        <div
          className={'pline-mark pline-mark--' + m.kind}
          style={{ left: ratePos(m.rate) + '%' }}
          key={m.rate}
        >
          <span className="pline-profit">{m.profit}</span>
          <span className="pline-rate">{m.rate}%</span>
          <span className="pline-note">{m.note}</span>
        </div>
      ))}
      <div className="pline-ends">
        <span>成功率 {RATE_MIN}%</span>
        <span>{RATE_MAX}%</span>
      </div>
    </div>
  </div>
)

/* ===== MarketScope（TAM / SAM / SOM） =====
   円は包含関係を示すためのもので、面積比は金額に比例していない。 */
const MARKET = [
  {
    key: 'TAM',
    amount: '約131億円',
    target: '全国の喫茶店・ハンバーガー店・ファミレス・コワーキング',
    count: '約73,000店',
  },
  {
    key: 'SAM',
    amount: '約27億円',
    target: '駅ナカ・駅周辺・商業施設など都市部',
    count: '約15,000店',
  },
  { key: 'SOM', amount: '約5.4億円', target: '5年で到達する', count: '3,000店' },
]

const MarketScope = () => (
  <div className="scope">
    <div className="scope-circles">
      {MARKET.map((m) => (
        <div className={'scope-circle scope-circle--' + m.key.toLowerCase()} key={m.key}>
          <span className="scope-key">{m.key}</span>
          <span className="scope-amount">{m.amount}</span>
        </div>
      ))}
    </div>
    <ul className="scope-legend">
      {MARKET.map((m) => (
        <li key={m.key}>
          <span className={'scope-dot scope-dot--' + m.key.toLowerCase()} />
          <div>
            <h4>{m.key}</h4>
            <p>
              {m.target}
              <strong>{m.count}</strong>
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)
