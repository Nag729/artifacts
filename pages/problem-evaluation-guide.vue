<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
      「それ、本当に困ってる？」を見極める3点セット
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
      ふりかえりで出てくる問題が本当に対処すべきものなのかを判断する3つの観点
    </p>

    <LikeButton article-slug="problem-evaluation-guide" />

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <AnchorH2 id="three-points">3 点セット</AnchorH2>

      <InfoCard title="3点セット" icon="mdi:format-list-checks">
        <p>問題を評価するための 3 つの観点：</p>

        <h3>🧑 誰が</h3>
        <ul>
          <li>ユーザー</li>
          <li>開発者</li>
          <li>レビュアー</li>
          <li>運用者</li>
          <li>CS 担当</li>
          <li>営業</li>
        </ul>

        <h3>⏰ どんなときに</h3>
        <ul>
          <li>機能を使う</li>
          <li>問い合わせる</li>
          <li>実装する</li>
          <li>テストする</li>
          <li>レビューする</li>
          <li>デプロイする</li>
          <li>障害対応する</li>
          <li>オンボーディングする</li>
        </ul>

        <h3>📊 どれくらい</h3>
        <ul>
          <li><strong>時間</strong>: 分/時間/日</li>
          <li><strong>頻度</strong>: 毎回/週 N 回/月 N 回</li>
          <li><strong>件数</strong>: 月 N 件</li>
        </ul>
      </InfoCard>

      <AnchorH2 id="how-to-use">使い方</AnchorH2>
      <Alert type="success" title="Problem が出たらこの 3 点で説明してみる">
        埋められないなら「気になること」として保留し、本当に困るまで待つ
      </Alert>

      <AnchorH2 id="should-vs-reality">「べき論」と実害のギャップに注意</AnchorH2>
      <Alert type="warning" title="べき論と実害のギャップ">
        「コードは新しい書き方であるべき」「手作業は自動化すべき」「テストカバレッジは高くあるべき」など、一般的なベストプラクティスや理想像があります。<br /><br />

        これらに照らすと一見「問題」に見えても、実際の文脈では頻度・影響・安定性を考慮すると実害がないこともあります。<br /><br />

        Problem
        が出たら「一般的には良くないとされているが、この文脈で本当に困っているか？」を確認しましょう。
      </Alert>

      <AnchorH2 id="examples">実例で確認</AnchorH2>

      <AnchorH3 id="high-impact">実は影響が大きい例 🔥</AnchorH3>
      <BeforeAfter>
        <template #before> 「問い合わせ対応が手作業で面倒」 </template>
        <template #after>
          「<strong>ユーザーが</strong>、問い合わせ後に、<strong>回答まで平均 3 日待っている</strong
          >（<strong>月 50 件</strong>）」<br /><br />
          → 誰が・どんなときに・どれくらいが明確で、影響が大きいことがわかる
        </template>
      </BeforeAfter>

      <AnchorH3 id="low-impact">実は影響が小さい例 🤔</AnchorH3>
      <BeforeAfter>
        <template #before> 「この機能のコードが古い書き方のまま」 </template>
        <template #after>
          「<strong>年 1 回の更新時</strong> しか触らず、動作も安定しているので実害なし →
          <strong>保留</strong>」<br /><br />
          → 頻度が低く、実害がないため優先度は低い
        </template>
      </BeforeAfter>

      <AnchorH2 id="summary">まとめ</AnchorH2>
      <BenefitBox title="3点セットで得られる効果">
        <ul>
          <li>本当に対処すべき問題が明確になる</li>
          <li>優先順位を付けやすくなる</li>
          <li>「べき論」に振り回されない</li>
          <li>チームで納得感のある判断ができる</li>
        </ul>
      </BenefitBox>

      <hr class="my-8" />
      <p class="text-sm text-gray-500 dark:text-gray-400 italic">問題評価ガイドとして作成 / 2025</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { getArticleBySlug } from '~/data/articles'

const article = getArticleBySlug('problem-evaluation-guide')

if (article) {
  useSeo({
    title: article.title,
    description: article.description,
    type: 'article',
    article: {
      publishedTime: article.date,
      author: 'Nag729',
      tags: article.tags,
    },
  })
}
</script>
