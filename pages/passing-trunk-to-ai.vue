<template>
  <article class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumb
      :items="[
        { label: 'ホーム', path: '/' },
        {
          label: '生成AIに「幹」を渡す',
          path: '/passing-trunk-to-ai',
          current: true,
        },
      ]"
    />

    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">生成AIに「幹」を渡す</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
      なぜ同じツールを使っても、成果に差が出るのか
    </p>

    <LikeButton article-slug="passing-trunk-to-ai" />

    <div class="prose prose-lg dark:prose-invert max-w-none">
      <!-- リード文 -->
      <p>
        生成AIに指示を出して、一発で意図通りの結果が返ってくる人がいます。一方で、何度やり直しても噛み合わない人もいます。
      </p>
      <p>
        この差はテクニックでは説明できません。同じテンプレートを使っても結果に差が出る。プロンプト集を読み漁っても改善しない。
      </p>
      <p>
        差を生んでいるのは、<strong>自分が何を求めているか</strong>の解像度です。そしてこの差は、AIの普及とともに拡大していくと予想されます。
      </p>

      <AnchorH2 id="constraints-and-generation">制約と生成</AnchorH2>
      <p>
        生成AIへの指示は<strong>「制約を与える」</strong>行為です。AIが生成できる無数の可能性から、条件によって範囲を絞り込む。AIはその制約の中で成果物を生成します。
      </p>

      <Diagram>
        <div class="flex flex-col md:flex-row items-stretch justify-between gap-4">
          <!-- 完成イメージ -->
          <div class="w-full md:flex-1 text-center">
            <div
              class="bg-blue-50 dark:bg-blue-950 rounded-lg p-6 md:p-8 border-2 border-blue-300 dark:border-blue-700 h-full flex flex-col justify-center"
            >
              <p class="text-4xl mb-3">💭</p>
              <p class="font-bold text-blue-900 dark:text-blue-100 text-lg mb-2">完成イメージ</p>
              <p class="text-sm text-blue-600 dark:text-blue-400">構成・表現・具体例...</p>
            </div>
          </div>

          <!-- 圧縮 -->
          <div class="flex flex-col items-center justify-center gap-1">
            <p class="text-xl">🧑‍💻</p>
            <p class="text-xs text-blue-600 dark:text-blue-400 font-semibold">圧縮</p>
            <div class="text-3xl text-gray-400 rotate-90 md:rotate-0">→</div>
          </div>

          <!-- プロンプト -->
          <div class="w-full md:flex-1 text-center">
            <div
              class="bg-purple-50 dark:bg-purple-950 rounded-lg p-6 md:p-8 border-2 border-purple-400 dark:border-purple-600 h-full flex flex-col justify-center"
            >
              <p class="text-3xl mb-2">📝</p>
              <p class="font-bold text-purple-900 dark:text-purple-100 text-lg mb-2">プロンプト</p>
              <p class="text-sm text-purple-600 dark:text-purple-400">抽象化された制約</p>
            </div>
          </div>

          <!-- 展開 -->
          <div class="flex flex-col items-center justify-center gap-1">
            <p class="text-xl">🤖</p>
            <p class="text-xs text-green-600 dark:text-green-400 font-semibold">展開</p>
            <div class="text-3xl text-gray-400 rotate-90 md:rotate-0">→</div>
          </div>

          <!-- 成果物 -->
          <div class="w-full md:flex-1 text-center">
            <div
              class="bg-green-50 dark:bg-green-950 rounded-lg p-6 md:p-8 border-2 border-green-300 dark:border-green-700 h-full flex flex-col justify-center"
            >
              <p class="text-4xl mb-3">✨</p>
              <p class="font-bold text-green-900 dark:text-green-100 text-lg mb-2">成果物</p>
              <p class="text-sm text-green-600 dark:text-green-400">構成・表現・具体例...</p>
            </div>
          </div>
        </div>

        <!-- 補足説明 -->
        <div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          人間が脳内の完成イメージを抽象化された制約に圧縮 → 生成AIが制約から詳細を展開
        </div>
      </Diagram>

      <p
        class="text-xl text-gray-900 dark:text-white font-medium mb-6 pl-4 border-l-4 border-green-500"
      >
        品質を落とさずに、どこまで制約を減らせるか?
      </p>

      <p>
        制約が少なすぎると、AIの解釈が入り込み、結果が発散します。たとえば「わかりやすく書いて」だけでは、誰にとってわかりやすいのか、何を重視するのかが不明で、10回生成すれば10通りの異なる結果が返ってくる。
      </p>
      <p>
        一方、制約が多すぎると、指示を書くコストが高くなり、AIを使う意味が薄れる。「見出しは18pt、本文は12pt、行間は1.5倍...」と細かく指定するなら、自分で作った方が早い。
      </p>

      <Alert type="info" title="重要なフレーミング">
        つまり、AIとの対話は<strong>「制約の最適化問題」</strong>として捉え直すことができます。うまくいかないときは、「AIの能力が低い」ではなく「与えている制約に問題がある」と考えましょう。
      </Alert>

      <AnchorH2 id="trunk-not-branches">種・幹・枝葉</AnchorH2>
      <p>では、最適な制約とは何か。この記事では、「種・幹・枝葉」の3つのゾーンで整理します。</p>

      <Diagram>
        <div class="space-y-4 md:space-y-6">
          <!-- 軸ライン（デスクトップ: 横、モバイル: 縦） -->
          <div class="flex md:hidden flex-col items-center">
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">抽象</span>
            <div class="w-0.5 h-12 bg-gray-300 dark:bg-gray-600"></div>
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400 mt-2">具体</span>
          </div>
          <div class="hidden md:flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">抽象</span>
            <div class="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-4"></div>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">具体</span>
          </div>

          <!-- 3つのゾーン -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- 種 -->
            <div class="text-center">
              <div
                class="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-200 dark:border-red-800 mb-3"
              >
                <p class="text-3xl mb-2">🌱</p>
                <p class="font-bold text-red-900 dark:text-red-200 mb-1">種</p>
                <p class="text-xs text-red-700 dark:text-red-300">制約が少なすぎる</p>
              </div>
              <div class="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2">
                方向性はあるが、解釈の余地が大きすぎる。
              </div>
              <div class="text-xs md:text-xs text-gray-500 dark:text-gray-400 italic">
                「わかりやすく」「いい感じに」
              </div>
            </div>

            <!-- 幹 -->
            <div class="text-center">
              <div
                class="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border-2 border-green-500 shadow-lg mb-3"
              >
                <p class="text-3xl mb-2">🌳</p>
                <p class="font-bold text-green-900 dark:text-green-200 mb-1">幹</p>
                <p class="text-xs text-green-700 dark:text-green-300">最適な制約</p>
              </div>
              <div class="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2">
                判断の分岐点を規定する。これがあれば、残りは論理的に導出できる。
              </div>
              <div class="text-xs md:text-xs text-gray-500 dark:text-gray-400 italic">
                「技術知識のない決裁者が、5分で投資判断できる資料」
              </div>
            </div>

            <!-- 枝葉 -->
            <div class="text-center">
              <div
                class="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4 border-2 border-orange-200 dark:border-orange-800 mb-3"
              >
                <p class="text-3xl mb-2">🍃</p>
                <p class="font-bold text-orange-900 dark:text-orange-200 mb-1">枝葉</p>
                <p class="text-xs text-orange-700 dark:text-orange-300">制約が多すぎる</p>
              </div>
              <div class="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2">
                幹から論理的に導ける情報や、AIが学習済みの慣習。
              </div>
              <div class="text-xs md:text-xs text-gray-500 dark:text-gray-400 italic">
                「箇条書きは5項目で」「グラフは棒グラフで」
              </div>
            </div>
          </div>
        </div>
      </Diagram>

      <p>
        <strong>幹</strong
        >とは、<strong>「目的達成に必須で、省略すると品質が崩れる制約」</strong>のこと。これがあれば、残りの判断は論理的に導出できます。言い換えれば、品質を維持できる最小限の情報です。
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        例えば、「決裁者向け資料」という幹があれば、「専門用語は避ける」「結論を先に」「ページ数は最小限に」といった判断は自然と決まります。これらをひとつひとつ指定する必要はありません。
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        なお、「種・幹・枝葉」の境界は文脈で変わります。「冒頭に挨拶文を入れる」は多くの場合は枝葉ですが、フォーマルな社外文書では幹になりえる。判断基準は「それが決まると、他の判断が連鎖的に決まるか」です。
      </p>

      <AnchorH2 id="example">具体例</AnchorH2>
      <p>同じ「提案資料を作って」という依頼でも、制約の与え方で結果は大きく変わります。</p>

      <BeforeAfter before-title="種のまま" after-title="幹を渡す">
        <template #before>
          <p class="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
            「新機能の提案資料を作って。わかりやすくお願い。」
          </p>
        </template>
        <template #after>
          <p class="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
            「新機能の提案資料を作って。読み手はエンジニアリングに詳しくない事業部長。判断してほしいのは開発着手のGO/NO
            GO。判断材料として、課題の深刻度・解決策の概要・必要リソース・リスクを含めて」
          </p>
        </template>
      </BeforeAfter>

      <p>
        後者は文字数が多いですが、「詳しく書いた」のではなく「判断基準を書いた」だけです。読み手・目的・必要情報という幹を渡し、構成や表現は指定していない。これが「幹を渡す」ということです。
      </p>

      <AnchorH2 id="common-mistakes">よくある失敗パターン</AnchorH2>
      <p>「幹を渡す」がうまくいかない典型的なパターンを3つ紹介します。</p>

      <Alert type="danger" title="パターン1: 手段を目的化する">
        <p class="mb-2">
          「パワポで作って」「Reactで書いて」「グラフを入れて」——これらは<strong>手段</strong>であり、幹ではありません。
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 italic">
          幹: 「なぜパワポか?」「なぜReactか?」その背後にある目的や制約こそが幹です。
        </p>
      </Alert>

      <Alert type="danger" title="パターン2: 目的を明確にしない">
        <p class="mb-2">
          「とりあえず全部書いておけば役立つだろう」——でも、新人には専門用語が難しすぎ、ベテランには冗長すぎる。誰のための資料か明確でないと、誰にも刺さらない。
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 italic">
          幹: 「誰が」「どんな状況で」「何を判断するために」使うのか。これが抜けると品質は崩れます。
        </p>
      </Alert>

      <Alert type="danger" title="パターン3: 全部指定したがる">
        <p class="mb-2">
          「フォントはMeiryo、16pt、太字で、行間は1.5倍、余白は...」——AIを使う意味がありません。
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 italic">
          幹:
          ここまで細かく指定するなら、自分で作った方が早い。AIに任せる範囲と、自分で決める範囲を見極めましょう。
        </p>
      </Alert>

      <p>
        どのパターンも、「何が本質的な制約か」を見失っています。幹を見つける前に、これらの罠に気づくことが第一歩です。
      </p>

      <AnchorH2 id="finding-trunk">🌳 幹を見つける</AnchorH2>
      <p>
        幹を言語化するのは簡単ではありません。完成イメージがまだ存在しない、「いい感じ」を言葉にできない、その領域の知識がない——理由はさまざまです。しかし、いずれの場合もAIとの対話を手がかりに幹を発見できます。
      </p>

      <InfoCard title="幹を見つける3つの方法" icon="mdi:compass">
        <h3>1. 違和感を観察する</h3>
        <p>
          種のまま投げて、出力を見る。「これじゃない」と感じたら、何が違うのかを言葉にする。この違和感が、言語化されていなかった制約＝「幹」の手がかりになります。
        </p>

        <h3>2. 比較で基準を炙り出す</h3>
        <p>
          「3パターン出して」と頼み、どれが好みか、なぜかを考える。比較は判断を強制する。判断すれば、基準が見えてきます。
        </p>

        <h3>3. AIに尋ねる</h3>
        <p>
          「これを作るために確認すべきことを質問して」と頼めば、AIが聞いてくる項目がそのまま幹の候補になります。詳しくない領域では「品質を左右する重要な観点は？」と聞いて、体系化された専門知識を教えてもらうこともできます。
        </p>
      </InfoCard>

      <p>
        「種」段階のプロンプトで再生成を繰り返すのは、このプロセスを飛ばしています。AIに「もっと○○に」と曖昧な指示を出すのではなく、<strong>「なぜ今の出力はダメなのか」「何が足りないのか」</strong>を一度立ち止まって考える。それを言語化して制約として渡す。それだけで次の指示の精度は劇的に上がります。
      </p>

      <AnchorH2 id="using-trunk">🌳 幹を渡す</AnchorH2>
      <p>
        幹を見つけたと思っても、いきなり完成形を求めてはいけません。段階的に渡し、対話を通じてAI側の理解（コンテキスト）を育てながら詳細化していきます。
      </p>

      <StepFlow>
        <Step number="1" title="幹だけを伝えて骨子を出力させる">
          詳細は求めず、幹となる制約を渡して成果物のアウトラインを出力させる。方向性がきちんと伝わっているかを確認します。
        </Step>
        <Step number="2" title="違和感を伝えてコンテキストを共有する">
          アウトラインに違和感があれば、それを言語化して伝える。この往復でAI側に文脈が蓄積され、認識が揃っていきます。
        </Step>
        <Step number="3" title="枝葉の詳細化を委譲する">
          方向が定まれば、表現や構成の細部はAIに任せる。もし微調整が必要なら、直接編集してもかまいません。（しかし、多くを書き換えているようなら、幹が不十分です）
        </Step>
      </StepFlow>

      <p>
        対話を重ねるごとにAI側のコンテキストが育ち、指示は短く、出力の精度は高くなります。幹を見つけ、渡すことは、一度きりの完璧な指示ではなく、AIとの対話を通じた協働作業です。
      </p>

      <AnchorH2 id="growing-trunk">🌳 幹を蓄積する</AnchorH2>
      <p>見つけ、育てた幹は、保存して再利用することで資産になります。</p>

      <AnchorH3 id="save-trunk">繰り返し使う幹は保存する</AnchorH3>
      <p>
        「結論を先に」「挨拶文は不要」「TypeScriptで書く」——こうした制約を毎回伝えているなら、それは保存して再利用すべき幹です。<strong
          >Custom Instructions</strong
        >や<strong>Claude Skills</strong
        >はこれを実現する仕組みを提供しています。一度言語化した幹を蓄積していくことで、指示はどんどん短くなります。
      </p>

      <AnchorH3 id="context-sharing">コンテキストを渡す仕組みを作る</AnchorH3>
      <p>
        個人の幹だけでなく、プロジェクトのコンテキストが自動的に渡される仕組みを整備することも重要です。設計ドキュメント、コーディング規約、過去の意思決定——こうした情報が自然とAIに伝われば、チーム全体の生産性が上がります。
      </p>

      <AnchorH3 id="moving-optimum">幹の最適点は移動する</AnchorH3>
      <p>
        LLMの能力は急速に向上しています。数年前は枝葉レベルの細かい指示が必要でしたが、今は幹を渡せば十分なことが多い。幹の最適点は、日々抽象方向に移動しています。
      </p>

      <TrunkEvolutionDiagram />

      <p>
        今「幹」として渡している情報も、いずれ不要になるかもしれません。AIがコードベースや設計ドキュメント全体を理解し、コンテキストから幹を推測できるようになれば、人間が明示的に渡す情報はさらに減る。毎朝、AIから次に開発すべき機能が提案される日も近いかもしれません。
      </p>
      <p>
        しかし、だからといって<strong>「幹を言語化する力」</strong>が不要になるわけではない。AIが提案する幹を評価し、修正し、承認する——その判断には、何が良い幹かを理解している必要があります。
      </p>
      <p>では、この力を持つ人と持たない人で、何が起きるのか。</p>

      <AnchorH2 id="widening-gap">できる人は、より遠くへ</AnchorH2>
      <p>
        「AIで誰でも○○できるようになる」という言説があります。誰でもコードが書ける、誰でもデザインできる、誰でも文章が書ける。<strong>スキルの民主化</strong>によって、能力の差は縮まっていく——そういう期待です。
      </p>
      <p>しかし実際に起きているのは、逆ではないでしょうか。</p>
      <p>
        枝葉を広げるコストが下がった結果、幹の価値が相対的に上がっている。コードを書くコストが下がったが、「何を作るか」の判断力で差がつく。文章を生成するコストは下がったが、「何を伝えるべきか」の解像度で差がつく。
      </p>
      <p>
        幹を言語化できる人がAIを使うと、高速で枝葉が広がり、空いた時間で幹をさらに磨ける。幹を言語化できない人がAIを使うと、出力が発散し、手戻りが増え、疲弊する。
      </p>
      <p>
        AIは格差を縮小する道具ではなく、<strong>言語化能力の格差を増幅する装置</strong>として機能する。個人レベルでも組織レベルでも、これは同じです。
      </p>

      <AnchorH2 id="conclusion">結局、何の力か</AnchorH2>
      <p>この記事で書いてきたことは、AIの話であると同時に仕事の話でもあります。</p>
      <p>
        「誰のために」「何を達成したくて」「譲れない条件は何か」を明確にする。これはチームへの依頼でも、クライアントへの提案でも、要件定義でも求められる力です。AIは曖昧さを即座に目に見える形で返してくる。だからこの力の有無が露呈しやすくなった。それだけのことです。
      </p>
      <p>
        AIが進化しても、この力の重要性は変わりません。幹を見つける、幹を使う、幹を育てる、幹を見極める——フェーズは変わっても、幹を理解している人間が価値を生み出す構造は同じです。
      </p>

      <div class="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-4 text-center my-8">
        <p class="text-xl font-medium">何が幹かを見極める目を持つこと。</p>
        <p class="text-xl font-medium">それが、人間に求められる力になる。</p>
      </div>

      <hr class="my-8" />
      <p class="text-sm text-gray-500 dark:text-gray-400 italic">
        この記事は生成AIとの対話を通じて作成されました。アウトラインを出し、方向を確認し、詳細化を任せる——まさに「幹を渡す」の実践記録でもあります。
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { getArticleBySlug } from '~/data/articles'

const article = getArticleBySlug('passing-trunk-to-ai')

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
