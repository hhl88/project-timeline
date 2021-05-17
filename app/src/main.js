import Vue from 'vue';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import moment from '@/plugins/moment.js';
import lodash from '@/plugins/lodash.js';
import utils from '@/plugins/utils.js';
import vuetify from '@/plugins/vuetify';
import axios from '@/plugins/axios';
import localStorage from '@/plugins/localStorage';

import interceptorsSetup from'@/services/interceptors';

import {mockBackend} from '@/__mocks__/mockBackend';

Vue.config.productionTip = false;

Vue.use(moment);
Vue.use(lodash);
Vue.use(utils);
Vue.use(axios);
Vue.use(localStorage);

router.beforeEach((to, from, next) => {
    document.title = to.name || 'Project Timeline';
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.loggedIn) {
            next();
            store.dispatch('setActiveRouter', to.path);
            return;
        }
        store.dispatch('setActiveRouter', '/login');
        next('/login');
    } else {
        store.dispatch('setActiveRouter', to.path);
        next();
    }
});

mockBackend();

new Vue({
    router,
    store,
    vuetify,
    created() {
        interceptorsSetup();
    },
    render: (h) => h(App),
}).$mount('#app');
