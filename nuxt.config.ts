import tailwindcss from "@tailwindcss/vite";
import { PrimeVuePreset } from "./primevue-theme";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/color-mode",
    "@primevue/nuxt-module",
    "@nuxt/image",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/google-fonts",
  ],
  colorMode: {
    classSuffix: "",
  },
  primevue: {
    options: {
      theme: {
        preset: PrimeVuePreset,
        options: {
          darkModeSelector: ".dark",
          cssLayer: {
            name: "primevue",
            order: "theme, base, primevue, components, utilities",
          },
        },
      },
    },
  },
  googleFonts: {
    families: {
      Poppins: true,
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  runtimeConfig: {
    public: {
      appName: "Nuxt Boilerplate",
    },
    apiUrl: process.env.API_URL,
  },

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});