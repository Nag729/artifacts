<template>
  <Diagram title="AIに渡すものの進化の系譜">
    <div class="overflow-x-auto pb-2">
      <div class="flex items-start min-w-max px-1 pt-8">
        <template v-for="(node, index) in nodes" :key="node.caption">
          <!-- Connector -->
          <div
            v-if="index > 0"
            class="mt-8 h-0.5 w-8 grow shrink-0"
            :class="
              node.status === 'goal'
                ? 'bg-amber-400 dark:bg-amber-500'
                : 'bg-gray-300 dark:bg-gray-600'
            "
          />

          <!-- Node -->
          <div class="relative flex w-24 flex-col items-center gap-2">
            <span
              v-if="node.status === 'now'"
              class="absolute -top-7 rounded-full bg-gray-900 dark:bg-gray-100 px-2.5 py-0.5 text-[10px] font-bold text-white dark:text-gray-900"
            >
              イマココ
            </span>
            <div
              class="flex h-16 w-16 items-center justify-center rounded-full border-2 text-center text-xs font-bold leading-tight whitespace-pre-line"
              :class="ballClasses(node)"
            >
              {{ node.label }}
            </div>
            <span class="whitespace-nowrap text-[11px]" :class="captionClasses(node)">
              {{ node.caption }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </Diagram>
</template>

<script setup lang="ts">
interface RailNode {
  label: string
  caption: string
  status?: 'now' | 'goal'
}

const nodes: readonly RailNode[] = [
  { label: '指示', caption: 'プロンプト' },
  { label: '行動\n空間', caption: 'ハーネス' },
  { label: '工程と\n検証', caption: 'ループ', status: 'now' },
  { label: '記憶', caption: '永続メモリ' },
  { label: '世界\nモデル', caption: 'デジタルツイン', status: 'goal' },
]

const ballClasses = (node: RailNode): string => {
  if (node.status === 'goal') {
    return 'border-amber-500 bg-amber-500 text-white dark:border-amber-400 dark:bg-amber-500'
  }
  if (node.status === 'now') {
    return 'border-gray-900 bg-white text-gray-900 dark:border-gray-100 dark:bg-gray-800 dark:text-gray-100'
  }
  return 'border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'
}

const captionClasses = (node: RailNode): string => {
  if (node.status === 'goal') {
    return 'font-semibold text-amber-600 dark:text-amber-400'
  }
  return 'text-gray-500 dark:text-gray-400'
}
</script>
