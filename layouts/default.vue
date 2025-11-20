<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    <main class="max-w-5xl mx-auto px-4 py-8">
      <slot />
    </main>
    <footer class="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div class="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2025 Docs Site. Built with Nuxt Content.</p>
      </div>
    </footer>
  </div>
</template>
