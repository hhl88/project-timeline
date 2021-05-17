import http from '@/services/axios';

export default function install (Vue) {
    Object.defineProperties(Vue.prototype, {
        $axios: {
            get () {
                return http;
            },

        }
    });
}
