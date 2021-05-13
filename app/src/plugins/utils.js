import utils from '../utils/utils';

export default function install (Vue) {
    Object.defineProperties(Vue.prototype, {
        $utils: {
            get () {
                return utils;
            },

        }
    });
}


