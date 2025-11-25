<template>
  <div class="card p-6 animate-pulse">
    <!-- Title skeleton -->
    <div class="h-7 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>

    <!-- Description skeleton -->
    <div class="space-y-2 mb-4">
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>

    <!-- Tags skeleton -->
    <div class="flex flex-wrap gap-2 mb-4">
      <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div class="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>

    <!-- Date skeleton -->
    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>

    <!-- Like button skeleton -->
    <div class="absolute bottom-5 right-5">
      <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
        <div class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div class="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
