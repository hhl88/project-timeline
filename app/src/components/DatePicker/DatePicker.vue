<template>
    <v-menu
        ref='dialog'
        v-model='dialog'
        :close-on-content-click='false'
        transition='scale-transition'
        offset-y
        max-width='290px'
        min-width='auto'
    >
        <template v-slot:activator='{ on, attrs }'>
            <v-text-field
                outlined
                dense
                hide-details
                :class='className'
                v-model='dateFormatted'
                placeholder='DD.MM.YYYY'
                v-bind='attrs'
                @blur='date = parseDate(dateFormatted)'
                v-on='on'
                @change='handleDateText'
            ></v-text-field>
        </template>
        <v-date-picker
            v-model='date'
            color='primary'
            show-adjacent-months
            show-week
            :first-day-of-week='1'
            no-title
            scrollable
            @input='dialog = false'
            v-bind='propsToPass'
        ></v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: 'DatePicker',
    props: [
        'className',
        'value',
        'propsToPass'
    ],
    data: () => ({
        dialog: false,
        date: null,
        dateFormatted: null
    }),
    created() {
        if (this.value) {
            this.date = this.value;
        }
    },
    watch: {
        date: function() {
            this.dateFormatted = this.formatDate(this.date);
            this.$emit('onChangeDate', this.date);
        },
        value: function() {
            this.date = this.value;
        }
    },
    methods: {
        formatDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split('-');
            return `${day}.${month}.${year}`;
        },
        parseDate(date) {
            if (!date) return null;
            const [day, month, year] = date.split('.');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        handleDateText(str) {
            const date = this.$moment(str, 'DD.MM.YYYY');

            if (date.isValid()) {
                this.dateFormatted = date.format('DD.MM.YYYY');
                this.date = date.format();
            } else {
                this.dateFormatted = '';
                this.date = '';
            }
            this.dialog = false;
        }
    }

};
</script>

<style scoped>

</style>
