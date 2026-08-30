# CLAUDE.md

Nuxt 4 + TypeScript + Pinia のドキュメントサイト。記事は Markdown ではなく **Vue コンポーネント** で執筆する。

## 記事を追加するとき

記事は **必ず 2 箇所** に定義する。片方だけだと一覧に出ない / ページが 404 になる。

1. `pages/<slug>.vue` — 記事本体
2. `data/articles.ts` — メタデータ（`types/article.ts` の `Article` に準拠）

この分離により、記事一覧やタグ絞り込みで全記事をインポートせずメタデータだけを扱える。

記事本体の構成は既存ページ（例: `pages/sync-sandwich.vue`）をテンプレートとして踏襲する:

- `Breadcrumb` → `ArticleIcon` → `h1` → description → `ArticleDate` → `.prose` 本文
- 本文の見出しは `AnchorH2` / `AnchorH3`（アンカーリンク付き）を使う
- 本文中の装飾は `components/content/` の既存コンポーネントを優先し、新規に作らない
- `useSeo({ type: 'article', article: {...} })` を呼ぶ

## baseURL の罠

GitHub Pages 配信のため `app.baseURL` が `/artifacts/` に設定されている。ここが最も事故りやすい。

- **画像パスは直書きしない**。必ず `useAssetPath()` の `imagePath('/images/...')` を通す
- sitemap の画像 URL は `server/plugins/sitemap.ts` の `sitemap:resolved` フックで baseURL を補正している
- `composables/useSeo.ts` は `siteUrl` に `/artifacts` を含んだ絶対 URL を組み立てている

## 変更後の確認

```bash
npm run typecheck && npm run lint && npm test
```

デプロイ相当の検証が必要なら `npm run generate`（`.output/public` に出力）。

## 規約

- TypeScript strict。`any` 禁止
- 配列の型は `readonly string[]` のように readonly を活用
- 状態管理以外のロジックは `composables/`（`use` プレフィックス）、型は `types/` に集約
- Store と重要なユーティリティにはテストを書く（Vitest + `@nuxt/test-utils`、`environment: 'nuxt'`）

## デプロイ

`main` への push で GitHub Actions が `npm run generate` して GitHub Pages に配信。
公開先: https://nag729.github.io/artifacts/
