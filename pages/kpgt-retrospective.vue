<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">KPGTふりかえり手法の提案</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      従来のKPTふりかえりの課題を解決する新しいアプローチ
    </p>

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <AnchorH2 id="kpt-issues">KPT の課題</AnchorH2>
      <p>現在の KPT ふりかえりには、以下の構造的な課題があります：</p>

      <CheckList>
        <CheckItem type="bad" label="TRY が思い浮かばない">
          Keep, Problem を出した後、「で、何をする？」となり、Try が出にくい場面がある。
        </CheckItem>

        <CheckItem type="bad" label="対応関係が不明確">
          Try と Keep, Problem の対応が FigJam
          に明文化されず、口頭で確認・脳内で関連付けが必要になっている。フレームワークとして構造的な問題がある。
        </CheckItem>

        <CheckItem type="bad" label="最優先のゴールが曖昧">
          Try の後にゴールを整理しているため、本当にそれが最優先のゴールだったのか曖昧になっている。
        </CheckItem>
      </CheckList>

      <AnchorH2 id="root-cause">根本原因：評価基準（Goal）が後回しになっている</AnchorH2>
      <p>KPT の構造を整理すると：</p>
      <ul>
        <li><strong>Keep, Problem</strong> = 観測された事実（過去に起きたこと）</li>
        <li><strong>Try</strong> = 次に取る行動（未来にやること）</li>
        <li><strong>欠けているもの</strong> = <strong>達成したい状態（Goal）</strong></li>
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
        <Step number="1" title="できごとを思い出す" duration="10分">
          これまで通り、期間中の出来事を振り返る。
        </Step>

        <Step number="2" title="Keep, Problem を出す" duration="10分">
          <ul>
            <li><strong>Keep</strong>: うまくいったこと</li>
            <li><strong>Problem</strong>: うまくいかなかったこと</li>
          </ul>
        </Step>

        <Step number="3" title="Goal（達成したい状態）を確認・言語化" duration="10分">
          🆕 Keep, Problem を見ながら：
          <ul>
            <li>「この Problem って、どういう状態になれば解決？」</li>
            <li>「複数の Problem に共通するテーマは？」</li>
            <li>「そもそも私たちは何を達成したいんだっけ？」</li>
          </ul>
          を話し合い、達成したいゴールを言語化する。
        </Step>

        <Step number="4" title="投票して解決する Goal を決める" duration="5分">
          🆕 出された Goal の中から、今期取り組む Goal を投票で選ぶ。<br />
          （≒ 取り組む Keep, Problem を決める）
        </Step>

        <Step number="5" title="Try を出す" duration="10分">
          <strong>選ばれた Goal を満たすための仮説</strong> として、Try を考える。<br />
          この時点で、Try と Goal の対応関係が明確になっている。
        </Step>

        <Step number="6" title="投票して Try を決める" duration="5分">
          Goal への寄与度を基準に、実施する Try を投票で選ぶ。
        </Step>

        <Step number="7" title="SMART な目標にする" duration="10分">
          選ばれた Try を、SMART（具体的・測定可能・達成可能・関連性・期限）な目標に落とし込む。
        </Step>
      </StepFlow>

      <Alert type="info">
        <strong>合計：60 分</strong><br />
        ※Goal に時間をかけても、Try 出しが効率化するため総時間は変わらない
      </Alert>

      <AnchorH2 id="benefits">KPGT の効果</AnchorH2>
      <BenefitList>
        <BenefitItem title="Try が出しやすくなる" icon="mdi:lightbulb-on">
          「何をする？」ではなく「この Goal を達成するには？」という明確な問いに変わる。
        </BenefitItem>

        <BenefitItem title="Try と Problem の対応が明確" icon="mdi:link-variant">
          どの Goal のための Try なのかが構造的に明確になり、FigJam 上でも可視化しやすい。
        </BenefitItem>

        <BenefitItem title="優先度を間違えない" icon="mdi:arrow-up-bold">
          最優先の Goal が先に決まっているため、本質的でない Try を選んでしまうリスクが減る。
        </BenefitItem>

        <BenefitItem title="投票が2段階になり判断しやすい" icon="mdi:vote">
          <strong>第1段階</strong>: Goal 選択（何を達成したいか）<br />
          <strong>第2段階</strong>: Try 選択（どう達成するか）<br />
          <br />
          判断基準が明確になり、投票しやすい。
        </BenefitItem>

        <BenefitItem title="次回の評価がしやすい" icon="mdi:chart-line">
          次のふりかえりで「前回の Goal は達成できたか？」を基準に評価できる。
        </BenefitItem>
      </BenefitList>

      <AnchorH2 id="goal-tips">Goal を出すときのコツ</AnchorH2>
      <Alert type="info">
        <h3 class="text-lg font-bold mb-2">問いかけ例</h3>
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

      <AnchorH2 id="experiment">まずは実験として</AnchorH2>
      <p>次回のふりかえりで試してみて、効果を測定しましょう：</p>

      <CheckList>
        <CheckItem type="good" label="Try 出しの時間"> Try 出しの時間が減ったか </CheckItem>
        <CheckItem type="good" label="投票のスムーズさ"> 投票がスムーズになったか </CheckItem>
        <CheckItem type="good" label="対応関係の明確さ">
          Try と Problem の対応が明確になったか
        </CheckItem>
        <CheckItem type="good" label="納得感"> チーム全体で納得感のある Try を選べたか </CheckItem>
      </CheckList>

      <AnchorH2 id="summary">まとめ</AnchorH2>
      <BenefitBox title="KPGT で得られる効果">
        <ul>
          <li>何を達成したいかが明確になる</li>
          <li>Try が出しやすくなる</li>
          <li>優先度を間違えない</li>
          <li>評価しやすくなる</li>
        </ul>
      </BenefitBox>

      <hr class="my-8" />
      <p class="text-sm text-gray-500 dark:text-gray-400 italic">手法提案として作成 / 2025</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { getArticleBySlug } from '~/data/articles'

const article = getArticleBySlug('kpgt-retrospective')

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
