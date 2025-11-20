// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },

    compatibilityDate: "2024-11-01",

    devtools: { enabled: true },

    modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxtjs/sitemap"],

    // Content module configuration
    content: {
        highlight: {
            theme: {
                default: "github-light",
                dark: "github-dark",
            },
        },
        markdown: {
            toc: {
                depth: 3,
                searchDepth: 3,
            },
        },
    },

    // Color mode configuration for dark mode
    colorMode: {
        classSuffix: "",
        preference: "system",
        fallback: "light",
    },

    // Tailwind CSS configuration
    tailwindcss: {
        cssPath: "~/assets/css/tailwind.css",
        configPath: "tailwind.config.js",
    },

    // Static site generation
    ssr: true,

    // App configuration
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            htmlAttrs: {
                lang: "ja",
            },
            link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
            meta: [{ name: "format-detection", content: "telephone=no" }],
        },
    },

    // Sitemap configuration
    site: {
        url: "https://nag729.github.io/artifacts/",
    },
});
