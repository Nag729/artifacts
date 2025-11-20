<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <template #fallback>
        <div
          class="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-[9999]"
        >
          <div class="flex flex-col items-center gap-4">
            <div
              class="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"
            />
            <p class="text-gray-600 dark:text-gray-400 text-sm">Now Loading...</p>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
