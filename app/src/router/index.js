import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            enabled: false
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import( '@/views/About.vue'),
        meta: {
            enabled: false
        }
    },
    {
        path: '/time',
        name: 'Time',
        component: () => import('@/views/Time/Time.vue'),
        children: [
            {
                path: ':showType/:year/:month/:day',
                component: () => import('@/views/Time/Time.vue'),
            }
        ],
        meta: {
            enabled: true,
            showInHeader: true,
            requiresAuth: false
        }
    },
    {
        path: '*',
        component: () => import( '@/views/PageNotFound.vue'),
        meta: {
            enabled: true
        }
    }
];

store.dispatch('router/setRouter', routes.map(route => {
    return {
        path: route.path,
        name: route.name,
        meta: route.meta,
        active: false
    };
}));


const router = new VueRouter({
    mode: 'history',
    routes: routes.filter(r => r.meta && r.meta.enabled)
});

export default router;
