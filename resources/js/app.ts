import './bootstrap';
import '../css/app.css';

import { createApp } from 'vue';
import App from "@/App.vue";
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createPinia } from 'pinia'

// import { createInertiaApp } from '@inertiajs/vue3';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { ZiggyVue } from '../../vendor/tightenco/ziggy';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) => resolvePageComponent(`./IPages/${name}.vue`, import.meta.glob<DefineComponent>('./IPages/**/*.vue')),
//     setup({ el, App, props, plugin }) {
//         createApp({ render: () => h(App, props) })
//             .use(plugin)
//             .use(ZiggyVue)
//             .mount(el);
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });

const app = createApp(App)

const router = createRouter({
    history: createWebHistory()
})

const pinia = createPinia()

app.use(router)
app.use(pinia)

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
authStore.init().finally(() => {
    app.mount('#app')
})
