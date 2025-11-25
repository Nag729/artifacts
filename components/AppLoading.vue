<template>
  <div class="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-[9998] flex flex-col">
    <!-- Header Skeleton -->
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
      <nav class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo skeleton -->
        <div class="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>

        <!-- Nav items skeleton -->
        <div class="flex items-center gap-6">
          <div class="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </nav>
    </header>

    <!-- Main Content Skeleton -->
    <main class="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
      <!-- Hero Section Skeleton -->
      <section class="text-center mb-16 py-16 px-4">
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto mb-6"></div>
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
      </section>

      <!-- Article Cards Skeleton -->
      <section>
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-8"></div>

        <div class="grid gap-6">
          <div v-for="i in 3" :key="i" class="card p-6">
            <!-- Title -->
            <div class="h-7 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>

            <!-- Description -->
            <div class="space-y-2 mb-4">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>

            <!-- Date -->
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer Skeleton -->
    <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
      <div class="max-w-5xl mx-auto px-4 py-8 text-center">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>
