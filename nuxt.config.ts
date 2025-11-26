// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    '@nuxt/icon',
    'dayjs-nuxt',
    '@pinia/nuxt',
  ],

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
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/artifacts/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800&family=Outfit:wght@400;500;600;700&display=swap',
        },
      ],
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content: '開発・チーム運営に関する思考や手法をまとめたドキュメントサイト',
        },
        {
          name: 'google-site-verification',
          content: 'ViuR1uP2Q4Yr5b2nk8nhKSWy5DF3Y9Gqvbx8NwxFK0w',
        },
      ],
    },
  },

  // Sitemap configuration
  site: {
    url: 'https://nag729.github.io',
  },

  // Runtime config for Supabase
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY || '',
    },
  },
})
