<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
      生成AIファーストなソフトウェア開発の収束状態
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      AIの能力が成熟し、枠組みが整ったとき、開発はどう変わるか
    </p>

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <h2>エンジニアの役割の変化</h2>

      <h3>「実装者」から「意思決定者」へ</h3>
      <p>
        収束状態において、エンジニアはコードを書く人から、判断を下す人へと移行する。ワークフローは以下のようになる。
      </p>

      <StepFlow>
        <Step number="1" title="AI が提案"> AI が複数の方針・設計案を提案 </Step>
        <Step number="2" title="人間が判断"> 人間が採用・不採用を判断 </Step>
        <Step number="3" title="AI が実装"> AI が自律的に実装・テスト・デプロイまで完了 </Step>
      </StepFlow>

      <Alert type="info">
        従来の「発注者とベンダー」に似ているが、フィードバックが数秒〜数分で返るため、要求を対話的に詰めていくスタイルが有効になる。
      </Alert>

      <h2>人間と AI の役割分担</h2>

      <h3>機能要件 → 人間がレビュー</h3>
      <p>
        「何をすべきか」はドメイン知識と意思決定の問題。人間が振る舞いの定義（より読みやすい形式のテスト）をレビューする。
      </p>

      <h3>非機能要件 → AI が自律的に最適化</h3>
      <p>
        パフォーマンス、セキュリティ、可用性は明確なメトリクスで定義できるため、AI が計測 → 評価 →
        改善のループを自律的に回せる。
      </p>

      <table>
        <thead>
          <tr>
            <th>領域</th>
            <th>人間</th>
            <th>AI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>What（何を作るか）</td>
            <td>定義・レビュー・承認</td>
            <td>提案・実装</td>
          </tr>
          <tr>
            <td>How well（品質）</td>
            <td>閾値の設定</td>
            <td>自律的な検証・改善</td>
          </tr>
          <tr>
            <td>Why（判断理由）</td>
            <td>意思決定・説明責任</td>
            <td>選択肢とトレードオフの提示</td>
          </tr>
        </tbody>
      </table>

      <h2>現状と収束状態のギャップ</h2>

      <h3>能力はある、枠組みがない</h3>
      <p>現在の生成 AI は個別タスクを高精度でこなせる。不足しているのは以下の枠組みである。</p>

      <InfoCard title="不足している3つの枠組み" icon="mdi:puzzle">
        <h3>🔄 オーケストレーション層</h3>
        <p>複数タスクの実行順序制御、結果の受け渡し、失敗時のロールバック</p>

        <h3>💾 状態管理と継続性</h3>
        <p>長期プロジェクトの文脈を保持し、セッションをまたいで作業を継続する仕組み</p>

        <h3>🛡️ 信頼境界の定義</h3>
        <p>「ここまでは自律実行、ここからは人間に確認」という境界の宣言的な定義方法</p>
      </InfoCard>

      <Alert type="success">
        枠組みが整った瞬間、変化は急速に進む可能性がある。iPhone
        が既存技術を一気に普及させたように、決定版となるツールが登場すれば業界標準になる。
      </Alert>

      <h2>収束状態の多様性</h2>
      <p>収束状態は一つではなく、プロダクト特性によって異なる姿になる。</p>

      <BeforeAfter beforeTitle="高信頼性領域" afterTitle="迅速な試行錯誤領域">
        <template #before>
          <strong>医療・防災・金融など</strong><br /><br />
          人間によるレビューと承認が多く残り、デプロイ前確認が必須。
        </template>
        <template #after>
          <strong>コンシューマアプリ・プロトタイプなど</strong><br /><br />
          AI への委譲度が高く、自律デプロイも許容される。
        </template>
      </BeforeAfter>

      <h2>残り続けるもの</h2>
      <div
        class="my-8 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
      >
        <h3
          class="text-xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2"
        >
          <Icon name="mdi:check-circle" class="w-6 h-6" />
          AIに置き換わらない人間の価値
        </h3>
        <ul class="space-y-2">
          <li class="flex items-start gap-2">
            <Icon
              name="mdi:check"
              class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
            />
            <span>課題の本質を見極める力</span>
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="mdi:check"
              class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
            />
            <span>外部システムとの統合判断</span>
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="mdi:check"
              class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
            />
            <span>ドメイン知識の妥当性検証</span>
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="mdi:check"
              class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
            />
            <span>トレードオフの意思決定</span>
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="mdi:check"
              class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
            />
            <span>判断の説明責任</span>
          </li>
        </ul>
      </div>

      <h2>結論</h2>
      <Alert type="info">
        収束状態において、エンジニアの本質的な価値は
        <strong>「What（何を作るか）」</strong> と
        <strong>「Why（なぜそう判断したか）」</strong> に集約される。<br /><br />

        この変化は技術的にはすでに実現可能な段階にあり、枠組みが整うのを待っている状態かもしれない。今から
        AI
        ファーストなワークフローを探求し、「判断者」としてのスキルを磨くことが、その波に乗るための準備となる。
      </Alert>

      <hr class="my-8" />
      <p class="text-sm text-gray-500 dark:text-gray-400 italic">思考実験として作成 / 2025</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { getArticleBySlug } from '~/data/articles'

const article = getArticleBySlug('ai-first-development-convergence')

useHead({
  title: article?.title,
  meta: [
    {
      name: 'description',
      content: article?.description,
    },
  ],
})
</script>
