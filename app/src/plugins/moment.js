import moment from 'moment';

moment.locale('en');

export default function install (Vue) {
    Object.defineProperties(Vue.prototype, {
        $moment: {
            get () {
                return moment;
            }
        }
    });
}
