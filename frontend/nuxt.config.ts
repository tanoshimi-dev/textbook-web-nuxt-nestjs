// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: ["@pinia/nuxt"],

    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000",
        },
    },

    devServer: {
        host: "0.0.0.0",
        port: 3001,
    },
    css: ["./app/assets/css/main.css"],
    vite: {
        server: {
            watch: {
                usePolling: true,
                interval: 1000,
            },
        },
        resolve: {
            alias: {
                "form-data": "form-data",
            },
        },
        optimizeDeps: {
            include: ["axios"],
        },
        plugins: [tailwindcss()],
    },

    //compatibilityDate: "2024-11-01",
    compatibilityDate: "2025-07-15",
});
