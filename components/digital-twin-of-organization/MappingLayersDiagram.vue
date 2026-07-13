<template>
  <Diagram title="写像する3つの領域">
    <div class="flex flex-col items-center">
      <!-- 頂点: プロダクト -->
      <div
        class="z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-gray-300 bg-white p-3 text-center dark:border-gray-600 dark:bg-gray-800"
      >
        <p class="m-0 text-sm font-bold text-gray-900 dark:text-gray-100">プロダクト</p>
        <p class="m-0 mt-1 text-[10px] leading-snug text-gray-500 dark:text-gray-400">
          ドメインモデル・設計判断
        </p>
        <p class="m-0 mt-1 text-[10px] text-gray-400 dark:text-gray-500">コードに大半が残る</p>
      </div>

      <!-- 底辺: 顧客（左下・堀）とチーム -->
      <div class="-mt-5 flex gap-4 sm:gap-14">
        <div
          class="relative flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-amber-400 bg-amber-50 p-3 text-center dark:border-amber-500 dark:bg-amber-950/60"
        >
          <span
            class="absolute top-1 left-0 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white"
          >
            堀
          </span>
          <p class="m-0 text-sm font-bold text-amber-700 dark:text-amber-400">顧客</p>
          <p class="m-0 mt-1 text-[10px] leading-snug text-amber-700/80 dark:text-amber-400/80">
            現場の運用実態
            <br />
            制度の制約
          </p>
          <p class="m-0 mt-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
            ほぼ記録されない
          </p>
        </div>

        <div
          class="flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-gray-300 bg-white p-3 text-center dark:border-gray-600 dark:bg-gray-800"
        >
          <p class="m-0 text-sm font-bold text-gray-900 dark:text-gray-100">チーム</p>
          <p class="m-0 mt-1 text-[10px] leading-snug text-gray-500 dark:text-gray-400">
            意思決定の経緯・レビュー観点
          </p>
          <p class="m-0 mt-1 text-[10px] text-gray-400 dark:text-gray-500">記録に残るのは一部</p>
        </div>
      </div>

      <p class="m-0 mt-4 text-center text-[10px] text-gray-500 dark:text-gray-400">
        3つを合わせて組織の現実を写像する。最も模倣困難なのが
        <span class="font-semibold text-amber-600 dark:text-amber-400">顧客領域</span>
      </p>
    </div>
  </Diagram>
</template>
