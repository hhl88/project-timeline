import { LocalStorage, SessionStorage } from '@/services/storage';

export default function install (Vue) {
    Object.defineProperties(Vue.prototype, {
        $localStorage: {
            get () {
                return LocalStorage;
            },
        },
        $sessionStorage: {
            get () {
                return SessionStorage;
            },
        }
    });
}
