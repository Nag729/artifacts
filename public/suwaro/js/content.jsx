/* content — 本文要素（図版・コールアウト・チェックリスト） */

/* ===== Figure（イラスト） ===== */
const Figure = ({ src, alt, caption }) => (
  <figure className="figure">
    <img src={src} alt={alt} loading="lazy" />
    <figcaption>{caption}</figcaption>
  </figure>
)

/* ===== Callout ===== */
const Callout = ({ icon, type, children }) => (
  <div className={'callout callout--' + type}>
    <i data-lucide={icon} />
    <div>{children}</div>
  </div>
)

/* ===== CheckList ===== */
const CheckList = ({ items }) => (
  <ul className="check-list">
    {items.map((item) => (
      <li key={item}>
        <i data-lucide="check" />
        {item}
      </li>
    ))}
  </ul>
)
