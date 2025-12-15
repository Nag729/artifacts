<template>
  <Diagram>
    <div class="relative">
      <!-- 縦軸（抽象↔具体）デスクトップのみ表示 -->
      <div
        class="hidden md:flex absolute left-0 top-0 bottom-0 flex-col justify-between items-center w-12 md:w-16"
      >
        <span class="text-xs font-medium text-gray-600 dark:text-gray-400">抽象</span>
        <div class="flex-1 w-0.5 bg-gray-300 dark:bg-gray-600 my-2"></div>
        <span class="text-xs font-medium text-gray-600 dark:text-gray-400">具体</span>
      </div>

      <!-- メインコンテンツ -->
      <div class="md:ml-16 md:pl-4">
        <!-- 時間軸ラベル（デスクトップのみ） -->
        <div
          class="hidden md:flex items-center justify-between mb-6 pb-2 border-b-2 border-gray-300 dark:border-gray-600"
        >
          <span class="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">過去</span>
          <div class="text-gray-400">→</div>
          <span class="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">現在</span>
          <div class="text-gray-400">→</div>
          <span class="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">未来</span>
        </div>

        <!-- 3つの時点での幹の位置 -->
        <div class="flex flex-col space-y-6 md:space-y-0 md:relative md:min-h-[320px]">
          <!-- 過去の幹（具体寄り・グレーアウト） -->
          <div
            class="flex flex-col items-center opacity-70 md:opacity-50 md:absolute md:left-[8%] md:top-[200px] w-full md:max-w-[160px]"
          >
            <div
              class="bg-gray-100 dark:bg-gray-800 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-gray-400 dark:border-gray-600 mb-2"
            >
              <span class="text-xl md:text-2xl">🌳</span>
            </div>
            <p class="text-xs font-bold text-gray-700 dark:text-gray-400 text-center mb-1">
              過去の幹
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-500 text-center leading-tight">
              「スライドは10枚で...」「グラフは棒グラフで...」
            </p>
          </div>

          <!-- 現在の幹（中間・強調） -->
          <div
            class="flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[100px] w-full md:max-w-[180px]"
          >
            <div
              class="bg-green-50 dark:bg-green-900/30 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border-3 border-green-500 shadow-lg mb-2"
            >
              <span class="text-2xl md:text-3xl">🌳</span>
            </div>
            <p
              class="text-xs font-bold text-green-900 dark:text-green-200 text-center mb-1 whitespace-nowrap"
            >
              現在の幹
            </p>
            <p class="text-xs text-gray-700 dark:text-gray-300 text-center leading-tight">
              「店舗スタッフ向けに...」「LT用に...」
            </p>
          </div>

          <!-- 未来の幹（抽象寄り・点線） -->
          <div
            class="flex flex-col items-center md:absolute md:right-[8%] md:top-0 w-full md:max-w-[160px]"
          >
            <div
              class="bg-blue-50/50 dark:bg-blue-900/20 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-dashed border-blue-400 dark:border-blue-600 mb-2"
            >
              <span class="text-xl md:text-2xl opacity-70">🌳</span>
            </div>
            <p
              class="text-xs font-bold text-blue-900 dark:text-blue-300 text-center mb-1 whitespace-nowrap"
            >
              未来の幹
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">
              「ユーザー満足度を...」「企業全体の成長を...」
            </p>
          </div>

          <!-- 移動を示す矢印（SVG・デスクトップのみ） -->
          <svg
            class="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
            style="z-index: -1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- 過去→現在 -->
            <path
              d="M 15% 205 Q 35% 170 50% 115"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-dasharray="5,5"
              class="text-green-400 dark:text-green-600"
              marker-end="url(#arrowhead)"
            />
            <!-- 現在→未来 -->
            <path
              d="M 50% 115 Q 65% 60 85% 25"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-dasharray="5,5"
              class="text-green-400 dark:text-green-600"
              marker-end="url(#arrowhead)"
            />
            <!-- 矢印の定義 -->
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3, 0 6"
                  fill="currentColor"
                  class="text-green-400 dark:text-green-600"
                />
              </marker>
            </defs>
          </svg>
        </div>

        <!-- 説明 -->
        <div
          class="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <span>📈</span>
          <span>AIの能力向上に伴い、「幹」の最適点が抽象方向に移動している</span>
        </div>
      </div>
    </div>
  </Diagram>
</template>

<script setup lang="ts"></script>
