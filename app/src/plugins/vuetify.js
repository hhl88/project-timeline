import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import light from '@/themes/light';
import dark from '@/themes/dark';

Vuetify.config.silent = true;

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light,
            dark
        }
    },
};

export default new Vuetify(opts);
