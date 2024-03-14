import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
        coverage: {
            provider: 'istanbul'
        }
	},
    plugins: [vue(), VitePWA({
        registerType: 'autoUpdate',
        manifest: {
            name: 'DWA',
            theme_color: 'black',
            icons: [
                { src: '/logo.svg', type: 'image/svg+xml', sizes: '256x256' }
            ]
        }
    })],
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()]
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
