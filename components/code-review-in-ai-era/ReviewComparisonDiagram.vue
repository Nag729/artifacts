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
            viewBox="0 0 800 280"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-auto"
            role="img"
            aria-label="従来のコードレビュー: コードからレビュアーが暗黙にメンタルモデルを構築する図"
          >
            <!-- Edges -->
            <path
              d="M 145 150 L 345 150"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-dasharray="5 5"
              class="text-gray-300 dark:text-gray-600"
              marker-end="url(#review-arrow-faded)"
            />
            <path
              d="M 455 150 L 645 150"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              class="text-gray-400 dark:text-gray-500"
              marker-end="url(#review-arrow)"
            />

            <!-- Edge labels -->
            <text
              x="245"
              y="138"
              text-anchor="middle"
              class="fill-gray-500 dark:fill-gray-400"
              font-size="14"
              font-weight="500"
            >
              実装
            </text>
            <text
              x="550"
              y="138"
              text-anchor="middle"
              class="fill-gray-500 dark:fill-gray-400"
              font-size="14"
              font-weight="500"
            >
              読解＋解釈
            </text>

            <!-- Reviewee avatar -->
            <g transform="translate(85, 55)">
              <circle
                r="26"
                class="fill-white dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600"
                stroke-width="1.5"
              />
              <circle cx="0" cy="-6" r="6" class="fill-gray-500 dark:fill-gray-400" />
              <path
                d="M -10 11 Q -10 1 0 1 Q 10 1 10 11 L 10 14 L -10 14 Z"
                class="fill-gray-500 dark:fill-gray-400"
              />
            </g>
            <text
              x="85"
              y="100"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="13"
              font-weight="600"
            >
              レビュイー
            </text>

            <!-- 意図 bubble -->
            <rect
              x="35"
              y="125"
              width="100"
              height="50"
              rx="25"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="4 4"
              class="text-gray-300 dark:text-gray-600"
            />
            <text
              x="85"
              y="156"
              text-anchor="middle"
              class="fill-gray-700 dark:fill-gray-300"
              font-size="15"
              font-weight="600"
            >
              意図
            </text>

            <!-- Code rect -->
            <rect
              x="345"
              y="120"
              width="110"
              height="60"
              rx="10"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              class="text-gray-400 dark:text-gray-500"
            />
            <text
              x="400"
              y="156"
              text-anchor="middle"
              class="fill-gray-900 dark:fill-white"
              font-size="17"
              font-weight="700"
            >
              コード
            </text>

            <!-- Mental model bubble (faded) -->
            <rect
              x="645"
              y="125"
              width="140"
              height="50"
              rx="25"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="4 4"
              class="text-gray-300 dark:text-gray-600"
              opacity="0.65"
            />
            <text
              x="715"
              y="156"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="15"
              font-weight="500"
              opacity="0.75"
            >
              メンタルモデル
            </text>

            <!-- Reviewer avatar -->
            <g transform="translate(715, 55)">
              <circle
                r="26"
                class="fill-white dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600"
                stroke-width="1.5"
              />
              <circle cx="0" cy="-6" r="6" class="fill-gray-500 dark:fill-gray-400" />
              <path
                d="M -10 11 Q -10 1 0 1 Q 10 1 10 11 L 10 14 L -10 14 Z"
                class="fill-gray-500 dark:fill-gray-400"
              />
            </g>
            <text
              x="715"
              y="100"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="13"
              font-weight="600"
            >
              レビュアー
            </text>
            <text
              x="715"
              y="210"
              text-anchor="middle"
              class="fill-gray-500 dark:fill-gray-500"
              font-size="13"
              font-style="italic"
            >
              ＊コードを読みながら暗黙に構築
            </text>

            <!-- Arrow markers -->
            <defs>
              <marker
                id="review-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" class="fill-gray-400 dark:fill-gray-500" />
              </marker>
              <marker
                id="review-arrow-faded"
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
            viewBox="0 0 800 280"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-auto"
            role="img"
            aria-label="新手法: AIが物語を生成し、レビュアーのメンタルモデルと照合する図"
          >
            <!-- Edges -->
            <path
              d="M 145 150 L 200 150"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-dasharray="5 5"
              class="text-gray-300 dark:text-gray-600"
              marker-end="url(#review-arrow-faded-after)"
            />
            <path
              d="M 310 150 L 405 150"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              class="text-gray-400 dark:text-gray-500"
              marker-end="url(#review-arrow-after)"
            />
            <path
              d="M 515 150 L 645 150"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              class="text-amber-600 dark:text-amber-400"
              marker-start="url(#review-arrow-strong-start)"
              marker-end="url(#review-arrow-strong)"
            />

            <!-- Edge labels -->
            <text
              x="166"
              y="138"
              text-anchor="middle"
              class="fill-gray-500 dark:fill-gray-400"
              font-size="14"
              font-weight="500"
            >
              実装
            </text>
            <text
              x="357"
              y="195"
              text-anchor="middle"
              class="fill-gray-500 dark:fill-gray-400"
              font-size="14"
              font-weight="500"
            >
              AI物語化
            </text>
            <text
              x="580"
              y="138"
              text-anchor="middle"
              class="fill-amber-600 dark:fill-amber-400"
              font-size="15"
              font-weight="700"
            >
              照合
            </text>

            <!-- Reviewee avatar -->
            <g transform="translate(85, 55)">
              <circle
                r="26"
                class="fill-white dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600"
                stroke-width="1.5"
              />
              <circle cx="0" cy="-6" r="6" class="fill-gray-500 dark:fill-gray-400" />
              <path
                d="M -10 11 Q -10 1 0 1 Q 10 1 10 11 L 10 14 L -10 14 Z"
                class="fill-gray-500 dark:fill-gray-400"
              />
            </g>
            <text
              x="85"
              y="100"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="13"
              font-weight="600"
            >
              レビュイー
            </text>

            <!-- 意図 bubble -->
            <rect
              x="35"
              y="125"
              width="100"
              height="50"
              rx="25"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-dasharray="4 4"
              class="text-gray-300 dark:text-gray-600"
            />
            <text
              x="85"
              y="156"
              text-anchor="middle"
              class="fill-gray-700 dark:fill-gray-300"
              font-size="15"
              font-weight="600"
            >
              意図
            </text>

            <!-- Code rect -->
            <rect
              x="200"
              y="120"
              width="110"
              height="60"
              rx="10"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              class="text-gray-400 dark:text-gray-500"
            />
            <text
              x="255"
              y="156"
              text-anchor="middle"
              class="fill-gray-900 dark:fill-white"
              font-size="17"
              font-weight="700"
            >
              コード
            </text>

            <!-- AI sparkle -->
            <g transform="translate(357, 150)">
              <circle
                r="16"
                class="fill-white dark:fill-gray-900 stroke-amber-400 dark:stroke-amber-500"
                stroke-width="1.75"
              />
              <path
                d="M 0 -9 L 2.2 -2.2 L 9 0 L 2.2 2.2 L 0 9 L -2.2 2.2 L -9 0 L -2.2 -2.2 Z"
                class="fill-amber-500 dark:fill-amber-400"
              />
            </g>

            <!-- 物語 rect (filled, abstract) -->
            <rect
              x="405"
              y="125"
              width="110"
              height="50"
              rx="25"
              class="fill-gray-900 dark:fill-gray-100"
            />
            <text
              x="460"
              y="156"
              text-anchor="middle"
              class="fill-white dark:fill-gray-900"
              font-size="15"
              font-weight="700"
            >
              物語
            </text>

            <!-- Mental model bubble (active) -->
            <rect
              x="645"
              y="125"
              width="140"
              height="50"
              rx="25"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-dasharray="4 4"
              class="text-gray-900 dark:text-gray-100"
            />
            <text
              x="715"
              y="156"
              text-anchor="middle"
              class="fill-gray-900 dark:fill-white"
              font-size="15"
              font-weight="700"
            >
              メンタルモデル
            </text>

            <!-- Reviewer avatar (highlighted) -->
            <g transform="translate(715, 55)">
              <circle
                r="26"
                class="fill-white dark:fill-gray-800 stroke-amber-500 dark:stroke-amber-400"
                stroke-width="2"
              />
              <circle cx="0" cy="-6" r="6" class="fill-gray-500 dark:fill-gray-400" />
              <path
                d="M -10 11 Q -10 1 0 1 Q 10 1 10 11 L 10 14 L -10 14 Z"
                class="fill-gray-500 dark:fill-gray-400"
              />
            </g>
            <text
              x="715"
              y="100"
              text-anchor="middle"
              class="fill-gray-600 dark:fill-gray-400"
              font-size="13"
              font-weight="600"
            >
              レビュアー
            </text>
            <text
              x="715"
              y="210"
              text-anchor="middle"
              class="fill-gray-500 dark:fill-gray-500"
              font-size="13"
              font-style="italic"
            >
              ＊事前に持ち込まれた予想・期待
            </text>

            <!-- Arrow markers -->
            <defs>
              <marker
                id="review-arrow-after"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" class="fill-gray-400 dark:fill-gray-500" />
              </marker>
              <marker
                id="review-arrow-faded-after"
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
                id="review-arrow-strong"
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
                id="review-arrow-strong-start"
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
