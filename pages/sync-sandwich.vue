<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
      同期サンドイッチ - ミーティングの進め方
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
      分散チームで重要な作成物を完成させたり重要な判断を下したりする必要がある場合のミーティング構成
    </p>

    <LikeButton article-slug="sync-sandwich" />

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <AnchorH2 id="sync-async-definition">💡 「同期」と「非同期」とは？</AnchorH2>
      <p>
        このドキュメントでは「同期」と「非同期」という言葉を使用します。まずはこの2つの違いを簡単に説明します。
      </p>
      <TwoColumnCompare
        left-title="同期（リアルタイム）"
        right-title="非同期（時間をずらして）"
        left-icon="🤝"
        right-icon="📝"
      >
        <template #left>
          <p class="mb-2">全員が同じ時間に集まってコミュニケーションする</p>
          <p class="text-xs">例：ミーティング、電話、ビデオ通話</p>
        </template>
        <template #right>
          <p class="mb-2">それぞれが自分のタイミングでやり取りする</p>
          <p class="text-xs">例：メール、Slack、ドキュメント共有</p>
        </template>
      </TwoColumnCompare>
      <AnchorH2 id="what-is-sync-sandwich">同期サンドイッチとは</AnchorH2>
      <p>
        分散チームで重要な作成物を完成させたり重要な判断を下したりする必要がある場合は、「<strong>同期サンドイッチ</strong>」構成のミーティングを設定しましょう。
      </p>

      <InfoCard title="📚 出典">
        <a
          href="https://www.oreilly.co.jp/books/9784814400430/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 dark:text-blue-400 hover:underline"
        >
          プロダクトマネージャーのしごと 第2版（オライリー・ジャパン）
        </a>
      </InfoCard>

      <AnchorH2 id="three-steps">3つのステップ 🥪</AnchorH2>
      <p>同期サンドイッチには、3つのステップがあります</p>

      <StepFlow>
        <Step number="1" title="準備/事前資料（非同期）" icon="📋">
          ミーティングの<strong>1日前まで</strong>には、事前に読む資料を非同期で送る。
          <ul>
            <li>自分の考えをまとめる時間が必要な参加者も参加しやすくなる</li>
            <li>グループ全体が手持ちのタスクや質問に向き合えるようになる</li>
          </ul>
        </Step>

        <Step number="2" title="判断/共創（同期）" icon="🤝">
          <strong>タイムボックスを設定した同期ミーティング</strong>をファシリテーションする。
          <ul>
            <li>判断を下す</li>
            <li>ドキュメントを一緒に作成する</li>
            <li>事前資料で説明された問題を解決する</li>
          </ul>
        </Step>

        <Step number="3" title="まとめ/更新（非同期）" icon="📝">
          同期ミーティングから<strong>1日以内</strong>に、次のアクションを含むフォローアップを非同期で送る。
          <ul>
            <li>ミーティングの勢いを削ぐことなく進められる</li>
            <li>
              ミーティングの参加者全員が、その時点では他のことをやっていたとしても、アウトカムを見て理解できるようにする
            </li>
          </ul>
        </Step>
      </StepFlow>

      <AnchorH2 id="benefits">同期サンドイッチの効果</AnchorH2>
      <BenefitList>
        <BenefitItem title="全員が準備できた状態で参加" icon="mdi:account-check">
          事前資料により、内向的な人や考えをまとめる時間が必要な人も対等に参加できる。
        </BenefitItem>

        <BenefitItem title="同期時間の最大活用" icon="mdi:clock-fast">
          準備とまとめを非同期にすることで、貴重な同期時間を判断と共創に集中できる。
        </BenefitItem>

        <BenefitItem title="アウトカムが明確に残る" icon="mdi:file-document-check">
          フォローアップにより、参加できなかったメンバーも含めて全員がアウトカムを把握できる。
        </BenefitItem>
      </BenefitList>

      <AnchorH2 id="checklist">実践チェックリスト</AnchorH2>
      <CheckList>
        <CheckItem type="good" label="事前資料は1日前までに送る">
          参加者が十分に準備できる時間を確保する
        </CheckItem>
        <CheckItem type="good" label="同期ミーティングはタイムボックスを設定">
          決められた時間内で判断を下す
        </CheckItem>
        <CheckItem type="good" label="次のアクションを明確にする">
          誰が何をいつまでにやるかを明記する
        </CheckItem>
        <CheckItem type="good" label="フォローアップは1日以内に送る">
          ミーティングの勢いを保ったまま次のアクションにつなげる
        </CheckItem>
      </CheckList>
    </div>
  </article>
</template>

<script setup lang="ts">
import { getArticleBySlug } from '~/data/articles'

const article = getArticleBySlug('sync-sandwich')

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
