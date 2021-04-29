import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import moment from '@/plugins/moment.js';
import vuetify from '@/plugins/vuetify';


Vue.config.productionTip = false;

Vue.use(moment);

router.beforeEach((to, from, next) => {
    document.title = to.name || 'Project Timeline';
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.loggedIn) {
            next();
            store.dispatch('router/setActiveRouter', to.path);
            return;
        }
        store.dispatch('router/setActiveRouter', '/login');
        next('/login');
    } else {
        store.dispatch('router/setActiveRouter', to.path);
        next();
    }
});

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
