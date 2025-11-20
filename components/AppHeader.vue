<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
    <nav class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition">
        Docs
      </NuxtLink>

      <div class="flex items-center gap-4">
        <NuxtLink to="/tags" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
          タグ
        </NuxtLink>
        <ColorModeToggle />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>
