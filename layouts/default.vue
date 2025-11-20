<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    <main class="max-w-5xl mx-auto px-4 py-8">
      <slot />
    </main>
    <footer class="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div class="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          © 2025
          <a
            href="https://github.com/Nag729"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            Nag729
          </a>
          - artifacts. Built with Nuxt Content.
        </p>
      </div>
    </footer>
  </div>
</template>
