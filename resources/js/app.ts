import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob<DefineComponent>([
    './pages/**/*.vue',
    '../../vendor/dynasty/*/resources/js/pages/**/*.vue',
]);

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        if (name.includes('::')) {
            const [module, page] = name.split('::');

            return resolvePageComponent(
                `../../vendor/${module}/resources/js/pages/${page}.vue`,
                pages,
            );
        } else {
            return resolvePageComponent(`./pages/${name}.vue`, pages);
        }
    },
    progress: {
        color: '#4B5563',
    },
});
