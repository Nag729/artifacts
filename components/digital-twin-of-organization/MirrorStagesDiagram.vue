<template>
  <Diagram title="写像の4段階 — 地図から法典へ">
    <div class="overflow-x-auto pb-2">
      <div class="flex min-w-max items-end justify-center gap-0 px-1 pt-10">
        <template v-for="(stage, index) in stages" :key="stage.name">
          <!-- 転換点マーカー（模擬 → 操作） -->
          <div v-if="index === 2" class="relative mx-1 self-stretch">
            <div
              class="h-full w-0.5 border-l-2 border-dashed border-amber-400 dark:border-amber-500"
            />
            <span
              class="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white"
            >
              地図 → 法典
            </span>
          </div>

          <!-- 段 -->
          <div class="flex w-36 flex-col justify-end" :class="index > 0 ? 'ml-1' : ''">
            <div
              class="flex flex-col justify-start rounded-t-lg border-2 border-b-0 p-3"
              :class="[stage.heightClass, stageClasses(index)]"
            >
              <p class="m-0 text-xs font-bold" :class="nameClasses(index)">
                {{ stage.name }}
                <span class="ml-1 text-[10px] font-normal opacity-70">{{ stage.en }}</span>
              </p>
              <p class="m-0 mt-1 text-[10px] leading-snug" :class="descClasses(index)">
                {{ stage.description }}
              </p>
            </div>
            <div class="h-1 rounded-sm bg-gray-400 dark:bg-gray-500" />
          </div>
        </template>
      </div>
    </div>
  </Diagram>
</template>

<script setup lang="ts">
interface Stage {
  name: string
  en: string
  description: string
  heightClass: string
}

const stages: readonly Stage[] = [
  {
    name: '写像',
    en: 'mirror',
    description: '現実を読み取り専用で写す',
    heightClass: 'h-20',
  },
  {
    name: '模擬',
    en: 'simulation',
    description: '「もしこうしたら」を先に実行',
    heightClass: 'h-28',
  },
  {
    name: '操作',
    en: 'actuation',
    description: '書き込みが現実を動かす',
    heightClass: 'h-36',
  },
  {
    name: '自律',
    en: 'autonomy',
    description: '日常運転を回す',
    heightClass: 'h-44',
  },
]

// 転換点（index >= 2）以降は規範側として amber で示す
const isNormative = (index: number): boolean => index >= 2

const stageClasses = (index: number): string =>
  isNormative(index)
    ? 'border-amber-400 bg-amber-50 dark:border-amber-500 dark:bg-amber-950/40'
    : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'

const nameClasses = (index: number): string =>
  isNormative(index) ? 'text-amber-700 dark:text-amber-400' : 'text-gray-900 dark:text-gray-100'

const descClasses = (index: number): string =>
  isNormative(index)
    ? 'text-amber-700/80 dark:text-amber-400/80'
    : 'text-gray-500 dark:text-gray-400'
</script>
