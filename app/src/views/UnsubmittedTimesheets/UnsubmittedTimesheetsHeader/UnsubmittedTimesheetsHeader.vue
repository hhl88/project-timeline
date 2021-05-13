<template>
    <div class='unsubmitted-timesheets-header-wrapper'>
        <div class='header'>Unsubmitted timesheets</div>
        <div class='hint'>
            You can remind people to submit their timesheets from the table below. You can also set up automatic
            Timesheet Reminders in your
            <router-link to='/company/account'>account settings</router-link>
            <span>.</span>
        </div>
        <div class='interval-selection-wrapper'>
            <Dropdown
                :btn-class-name='$style["btn"]'
                :label='showOptions[selectedShowOptionIdx]'
                :value='selectedShowOptionIdx'
                :list='showOptions.map((s, i)=>({id: i, title: s}))'
                @onSelectItem='handleSelectShowOption'
            />
            <div class='interval-wrapper' v-if='selectedShowOptionIdx === showOptions.length - 1'>
                <span>View unsubmitted timesheets from</span>
                <DatePicker
                    :value='startInterval'
                    :class-name='$style["date-picker"]'
                    :props-to-pass='{ max: $moment().format()}'
                    @onChangeDate='handleChangeDate' />

                <span>to</span>
                <v-text-field
                    outlined
                    dense
                    hide-details
                    :value='endInterval'
                    :class='$style["date-picker"]'
                    readonly
                ></v-text-field>
                <Button @onClick='$emit("onUpdateTimesheets")'>
                    <template v-slot:btn-label>
                        Update Timesheets
                    </template>
                </Button>
            </div>

        </div>
    </div>
</template>

<script>
import Dropdown from '@/components/Dropdown/Dropdown';
import Button from '@/components/Button/Button';
import DatePicker from '@/components/DatePicker/DatePicker';

export default {
    name: 'UnsubmittedTimesheetsHeader',
    components: { Dropdown, Button, DatePicker },
    props: [
        'startDate'
    ],

    data: () => ({
        showOptions: ['This Week', 'Last Week', 'Two Weeks ago', 'Custom'],
        selectedShowOptionIdx: 0,
        startInterval: null,
        endInterval: null
    }),
    created() {
        if (this.startDate) {
            this.handleChangeDate(this.startDate);
        }
    },
    methods: {
        handleSelectShowOption: function(showOptionId) {
            if (showOptionId !== this.selectedShowOptionIdx) {
                this.selectedShowOptionIdx = showOptionId;
                const monday = this.$moment().startOf('day').clone().weekday(0);
                if (showOptionId !== this.showOptions.length - 1) {
                    this.handleChangeDate(monday.clone().subtract(7 * showOptionId, 'days').format());
                } else {
                    this.startInterval = monday.format();
                    this.endInterval = monday.clone().weekday(6).format('DD.MM.YYYY');
                }
            }
        },
        handleChangeDate: function(date) {

            if (this.validateDate(date)) {
                const monday = this.$moment(date).weekday(0);
                const sunday = monday.clone().weekday(6);
                this.startInterval = monday.format();
                this.endInterval = sunday.format('DD.MM.YYYY');

            } else {
                this.startInterval = '';
                this.endInterval = '';
            }
            this.$emit('onChangeDate', date);
        },
        validateDate: function(str) {
            const date = this.$moment(str).startOf('day');
            const today = this.$moment().startOf('day');
            const diff = date.diff(today, 'd');
            return diff <= 0;
        }
    }
};
</script>

<style scoped lang='scss'>
@import "style";
</style>

<style module lang='scss'>

.btn {
    width: auto !important;
}

.date-picker {
    margin: 0 10px !important;
    max-width: 98px;
    font-size: 14px;
}


</style>
