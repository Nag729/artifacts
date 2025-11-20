# Docs Site

開発・チーム運営に関する思考や手法をまとめたドキュメントサイト 📚

## 🚀 技術スタック

- **Nuxt 4** - モダンな Vue フレームワーク
- **Nuxt Content** - Markdown ベースのコンテンツ管理
- **Tailwind CSS** - ユーティリティファーストの CSS フレームワーク
- **Tailwind Typography** - 美しいタイポグラフィ
- **GitHub Actions** - 自動デプロイ
- **GitHub Pages** - 静的サイトホスティング

## ✨ 機能

- ✅ Markdown で記事を執筆
- ✅ 記事検索機能
- ✅ タグによる分類・フィルタリング
- ✅ ダークモード対応
- ✅ レスポンシブデザイン
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

1. `content/` ディレクトリに Markdown ファイルを作成
2. frontmatter に記事情報を記述

```markdown
---
title: '記事タイトル'
description: '記事の説明'
tags: ['タグ1', 'タグ2']
date: 2025-11-20
---

# 記事本文

ここに内容を書く
```

## 📦 デプロイ

`main`ブランチへの push で自動的に GitHub Pages にデプロイされます。

## 📄 ライセンス

MIT
