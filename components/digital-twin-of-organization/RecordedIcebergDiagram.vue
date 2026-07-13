<template>
  <Diagram title="エージェントが漁れるのは水面上だけ">
    <div class="flex flex-col">
      <!-- 水面上: 記録されている -->
      <div
        class="rounded-t-xl border-2 border-b-0 border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800"
      >
        <div class="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span class="text-sm font-bold text-gray-900 dark:text-gray-100">
            デジタルに記録されている
          </span>
          <span class="text-[11px] text-gray-500 dark:text-gray-400">
            コード・ドキュメント・チャットログ
          </span>
        </div>
        <p class="m-0 text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
          → エージェントが自力で復元できる。コモディティ化していく
        </p>
      </div>

      <!-- 水面線 -->
      <div class="relative flex items-center" aria-hidden="true">
        <svg
          class="h-4 w-full text-gray-400 dark:text-gray-500"
          viewBox="0 0 400 16"
          preserveAspectRatio="none"
        >
          <path
            d="M0 8 Q 12.5 0, 25 8 T 50 8 T 75 8 T 100 8 T 125 8 T 150 8 T 175 8 T 200 8 T 225 8 T 250 8 T 275 8 T 300 8 T 325 8 T 350 8 T 375 8 T 400 8"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
        <span
          class="absolute right-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-400"
        >
          水面
        </span>
      </div>

      <!-- 水面下: 記録されていない -->
      <div
        class="rounded-b-xl border-2 border-t-0 border-amber-400 bg-amber-50 p-4 dark:border-amber-500 dark:bg-amber-950/40"
      >
        <div class="mb-3">
          <span class="text-sm font-bold text-amber-700 dark:text-amber-400">
            記録されていない
          </span>
        </div>
        <div class="mb-3 flex flex-col gap-2 sm:flex-row">
          <div
            v-for="item in hiddenItems"
            :key="item.label"
            class="flex-1 rounded-lg border border-amber-300 bg-white px-3 py-2 dark:border-amber-600/60 dark:bg-gray-800"
          >
            <p class="m-0 text-xs font-bold text-gray-900 dark:text-gray-100">
              {{ item.label }}
            </p>
            <p class="m-0 mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-gray-400">
              {{ item.note }}
            </p>
          </div>
        </div>
        <p class="m-0 text-[11px] leading-relaxed font-semibold text-amber-700 dark:text-amber-400">
          → どんなに賢いエージェントも漁れない。外部化しないと存在しない
        </p>
      </div>
    </div>
  </Diagram>
</template>

<script setup lang="ts">
interface HiddenItem {
  label: string
  note: string
}

const hiddenItems: readonly HiddenItem[] = [
  { label: '意思決定の Why', note: '記録には結論だけが残る' },
  { label: '現場の運用実態', note: 'マニュアルと必ず乖離する' },
  { label: '判断基準（evals）', note: '事実の集積から導けない' },
]
</script>
