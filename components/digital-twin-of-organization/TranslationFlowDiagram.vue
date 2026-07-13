<template>
  <Diagram title="「翻訳者」の世代交代">
    <div class="flex flex-col">
      <template v-for="(era, index) in eras" :key="era.label">
        <!-- 世代間の橋渡し -->
        <div v-if="index > 0" class="flex items-center justify-center gap-2 py-2">
          <span class="text-amber-500 dark:text-amber-400" aria-hidden="true">↓</span>
          <span class="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            翻訳の対象が一段上がる
          </span>
        </div>

        <div
          class="rounded-xl border-2 p-3"
          :class="
            era.highlight
              ? 'border-amber-400 bg-amber-50/60 dark:border-amber-500 dark:bg-amber-950/30'
              : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-900'
          "
        >
          <div class="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span
              class="text-[11px] font-bold tracking-wide"
              :class="
                era.highlight
                  ? 'text-amber-700 dark:text-amber-400'
                  : 'text-gray-500 dark:text-gray-400'
              "
            >
              {{ era.label }}
            </span>
            <span class="text-[10px] text-gray-500 dark:text-gray-400">
              受け皿：{{ era.receiver }}
            </span>
          </div>

          <div class="overflow-x-auto pb-1">
            <div class="flex min-w-max items-stretch justify-center">
              <template v-for="(step, stepIndex) in era.steps" :key="step.title">
                <div
                  v-if="stepIndex > 0"
                  class="flex items-center px-1 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                >
                  →
                </div>
                <div
                  class="flex flex-col justify-center rounded-lg border-2 bg-white p-2.5 dark:bg-gray-800"
                  :class="[
                    step.translator ? 'w-44' : 'w-32',
                    step.translator && era.highlight
                      ? 'border-amber-500 dark:border-amber-400'
                      : step.translator
                        ? 'border-gray-400 dark:border-gray-500'
                        : 'border-gray-300 dark:border-gray-600',
                  ]"
                >
                  <p
                    class="m-0 text-xs font-bold"
                    :class="
                      step.translator && era.highlight
                        ? 'text-amber-700 dark:text-amber-400'
                        : 'text-gray-900 dark:text-gray-100'
                    "
                  >
                    {{ step.title }}
                  </p>
                  <p class="m-0 mt-0.5 text-[10px] leading-snug text-gray-500 dark:text-gray-400">
                    {{ step.note }}
                  </p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </Diagram>
</template>

<script setup lang="ts">
interface EraStep {
  title: string
  note: string
  translator?: boolean
}

interface Era {
  label: string
  receiver: string
  highlight?: boolean
  steps: readonly EraStep[]
}

const eras: readonly Era[] = [
  {
    label: 'IT革命',
    receiver: 'コンピュータ',
    steps: [
      { title: '手続き', note: '紙の業務・ルール' },
      {
        title: '手続きをコードに翻訳する人',
        note: '＝ソフトウェアエンジニア',
        translator: true,
      },
      { title: 'コード', note: '機械が実行できる形' },
    ],
  },
  {
    label: 'AI時代',
    receiver: 'LLM',
    highlight: true,
    steps: [
      { title: '現実', note: '暗黙知・制度の制約' },
      {
        title: '現実を構造に翻訳する人',
        note: 'モデリング力 × 越境力',
        translator: true,
      },
      { title: '写像（ツイン）', note: '機械が推論できる形' },
    ],
  },
]
</script>
