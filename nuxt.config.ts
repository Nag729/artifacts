// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    '@nuxt/icon',
  ],

  // Content module configuration
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
    experimental: {
      clientDB: true,
    },
  },

  // Components configuration
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Color mode configuration for dark mode
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },

  // Static site generation
  ssr: true,

  // Nitro configuration for full SSG
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false,
    },
  },

  // App configuration
  app: {
    baseURL: '/artifacts/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nag729 - artifacts',
      titleTemplate: '%s | Nag729 - artifacts',
      htmlAttrs: {
        lang: 'ja',
      },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/artifacts/favicon.svg' }],
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content: '開発・チーム運営に関する思考や手法をまとめたドキュメントサイト',
        },
      ],
    },
  },

  // Sitemap configuration
  site: {
    url: 'https://nag729.github.io',
  },
})
