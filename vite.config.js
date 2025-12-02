import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/main.tsx"],
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.svg", "robots.txt", "icons/*.png"],
            manifest: {
                name: "BiblioHaus",
                short_name: "BiblioHaus",
                description: "Koleksi buku digital",
                theme_color: "#00a63e",
                background_color: "#ffffff",
                display: "standalone",
                start_url: "/",
                icons: [
                    { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
                    { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
                ]
            }
        })
    ],
});
