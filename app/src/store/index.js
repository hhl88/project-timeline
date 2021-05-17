import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import timeSheets from './timeSheets';
import users from './users';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        router,
        timeSheets,
        users
    },
    strict: debug
});
