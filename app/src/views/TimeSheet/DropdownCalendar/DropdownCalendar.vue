<template>
    <BaseDropdown
        :btn-class-name="['btn', 'btn-icon', $style['btn-calendar']]"
        :value='pickerDate'
        :close-menu='closeCalendar'
        :props-to-pass='{
                        nudgeLeft: 125,
                        nudgeBottom: 10
                    }'
    >
        <template v-slot:btn-label>
            <v-icon>mdi-calendar-month</v-icon>
        </template>
        <template v-slot:dropdown-content>
            <v-date-picker
                :value='pickerDate'
                color='primary'
                show-adjacent-months
                :first-day-of-week='1'
                no-title
                scrollable
                v-on:click:date='onSelectDate'
            />
        </template>
    </BaseDropdown>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown';

export default {
    name: 'DropdownCalendar',
    components: { BaseDropdown },
    props: [
        'btnClassName',
        'propsToPass',
        'onClick',
        'value'
    ],
    data: () => ({
        pickerDate: null,
        closeCalendar: 0
    }),
    created() {
        this.pickerDate = this.value;
    },
    methods: {
        onSelectDate: function(newDate) {
            this.closeCalendar++;
            this.$emit('onSelectDate', newDate);
        }
    },
    watch: {
        value: function(newDate) {
            this.pickerDate = newDate;
        }
    }
};
</script>

<style module lang='scss'>
@import "style";
</style>
