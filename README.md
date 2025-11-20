# Artifacts

開発・チーム運営に関する思考や手法をまとめたドキュメントサイト 📚

## 🚀 技術スタック

- **Nuxt 4** - モダンな Vue フレームワーク
- **Vue 3** - コンポーネントベースの記事管理
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストの CSS フレームワーク
- **Tailwind Typography** - 美しいタイポグラフィ
- **GitHub Actions** - 自動デプロイ
- **GitHub Pages** - 静的サイトホスティング

## ✨ 機能

- ✅ Vue コンポーネントで記事を執筆
- ✅ TypeScript による型安全な記事管理
- ✅ タグによる分類・フィルタリング
- ✅ ダークモード対応
- ✅ レスポンシブデザイン
- ✅ Apple 風の洗練された UI（Outfit + M PLUS Rounded 1c フォント）
- ✅ SEO 最適化（meta タグ、sitemap）
- ✅ 自動デプロイ（GitHub Actions）

## 🛠️ 開発

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# 静的サイト生成
npm run generate

# プレビュー
npm run preview
```

### 記事の追加

1. `pages/` ディレクトリに Vue ファイルを作成
2. `data/articles.ts` に記事メタデータを追加
3. Vue コンポーネントを使って記事を執筆

```typescript
// data/articles.ts に追加
{
  title: '記事タイトル',
  description: '記事の説明',
  slug: 'article-slug',
  tags: ['タグ1', 'タグ2'],
  date: '2025-11-20',
}
```

```vue
<!-- pages/article-slug.vue -->
<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <h1>記事タイトル</h1>
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <!-- Vue コンポーネントを使って記事を書く -->
      <Alert type="info">重要な情報</Alert>
      <BenefitBox title="メリット">
        <ul>
          <li>メリット1</li>
          <li>メリット2</li>
        </ul>
      </BenefitBox>
    </div>
  </article>
</template>
```

## 📦 デプロイ

`main`ブランチへの push で自動的に GitHub Pages にデプロイされます。

## 📄 ライセンス

MIT
