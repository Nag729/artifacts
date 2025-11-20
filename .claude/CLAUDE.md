# Artifacts ドキュメントサイト 実装ガイド

このプロジェクトは Nuxt Content を使った技術ドキュメントサイトです。

## 📁 プロジェクト構造

```
artifacts/
├── components/
│   ├── content/          # MDC (Markdown Components)
│   │   ├── Alert.vue
│   │   ├── BeforeAfter.vue
│   │   ├── BenefitItem.vue
│   │   ├── BenefitList.vue
│   │   ├── CheckItem.vue
│   │   ├── CheckList.vue
│   │   ├── Diagram.vue
│   │   ├── InfoCard.vue
│   │   ├── KeyPoints.vue
│   │   ├── Step.vue
│   │   └── StepFlow.vue
│   ├── AppHeader.vue
│   ├── ArticleCard.vue
│   └── ColorModeToggle.vue
├── content/              # Markdown 記事
├── pages/                # Nuxt ページ
└── assets/css/           # グローバルスタイル
```

## 🎨 デザインシステム

### カラーパレット

- **Primary**: Blue (blue-500, blue-600)
- **Success**: Green (green-500, emerald-600)
- **Warning**: Yellow (yellow-500, amber-600)
- **Danger**: Red (red-500, red-600)
- **Info**: Purple (purple-500, indigo-600)

### デザイン原則

1. **Apple 風の洗練されたデザイン**: 柔らかいグラデーション、適度な余白、微妙な影
2. **ダークモード対応**: すべてのコンポーネントで dark: クラスを使用
3. **アニメーション**: hover 時の微妙なトランジション（scale, shadow）
4. **アイコン**: `@nuxt/icon` (Iconify) を使用、MDI アイコンセット推奨

## 📝 コンポーネント一覧

### 1. **Alert** - 注意書き・ヒント

**用途**: 重要な情報、警告、成功メッセージ、補足情報を表示

**使い方**:

```markdown
::alert{type="success"}
✍️ **Problem が出たらこの 3 点で説明してみる**
::

::alert{type="warning"}
注意事項をここに書く
::

::alert{type="info"}
追加情報
::

::alert{type="danger"}
危険な操作の警告
::
```

**Props**:

- `type`: `"info" | "success" | "warning" | "danger"` (default: "info")

---

### 2. **InfoCard** - 情報カード

**用途**: 重要な概念やフレームワークを目立たせる

**使い方**:

```markdown
::info-card{title="3点セット" icon="mdi:format-list-checks"}
問題を評価するための 3 つの観点：

### 🧑 誰が

- ユーザー
- 開発者

### ⏰ どんなときに

- 機能を使う
- 実装する
  ::
```

**特徴**:

- リスト項目（`<li>`）が自動でバッジ風になる
- グラデーション背景 + ぼかし装飾
- アイコン付きヘッダー

**Props**:

- `title`: カードタイトル
- `icon`: Iconify のアイコン名（例: `"mdi:lightbulb"`）

---

### 3. **BeforeAfter** - Before/After 比較

**用途**: 改善前後の比較、曖昧な表現と明確な表現の対比

**使い方**:

```markdown
::before-after
#before
「問い合わせ対応が手作業で面倒」

#after
「**ユーザーが**、問い合わせ後に、**回答まで平均 3 日待っている**（**月 50 件**）」
::
```

**Props**:

- `beforeTitle`: Before 側のタイトル (default: "Before（曖昧）")
- `afterTitle`: After 側のタイトル (default: "After（明確）")

---

### 4. **StepFlow & Step** - ステップバイステップのフロー

**用途**: 手順、プロセス、タイムラインを視覚化

**使い方**:

```markdown
::step-flow
::step{number="1" title="できごとを思い出す" duration="10分"}
これまで通り、期間中の出来事を振り返る。
::

::step{number="2" title="Keep, Problem を出す" duration="10分"}

- **Keep**: うまくいったこと
- **Problem**: うまくいかなかったこと
  ::
  ::
```

**Step Props**:

- `number`: ステップ番号（数字 or 文字列）
- `title`: ステップタイトル
- `duration`: 所要時間（オプション）

---

### 5. **CheckList & CheckItem** - チェックリスト

**用途**: 良い例・悪い例、チェック項目の列挙

**使い方**:

```markdown
::check-list
::check-item{type="good" label="測定可能"}
状態を確認できる
::

::check-item{type="good" label="具体的"}
Try とのつながりがイメージできる
::

::check-item{type="bad" label="抽象的すぎる"}
「チームを良くする」 → 評価できない
::
::
```

**CheckItem Props**:

- `type`: `"good" | "bad"` (required)
- `label`: 項目のラベル（オプション）

---

### 6. **KeyPoints** - まとめポイント

**用途**: 記事のまとめ、重要ポイントの強調

**使い方**:

```markdown
::key-points{title="3点セットで得られる効果"}

- 本当に対処すべき問題が明確になる
- 優先順位を付けやすくなる
- 「べき論」に振り回されない
- チームで納得感のある判断ができる
  ::
```

**特徴**:

- リスト項目に自動でチェックマーク（✓）が付く
- グリーン系のグラデーション背景

**Props**:

- `title`: セクションタイトル (default: "ポイント")

---

### 7. **Diagram** - 図表・コードブロック

**用途**: フレームワークの構造、概念図を視覚化

**使い方**:

```markdown
::diagram{title="KPT に Goal を追加"}
\`\`\`
K (Keep): うまくいった事実
P (Problem): うまくいかなかった事実
G (Goal): そもそも何を達成したいのか ← NEW!
T (Try): Goalを満たすための仮説
\`\`\`
::
```

**Props**:

- `title`: 図のタイトル（オプション）

---

### 8. **BenefitList & BenefitItem** - メリット一覧

**用途**: 手法の効果、メリットをカード形式で列挙

**使い方**:

```markdown
::benefit-list
::benefit-item{title="Try が出しやすくなる" icon="mdi:lightbulb-on"}
「何をする？」ではなく「この Goal を達成するには？」という明確な問いに変わる。
::

::benefit-item{title="優先度を間違えない" icon="mdi:arrow-up-bold"}
最優先の Goal が先に決まっているため、本質的でない Try を選んでしまうリスクが減る。
::
::
```

**BenefitItem Props**:

- `title`: メリットのタイトル (required)
- `icon`: Iconify のアイコン名（オプション、default: "mdi:check-circle"）

---

## 🎯 コンポーネント選択ガイド

| 用途                       | コンポーネント                |
| -------------------------- | ----------------------------- |
| 注意書き・警告             | `Alert`                       |
| 重要な概念・フレームワーク | `InfoCard`                    |
| Before/After の比較        | `BeforeAfter`                 |
| 手順・プロセス             | `StepFlow` + `Step`           |
| 良い例・悪い例             | `CheckList` + `CheckItem`     |
| まとめポイント             | `KeyPoints`                   |
| 構造図・コードブロック     | `Diagram`                     |
| メリット列挙               | `BenefitList` + `BenefitItem` |

## 🖼️ アイコンの選び方

### 推奨アイコンセット

**MDI (Material Design Icons)**: `mdi:` プレフィックス

### よく使うアイコン

- **情報**: `mdi:information-outline`
- **成功**: `mdi:check-circle-outline`
- **警告**: `mdi:alert-outline`
- **危険**: `mdi:alert-circle-outline`
- **電球**: `mdi:lightbulb-on`
- **チェック**: `mdi:format-list-checks`
- **リンク**: `mdi:link-variant`
- **矢印**: `mdi:arrow-up-bold`
- **投票**: `mdi:vote`
- **グラフ**: `mdi:chart-line`
- **時計**: `mdi:clock-outline`
- **人**: `mdi:account`
- **チャート**: `mdi:chart-bar`

### アイコン検索

[Iconify Icon Sets](https://icon-sets.iconify.design/mdi/) で検索

## 📖 新しい記事を書くときのガイドライン

### 1. Frontmatter の設定

```markdown
---
title: '記事タイトル'
description: '記事の説明（1-2行）'
tags: ['タグ1', 'タグ2', 'タグ3']
date: 2025-11-20
---
```

### 2. 見出し構造

- `# h1` は使わない（title から自動生成される）
- `## h2` でセクション分け
- `### h3` でサブセクション

### 3. コンポーネントの活用

- **導入部**: 重要な概念は `InfoCard` で囲む
- **注意点**: `Alert` で強調
- **手順**: `StepFlow` でプロセスを視覚化
- **比較**: `BeforeAfter` で対比
- **まとめ**: `KeyPoints` で要点を列挙

### 4. 視覚的な工夫

- 適切にアイコンを使う
- 箇条書きは短く、簡潔に
- 強調は `**太字**` を使う
- コードブロックは言語を指定（\`\`\`typescript）

## 🚀 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 静的サイト生成
npm run generate

# Lint
npm run lint
npm run lint:fix

# フォーマット
npm run format

# 型チェック
npm run typecheck
```

## 🎨 新しいコンポーネントを追加するとき

1. `components/content/` に Vue ファイルを作成
2. **命名規則**: PascalCase（例: `NewComponent.vue`）
3. **MDC での使用**: ケバブケース（例: `::new-component`）
4. **スタイル**: scoped CSS + Tailwind の @apply を使用
5. **Props**: TypeScript の interface で型定義
6. **アイコン**: `<Icon>` コンポーネントを使用

### テンプレート

```vue
<template>
  <div class="my-8 not-prose">
    <div
      class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50/50 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-900 border border-gray-200/60 dark:border-gray-700/50 shadow-sm p-8"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<style scoped>
/* カスタムスタイル */
</style>
```

## 📚 参考リンク

- [Nuxt Content ドキュメント](https://content.nuxt.com/)
- [MDC 構文](https://content.nuxt.com/usage/markdown)
- [Tailwind CSS](https://tailwindcss.com/)
- [Iconify](https://icon-sets.iconify.design/)

---

_このガイドに従って、視覚的で読みやすいドキュメントを作成しましょう！_ ✨
