import _ from 'lodash';


export default function install (Vue) {
    Object.defineProperties(Vue.prototype, {
        $_: {
            get () {
                return _;
            }
        }
    });
}

