<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb
      :items="[
        { label: 'ホーム', path: '/' },
        {
          label: 'AI時代のコードレビュー再設計',
          path: '/code-review-in-ai-era',
          current: true,
        },
      ]"
    />

    <ArticleIcon v-if="article" :icon="article.icon" />
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
      AI時代のコードレビュー再設計
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
      コードから物語を引き出してメンタルモデルを合わせ、それからコードを読む。
    </p>

    <ArticleDate v-if="article" :date="article.date" />

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <AnchorH2 id="problem">コードは増える、責任は減らない</AnchorH2>
      <p>
        AI
        によってコードの生産量は桁違いに増えた。けれど、設計の妥当性や挙動の正しさに対する責任は依然として人間に残る。「すべて読む」では時間が足りない。「読まない」では責任を果たせない。
      </p>
      <p><strong>読み方の順序を再設計する必要がある。</strong></p>

      <AnchorH2 id="alternative">なぜ事前プラン合意ではないのか</AnchorH2>
      <p>
        もう一つのアプローチに「実装前にプランで合意してから書き始める」がある。これは部分的には機能するが、二つの限界がある。
      </p>
      <ul>
        <li>実装してみて初めて分かることがある。プラン段階の解像度には限界がある。</li>
        <li>具体物がないと議論が空中戦になりやすい。</li>
      </ul>

      <p>
        よく考えてみれば、実装ではすでに AI に「プロンプト（抽象）→
        コード（具体）」を担わせている。それなら、レビューでも逆向きに<strong
          >「コード（具体）→ 物語（抽象）」を AI に担わせる</strong
        >のが自然なはずだ。AI を具体と抽象の双方向の橋渡し役にする。
      </p>

      <AnchorH2 id="proposal">二段階レビュー</AnchorH2>
      <p>
        PR が来たとき、レビュアーは二段階で読む。Step 1 で違和感がなければ、そのまま Step 2
        へ流れる。
      </p>

      <StepFlow>
        <Step number="1" title="メンタルモデルのすり合わせ">
          AI
          に物語を生成させ、レビュアーが事前に持っている予想・期待と照合する。違和感があれば、コードを読む前にディスカッションへ戻る。
        </Step>
        <Step number="2" title="コード詳細のレビュー">
          物語が予想と一致していれば、そのままコードを読み込み、実装の妥当性を確認する。
        </Step>
      </StepFlow>

      <Alert type="info" title="運用上のニュアンス">
        必ずしもステップを形式的に分ける必要はなく、レビュアーが「いま何を照合しているか」を意識できていればよい。
        生成 AI 時代のワークフローが洗練されていく過程で、Step 2
        は主要ポイントの確認だけになる可能性が高いと考えている。
      </Alert>

      <AnchorH2 id="change">何が変わるのか</AnchorH2>
      <p>
        この二段階アプローチで何が変わるかというと、レビューにおける<strong>「照合の対象」が外在化される</strong>。従来は片方が暗黙のままだったものが、両方とも明示化されて、突き合わせが意識的になる。
      </p>

      <ReviewComparisonDiagram />

      <AnchorH2 id="effects">何が良くなるのか</AnchorH2>
      <CheckList>
        <CheckItem type="good" label="量ではなく意図でレビューを捌ける">
          PR
          の規模ではなく、意図の量がレビューコストを規定する。物語経由で全体像を掴めるため、大きな
          PR に対する耐性が上がる。
        </CheckItem>
        <CheckItem type="good" label="議論のズレを早期に発見できる">
          メンタルモデル段階での齟齬を、コード詳細に入る前にキャッチできる。後戻りのコストが下がる。
        </CheckItem>
        <CheckItem type="good" label="認知負荷が抽象→具体に階層化される">
          判断に必要な情報を必要な分だけ取り出せる。読まなくていいコードを読まずに済む。
        </CheckItem>
      </CheckList>

      <hr class="my-8" />
      <p class="text-sm text-gray-500 dark:text-gray-400 italic">
        コードを読む前に、コードについての物語を読む。
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { getArticleBySlug } from '~/data/articles'

const article = getArticleBySlug('code-review-in-ai-era')

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
