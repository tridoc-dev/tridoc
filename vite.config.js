import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite'

export default defineConfig({
    plugins: [
        VueRouter({
            routesFolder: ['resources/js/pages'],
        }),
        laravel({
            input: 'resources/js/app.ts',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
