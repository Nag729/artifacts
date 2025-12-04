<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb
      :items="[
        { label: 'ホーム', path: '/' },
        { label: 'KPGTふりかえり手法の提案', path: '/kpgt-retrospective', current: true },
      ]"
    />

    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">KPGTふりかえり手法の提案</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
      従来のKPTふりかえりの課題を解決する新しいアプローチ
    </p>

    <LikeButton article-slug="kpgt-retrospective" />

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <AnchorH2 id="what-is-kpt">KPT とは</AnchorH2>
      <p>
        KPT
        は、<strong>Keep（続けること）</strong>・<strong>Problem（問題点）</strong>・<strong>Try（試すこと）</strong>の3つの観点でふりかえりを行うフレームワークです。
        シンプルで導入しやすいため、多くのチームで採用されています。
      </p>
      <Diagram title="従来の KPT の流れ（一例）">
        <pre><code>1. Keep / Problem を出す（過去の振り返り）
2. Try を出す（次のアクション）
3. 投票して Try を決める</code></pre>
      </Diagram>

      <AnchorH2 id="kpt-issues">KPT の課題</AnchorH2>
      <p>しかし、KPT には以下のような構造的な課題があります：</p>

      <CheckList>
        <CheckItem type="bad" label="TRY が対症療法になりがち">
          Problem を裏返しただけの Try になり、根本原因が解決されない。
        </CheckItem>

        <CheckItem type="bad" label="TRY と Problem の関連が曖昧">
          どの Problem に対する Try なのかが明確でなく、別々の課題を思い浮かべていることも。
        </CheckItem>

        <CheckItem type="bad" label="適切なゴールなのかが曖昧">
          Try だけを見ていると、本当に重要な課題に取り組めているのか分からない。
        </CheckItem>
      </CheckList>

      <AnchorH2 id="root-cause">根本原因：達成したい状態（Goal）が明確になっていない</AnchorH2>
      <p>KPT の構造を整理すると：</p>
      <ul>
        <li><strong>Keep, Problem</strong> = 観測された事実（過去に起きたこと）</li>
        <li><Badge type="warning">欠けているもの</Badge> <strong>Goal</strong> = 達成したい状態</li>
        <li><strong>Try</strong> = 次に取る行動（未来にやること）</li>
      </ul>
      <p>ゴールが明確でないと、適切な Try を考えるのが難しく、優先順位も付けづらい。</p>

      <AnchorH2 id="solution">解決策：KPGT への拡張</AnchorH2>
      <Diagram title="KPT に Goal を追加">
        <pre><code>K (Keep):    うまくいった事実
P (Problem): うまくいかなかった事実
G (Goal):    そもそも何を達成したいのか ← NEW!
T (Try):     Goalを満たすための仮説</code></pre>
      </Diagram>

      <AnchorH2 id="new-flow">新しいふりかえりフロー</AnchorH2>
      <StepFlow>
        <Step number="1" title="できごとを思い出す">期間中の出来事を振り返る。</Step>

        <Step number="2" title="Keep, Problem を出す">
          <ul>
            <li><strong>Keep</strong>: うまくいったこと</li>
            <li><strong>Problem</strong>: うまくいかなかったこと</li>
          </ul>
        </Step>

        <Step number="3" title="Goal（達成したい状態）を各自でアイデア出し">
          <Badge type="info">NEW</Badge>
          Keep, Problem を見ながら、各自が以下の 3 要素で Goal のアイデアを出す：
          <ul>
            <li><strong>現在の運用</strong>：今どうなっているか（事実）</li>
            <li><strong>期待違反</strong>：何が期待と違うのか（ギャップ）</li>
            <li><strong>大きなゴール</strong>：最終的にどうなりたいか（理想）</li>
          </ul>
          <Alert type="info" title="例：リリース頻度の改善">
            <strong>現在の運用</strong>：本番リリースは月1回、手動デプロイ<br />
            <strong>期待違反</strong>：機能追加から本番反映まで平均3週間かかっている<br />
            <strong>大きなゴール</strong>：開発完了から3日以内に本番リリースできる状態
          </Alert>
        </Step>

        <Step number="4" title="Goal を整理・統合して投票">
          <Badge type="info">NEW</Badge>
          各自が出した Goal を似たものでグルーピングし、このスプリントで取り組む Goal
          を投票で選ぶ。<br />
          （≒ 集中する Keep, Problem を決める）
        </Step>

        <Step number="5" title="Try を出す">
          <strong>選ばれた Goal を達成するためのアイデア</strong> として、Try を考える。<br />
          この時点で、Try と Goal の対応関係が明確になっている。
        </Step>

        <Step number="6" title="各 Try の実施可否を決める">
          挙がった Try それぞれに対して、チーム全員で
          <strong>Yes / No（このスプリントで実施するか）</strong> を決める。
          <ul>
            <li><strong>Yes</strong>：Goal への寄与度が高く、実現可能</li>
            <li><strong>No</strong>：効果が不明確、リソース不足、タイミングが悪い、etc...</li>
          </ul>
        </Step>

        <Step number="7" title="SMART な目標にする">
          選ばれた Try を、SMART（具体的・測定可能・達成可能・関連性・期限）な目標に落とし込む。
        </Step>
      </StepFlow>

      <p>
        <strong>Goal を明確に</strong
        >すれば、チームの議論が変わります。「何を達成したいんだっけ?」の共通認識があれば、表面的な問題の羅列ではなく、<strong>本質的な課題に集中した深い議論</strong>ができるようになります。
      </p>

      <AnchorH2 id="benefits">KPGT の効果</AnchorH2>
      <BenefitList>
        <BenefitItem title="Try が出しやすくなる" icon="mdi:lightbulb-on">
          「何をする？」ではなく「この Goal を達成するには？」という明確な問いに変わる。 どの Goal
          のための Try なのかが構造的に明確になり、ふりかえりツール上でも可視化しやすい。
        </BenefitItem>

        <BenefitItem title="優先度を間違えない" icon="mdi:arrow-up-bold">
          最優先の Goal が先に決まっているため、本質的でない Try を選んでしまうリスクが減る。
        </BenefitItem>

        <BenefitItem title="アウトカムで評価できる" icon="mdi:chart-line">
          「Try を実施したか」ではなく「Goal
          を達成できたか」で評価する。アウトプット（何をしたか）ではなく、アウトカム（何が変わったか）で振り返れる。
        </BenefitItem>
      </BenefitList>

      <AnchorH2 id="goal-tips">Goal を出すときのコツ</AnchorH2>
      <Alert type="info" title="問いかけ例">
        <ul>
          <li>「この Problem って、どういう状態になれば解決？」</li>
          <li>「複数の Problem に共通するテーマは？」</li>
          <li>「そもそも私たちは何を達成したいんだっけ？」</li>
        </ul>
      </Alert>

      <CheckList>
        <CheckItem type="good" label="測定可能"> 状態を確認できる </CheckItem>

        <CheckItem type="good" label="具体的">
          Try とのつながりがイメージできる
          <ul>
            <li>「全員が週次でリリースできる状態を保つ」</li>
            <li>「新メンバーが 2 週間で自走できる」</li>
            <li>「本番障害をゼロにする」</li>
          </ul>
        </CheckItem>

        <CheckItem type="bad" label="抽象的すぎる">
          Try を考えにくく、評価もできない
          <ul>
            <li>「チームを良くする」</li>
            <li>「生産性を上げる」</li>
          </ul>
        </CheckItem>
      </CheckList>

      <AnchorH2 id="summary">まとめ</AnchorH2>
      <p>
        KPT に <strong>Goal</strong> を加えることで、ふりかえりの質が変わります。
        「何を達成したいのか」を先に明確にすれば、チームの議論は表面的な問題の列挙から、本質的な課題への深い探求へと変化します。
      </p>
      <BenefitBox title="KPGT で得られる効果">
        <ul>
          <li><strong>議論の深さ</strong> - 本質的な課題に集中できる</li>
          <li><strong>優先度の明確さ</strong> - 何が重要かをチーム全体で合意できる</li>
          <li><strong>納得感のある意思決定</strong> - 根拠を持って Try を選べる</li>
        </ul>
      </BenefitBox>

      <hr class="my-8" />
      <p class="text-sm text-gray-500 dark:text-gray-400 italic">
        KPT に Goal を加えることで、より本質的なふりかえりを実現する KPGT。<br />
        一度チームで試してみてはいかがでしょうか？
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { getArticleBySlug } from '~/data/articles'

const article = getArticleBySlug('kpgt-retrospective')

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
