import { createRouter, createWebHistory } from 'vue-router';

import ui from '../src/ui.vue';
import table from '../src/components/table.vue';

const routes = [
    {
        path: '/',
        component: ui
    },
    {
        path: '/table',
        component: table
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
