<template>
  <Diagram>
    <div class="space-y-10">
      <!-- ============================================================
           Before: 従来のコードレビュー
           ============================================================ -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span
            class="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase"
          >
            Before
          </span>
          <h4 class="text-lg font-bold text-gray-900 dark:text-white">従来のコードレビュー</h4>
        </div>

        <div
          class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 md:p-6"
        >
          <svg
            viewBox="0 0 800 300"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-auto"
            role="img"
            aria-label="従来のコードレビュー: レビュアーがコード（具体）からメンタルモデル（抽象）を自力で構築する図"
          >
            <!-- Layer divider -->
            <line
              x1="55"
              y1="155"
              x2="770"
              y2="155"
              class="stroke-gray-200 dark:stroke-gray-700"
              stroke-width="1"
            />

            <!-- Layer labels -->
            <text
              x="35"
              y="143"
              text-anchor="middle"
              font-size="10"
              font-weight="600"
              letter-spacing="0.15em"
              class="fill-gray-400 dark:fill-gray-500"
            >
              抽象
            </text>
            <text
              x="35"
              y="172"
              text-anchor="middle"
              font-size="10"
              font-weight="600"
              letter-spacing="0.15em"
              class="fill-gray-400 dark:fill-gray-500"
            >
              具体
            </text>

            <!-- ---- 上段: 抽象レイヤー ---- -->

            <!-- Reviewee avatar -->
            <g transform="translate(130, 35)">
              <circle
                r="20"
                class="fill-white dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600"
                stroke-width="1.5"
              />
              <circle cx="0" cy="-4" r="5" class="fill-gray-500 dark:fill-gray-400" />
              <path
                d="M -8 9 Q -8 1 0 1 Q 8 1 8 9 L 8 12 L -8 12 Z"
                class="fill-gray-500 dark:fill-gray-400"
              />
            </g>
            <text
              x="130"
              y="70"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="12"
              font-weight="600"
            >
              レビュイー
            </text>

            <!-- 意図 pill -->
            <rect
              x="80"
              y="85"
              width="100"
              height="40"
              rx="20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="4 4"
              class="text-gray-300 dark:text-gray-600"
            />
            <text
              x="130"
              y="110"
              text-anchor="middle"
              class="fill-gray-700 dark:fill-gray-300"
              font-size="14"
              font-weight="600"
            >
              意図
            </text>

            <!-- Reviewer avatar -->
            <g transform="translate(660, 35)">
              <circle
                r="20"
                class="fill-white dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600"
                stroke-width="1.5"
              />
              <circle cx="0" cy="-4" r="5" class="fill-gray-500 dark:fill-gray-400" />
              <path
                d="M -8 9 Q -8 1 0 1 Q 8 1 8 9 L 8 12 L -8 12 Z"
                class="fill-gray-500 dark:fill-gray-400"
              />
            </g>
            <text
              x="660"
              y="70"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="12"
              font-weight="600"
            >
              レビュアー
            </text>

            <!-- Mental model pill (faded, dashed) -->
            <rect
              x="585"
              y="85"
              width="150"
              height="40"
              rx="20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="4 4"
              class="text-gray-300 dark:text-gray-600"
              opacity="0.65"
            />
            <text
              x="660"
              y="110"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="14"
              font-weight="500"
              opacity="0.75"
            >
              メンタルモデル
            </text>

            <!-- ---- 下段: 具体レイヤー ---- -->

            <!-- Code rect -->
            <rect
              x="340"
              y="190"
              width="120"
              height="54"
              rx="10"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              class="text-gray-400 dark:text-gray-500"
            />
            <text
              x="400"
              y="222"
              text-anchor="middle"
              class="fill-gray-900 dark:fill-white"
              font-size="16"
              font-weight="700"
            >
              コード
            </text>

            <!-- ---- Edges ---- -->

            <!-- 実装: 意図 → コード (上→下) -->
            <path
              d="M 155 122 L 345 193"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="5 5"
              class="text-gray-300 dark:text-gray-600"
              marker-end="url(#before-arrow-dim)"
            />
            <rect
              x="213"
              y="134"
              width="38"
              height="18"
              rx="4"
              class="fill-white dark:fill-gray-900"
              opacity="0.8"
            />
            <text
              x="232"
              y="148"
              text-anchor="middle"
              class="fill-gray-500 dark:fill-gray-400"
              font-size="13"
              font-weight="500"
            >
              実装
            </text>

            <!-- 読解＋照合: コード → メンタルモデル (下→上, 認知負荷が高い) -->
            <path
              d="M 455 193 L 640 122"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              class="text-gray-500 dark:text-gray-400"
              marker-end="url(#before-arrow)"
            />
            <rect
              x="470"
              y="153"
              width="80"
              height="36"
              rx="4"
              class="fill-white dark:fill-gray-900"
              opacity="0.8"
            />
            <text
              x="510"
              y="168"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-300"
              font-size="13"
              font-weight="600"
            >
              読解＋照合
            </text>
            <text
              x="510"
              y="183"
              text-anchor="middle"
              class="fill-gray-400 dark:fill-gray-500"
              font-size="10"
              font-style="italic"
            >
              (認知負荷が高い)
            </text>

            <!-- メンタルモデル注釈 (矢印より後に描画) -->
            <rect
              x="580"
              y="129"
              width="160"
              height="16"
              rx="4"
              class="fill-white dark:fill-gray-900"
              opacity="0.8"
            />
            <text
              x="660"
              y="140"
              text-anchor="middle"
              class="fill-gray-400 dark:fill-gray-500"
              font-size="10"
              font-style="italic"
            >
              ＊コードを読みながら暗黙に構築
            </text>

            <!-- Arrow markers -->
            <defs>
              <marker
                id="before-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" class="fill-gray-500 dark:fill-gray-400" />
              </marker>
              <marker
                id="before-arrow-dim"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" class="fill-gray-300 dark:fill-gray-600" />
              </marker>
            </defs>
          </svg>

          <dl
            class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid sm:grid-cols-2 gap-4 text-sm"
          >
            <div>
              <dt
                class="text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-1"
              >
                レビュアーの問い
              </dt>
              <dd class="text-gray-900 dark:text-gray-100">「このコードは何をしているか？」</dd>
            </div>
            <div>
              <dt
                class="text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-1"
              >
                照合の対象
              </dt>
              <dd class="text-gray-900 dark:text-gray-100 font-semibold">
                コード ⇄ レビュアーが暗黙に構築するモデル
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- ============================================================
           After: 物語による照合
           ============================================================ -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span
            class="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase"
          >
            After
          </span>
          <h4 class="text-lg font-bold text-gray-900 dark:text-white">新手法（物語による照合）</h4>
        </div>

        <div
          class="rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20 p-5 md:p-6"
        >
          <svg
            viewBox="0 0 800 300"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-auto"
            role="img"
            aria-label="新手法: AIがコード（具体）から物語（抽象）を生成し、レビュアーが抽象レイヤー内で照合する図"
          >
            <!-- Layer divider -->
            <line
              x1="55"
              y1="155"
              x2="770"
              y2="155"
              class="stroke-amber-200 dark:stroke-amber-800"
              stroke-width="1"
              opacity="0.6"
            />

            <!-- Layer labels -->
            <text
              x="35"
              y="143"
              text-anchor="middle"
              font-size="10"
              font-weight="600"
              letter-spacing="0.15em"
              class="fill-gray-400 dark:fill-gray-500"
            >
              抽象
            </text>
            <text
              x="35"
              y="172"
              text-anchor="middle"
              font-size="10"
              font-weight="600"
              letter-spacing="0.15em"
              class="fill-gray-400 dark:fill-gray-500"
            >
              具体
            </text>

            <!-- ---- 上段: 抽象レイヤー ---- -->

            <!-- Reviewee avatar -->
            <g transform="translate(100, 35)">
              <circle
                r="20"
                class="fill-white dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600"
                stroke-width="1.5"
              />
              <circle cx="0" cy="-4" r="5" class="fill-gray-500 dark:fill-gray-400" />
              <path
                d="M -8 9 Q -8 1 0 1 Q 8 1 8 9 L 8 12 L -8 12 Z"
                class="fill-gray-500 dark:fill-gray-400"
              />
            </g>
            <text
              x="100"
              y="70"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="12"
              font-weight="600"
            >
              レビュイー
            </text>

            <!-- 意図 pill -->
            <rect
              x="50"
              y="85"
              width="100"
              height="40"
              rx="20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="4 4"
              class="text-gray-300 dark:text-gray-600"
            />
            <text
              x="100"
              y="110"
              text-anchor="middle"
              class="fill-gray-700 dark:fill-gray-300"
              font-size="14"
              font-weight="600"
            >
              意図
            </text>

            <!-- 物語 pill (solid fill) -->
            <rect
              x="400"
              y="85"
              width="100"
              height="40"
              rx="20"
              class="fill-gray-900 dark:fill-gray-100"
            />
            <text
              x="450"
              y="110"
              text-anchor="middle"
              class="fill-white dark:fill-gray-900"
              font-size="14"
              font-weight="700"
            >
              物語
            </text>

            <!-- Reviewer avatar (highlighted) -->
            <g transform="translate(680, 35)">
              <circle
                r="20"
                class="fill-white dark:fill-gray-800 stroke-amber-500 dark:stroke-amber-400"
                stroke-width="2"
              />
              <circle cx="0" cy="-4" r="5" class="fill-gray-500 dark:fill-gray-400" />
              <path
                d="M -8 9 Q -8 1 0 1 Q 8 1 8 9 L 8 12 L -8 12 Z"
                class="fill-gray-500 dark:fill-gray-400"
              />
            </g>
            <text
              x="680"
              y="70"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="12"
              font-weight="600"
            >
              レビュアー
            </text>

            <!-- Mental model pill (active) -->
            <rect
              x="605"
              y="85"
              width="150"
              height="40"
              rx="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-dasharray="4 4"
              class="text-gray-900 dark:text-gray-100"
            />
            <text
              x="680"
              y="110"
              text-anchor="middle"
              class="fill-gray-900 dark:fill-white"
              font-size="14"
              font-weight="700"
            >
              メンタルモデル
            </text>
            <text
              x="680"
              y="140"
              text-anchor="middle"
              class="fill-gray-400 dark:fill-gray-500"
              font-size="10"
              font-style="italic"
            >
              ＊事前に持ち込まれた予想・期待
            </text>

            <!-- ---- 下段: 具体レイヤー ---- -->

            <!-- Code rect -->
            <rect
              x="200"
              y="190"
              width="120"
              height="54"
              rx="10"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              class="text-gray-400 dark:text-gray-500"
            />
            <text
              x="260"
              y="222"
              text-anchor="middle"
              class="fill-gray-900 dark:fill-white"
              font-size="16"
              font-weight="700"
            >
              コード
            </text>

            <!-- ---- Edges ---- -->

            <!-- 実装: 意図 → コード (上→下) -->
            <path
              d="M 120 122 L 207 193"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="5 5"
              class="text-gray-300 dark:text-gray-600"
              marker-end="url(#after-arrow-dim)"
            />
            <rect
              x="129"
              y="138"
              width="38"
              height="18"
              rx="4"
              class="fill-amber-50 dark:fill-gray-900"
              opacity="0.85"
            />
            <text
              x="148"
              y="152"
              text-anchor="middle"
              class="fill-gray-500 dark:fill-gray-400"
              font-size="13"
              font-weight="500"
            >
              実装
            </text>

            <!-- AI物語化: コード → 物語 (下→上) -->
            <path
              d="M 315 193 L 425 122"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="text-amber-500 dark:text-amber-400"
              marker-end="url(#after-arrow-amber)"
            />

            <!-- AI sparkle on the arrow -->
            <g transform="translate(370, 158)">
              <circle
                r="14"
                class="fill-white dark:fill-gray-900 stroke-amber-400 dark:stroke-amber-500"
                stroke-width="1.5"
              />
              <path
                d="M 0 -7 L 1.8 -1.8 L 7 0 L 1.8 1.8 L 0 7 L -1.8 1.8 L -7 0 L -1.8 -1.8 Z"
                class="fill-amber-500 dark:fill-amber-400"
              />
            </g>
            <rect
              x="336"
              y="124"
              width="68"
              height="19"
              rx="4"
              class="fill-amber-50 dark:fill-gray-900"
              opacity="0.85"
            />
            <text
              x="370"
              y="138"
              text-anchor="middle"
              class="fill-amber-600 dark:fill-amber-400"
              font-size="13"
              font-weight="600"
            >
              AI物語化
            </text>

            <!-- 照合: 物語 ⇄ メンタルモデル (水平・同レイヤー内) -->
            <path
              d="M 500 105 L 605 105"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              class="text-amber-600 dark:text-amber-400"
              marker-start="url(#after-arrow-amber-start)"
              marker-end="url(#after-arrow-amber-end)"
            />
            <text
              x="552"
              y="92"
              text-anchor="middle"
              class="fill-amber-600 dark:fill-amber-400"
              font-size="14"
              font-weight="700"
            >
              照合
            </text>

            <!-- Arrow markers -->
            <defs>
              <marker
                id="after-arrow-dim"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" class="fill-gray-300 dark:fill-gray-600" />
              </marker>
              <marker
                id="after-arrow-amber"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" class="fill-amber-500 dark:fill-amber-400" />
              </marker>
              <marker
                id="after-arrow-amber-end"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7.5"
                markerHeight="7.5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" class="fill-amber-600 dark:fill-amber-400" />
              </marker>
              <marker
                id="after-arrow-amber-start"
                viewBox="0 0 10 10"
                refX="1"
                refY="5"
                markerWidth="7.5"
                markerHeight="7.5"
                orient="auto"
              >
                <path d="M 10 0 L 0 5 L 10 10 z" class="fill-amber-600 dark:fill-amber-400" />
              </marker>
            </defs>
          </svg>

          <dl
            class="mt-4 pt-4 border-t border-amber-200/60 dark:border-amber-800/40 grid sm:grid-cols-2 gap-4 text-sm"
          >
            <div>
              <dt
                class="text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-1"
              >
                レビュアーの問い
              </dt>
              <dd class="text-gray-900 dark:text-gray-100">
                「物語は自分のメンタルモデルと一致しているか？」
              </dd>
            </div>
            <div>
              <dt
                class="text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-1"
              >
                照合の対象
              </dt>
              <dd class="text-amber-700 dark:text-amber-300 font-semibold">
                物語 ⇄ レビュアーのメンタルモデル
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </Diagram>
</template>

<script setup lang="ts"></script>
