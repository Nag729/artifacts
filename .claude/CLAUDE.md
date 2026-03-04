# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Nuxt 4 + TypeScript + Pinia で構築されたドキュメントサイト。記事を Vue コンポーネントで執筆する。

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 静的サイト生成
npm run generate

# プレビュー
npm run preview

# 型チェック
npm run typecheck

# Lint
npm run lint
npm run lint:fix

# フォーマット
npm run format
npm run format:check

# テスト
npm test               # vitest
npm run test:watch     # watch モード
npm run test:coverage  # カバレッジ
```

## アーキテクチャ

### 記事管理の仕組み

記事は **2 箇所** で定義する必要がある:

1. **`pages/[slug].vue`** - 記事本体を Vue コンポーネントで執筆
2. **`data/articles.ts`** - 記事のメタデータ (title, description, slug, tags, date) を登録

この分離により、記事一覧やタグフィルタリングなどで全記事をインポートせずにメタデータだけを扱える。

### ステート管理 (Pinia)

- **`stores/articles.ts`** - 記事一覧の日付順表示

### SEO 最適化

`composables/useSeo.ts` で統一的に SEO を管理:

- OGP タグ (og:title, og:description, og:image 等)
- Twitter カード
- 構造化データ (JSON-LD) - BlogPosting または WebSite
- 記事タグを article:tag として複数出力

### Content コンポーネント

`components/content/` に記事執筆用の再利用コンポーネントを配置:

- `Alert.vue` - info/warning/error/success のアラート
- `BenefitBox.vue` / `BenefitList.vue` / `BenefitItem.vue` - メリット表示
- `Diagram.vue` - 図解用コンポーネント
- `StepFlow.vue` / `Step.vue` - ステップバイステップガイド
- `BeforeAfter.vue` / `TwoColumnCompare.vue` - Before/After 比較
- `AnchorHeading.vue` / `AnchorH2.vue` / `AnchorH3.vue` - アンカーリンク付き見出し
- `ImageWithModal.vue` - 画像モーダル表示

これらを組み合わせて記事を構成する。

## テスト

Vitest + `@nuxt/test-utils` + happy-dom を使用。

- **Store のテスト**: `stores/*.spec.ts` で Pinia Testing を活用
- **Nuxt 環境**: `vitest.config.ts` で `environment: 'nuxt'` を設定

## デプロイ

GitHub Actions で自動デプロイ。`main` ブランチへの push で静的サイト生成 (`npm run generate`) して GitHub Pages にデプロイされる。

`nuxt.config.ts` の `app.baseURL` は `/artifacts/` に設定済み。

## コーディング規約

- **TypeScript strict モード**: `any` 禁止、型安全性を最優先
- **Readonly 配列**: `tags: readonly string[]` のように readonly を活用
- **Composables**: `use` プレフィックス、状態管理以外のロジックは composables に
- **型定義**: `types/` ディレクトリに集約
- **テストカバレッジ**: Store と重要なユーティリティには必ずテストを書く
