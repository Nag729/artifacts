# Artifacts

開発・チーム運営に関する思考や手法をまとめたドキュメントサイト 📚

### 📗 **<https://nag729.github.io/artifacts/>**

---

## セットアップ

Node.js 24 以上（`.nvmrc` 参照）

```bash
npm install
npm run dev
```

主要なコマンドは `package.json` の `scripts` を参照。

## 記事の追加

1. `pages/<slug>.vue` に記事本体を Vue コンポーネントで執筆
2. `data/articles.ts` にメタデータ（title / description / slug / tags / date）を登録

記事内では `components/content/` の再利用コンポーネント（`Alert`、`StepFlow`、`BeforeAfter` など）を組み合わせて構成する。

## デプロイ

`main` への push で GitHub Actions が静的サイトを生成し、GitHub Pages に自動デプロイされる。

## ライセンス

MIT
