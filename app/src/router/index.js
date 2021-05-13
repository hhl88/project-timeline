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
        aliasPaths: ['/approve', '/missing_time'],
        component: () => import('@/components/RouterTabs/RouterTabs.vue'),
        props: {
            items: [
                { tab: 'Timesheet', route: '/time' },
                { tab: 'Pending Approval', route: '/approve' },
                { tab: 'Unsubmitted', route: '/missing_time' },
            ]
        },
        children: [
            {
                path: '',
                component: () => import('@/views/TimeSheet/Timesheet.vue')
            },
            {
                path: ':showType/:year/:month/:day',
                component: () => import('@/views/TimeSheet/Timesheet.vue')
            }

        ],
        meta: {
            enabled: true,
            showInHeader: true,
            requiresAuth: false
        }
    },
    {
        path: '/approve',
        name: 'Approval',
        component: () => import('@/components/RouterTabs/RouterTabs.vue'),
        props: {
            items: [
                { tab: 'Timesheet', route: '/time' },
                { tab: 'Pending Approval', route: '/approve' },
                { tab: 'Unsubmitted', route: '/missing_time' },
            ]
        },
        children: [
            {
                path: '',
                component: () => import('@/views/PendingApproval/PendingApproval.vue')
            }
        ],
        meta: {
            enabled: true,
            showInHeader: false,
            requiresAuth: false
        }
    },
    {
        path: '/missing_time',
        name: 'Unsubmitted Timesheets',
        component: () => import('@/components/RouterTabs/RouterTabs.vue'),
        props: {
            items: [
                { tab: 'Timesheet', route: '/time' },
                { tab: 'Pending Approval', route: '/approve' },
                { tab: 'Unsubmitted', route: '/missing_time' },
            ]
        },
        children: [
            {
                path: '',
                component: () => import('@/views/UnsubmittedTimesheets/UnsubmittedTimesheets.vue')
            }
        ],
        meta: {
            enabled: true,
            showInHeader: false,
            requiresAuth: false
        }
    },
    {
        path: '/reports',
        name: 'Reports',
        component: () => import('@/components/RouterTabs/RouterTabs.vue'),
        props: {
            items: [
                { tab: 'Time', route: '/reports' }
            ]
        },
        children: [
            {
                path: '',
                component: () => import('@/views/Reports/Reports.vue')
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
        aliasPaths: route.aliasPaths,
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
