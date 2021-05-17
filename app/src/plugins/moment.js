import moment from 'moment';

moment.locale('en', {
    week: {
        dow : 1, // Monday is the first day of the week.
    }
});
moment.defaultFormat = 'yyyy-MM-DD';

export default function install (Vue) {
    Object.defineProperties(Vue.prototype, {
        $moment: {
            get () {
                return moment;
            }
        }
    });
}
