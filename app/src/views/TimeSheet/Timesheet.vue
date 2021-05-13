<template>
    <div class='timesheet-wrapper'>
        <TimesheetHeader
            :show-type='showType'
            :date='pickerDate'
            @toPrevDate='toPrevDate'
            @toNextDate='toNextDate'
            @onSelectDate='handleChangeDate'
            @backToToday='backToToday'
            @onChangeShowType='handleChangeShowType' />
        <TimesheetDay v-if='showType === "day"'
                      :date='pickerDate'
                      @onChangeDate='handleChangeDate' />
        <TimesheetWeek v-else-if='showType === "week"'
                       :date='pickerDate' />

    </div>
</template>

<script>
import TimesheetHeader from '@/views/TimeSheet/TimesheetHeader/TimesheetHeader';
import TimesheetDay from '@/views/TimeSheet/TimesheetDay/TimesheetDay';
import TimesheetWeek from '@/views/TimeSheet/TimesheetWeek/TimesheetWeek';

export default {
    name: 'Timesheet',
    components: { TimesheetHeader, TimesheetDay, TimesheetWeek },
    data: () => ({
        showType: null,
        day: null,
        month: null,
        year: null,
        hint: null,
        pickerDate: null,
        selectedTeammate: null,
        closeTeammate: false
    }),
    created() {
        const { params } = this.$route;
        const { showType, day, month, year } = params;
        this.showType = showType;
        this.day = day;
        this.month = month;
        this.year = year;
        let date;
        if (showType === 'week') {
            date = this.$moment(`${this.year}-${this.month}-${this.day}`).weekday(0);
            this.day = date.date();
            this.pickerDate = date.format();
            this._handleNewDate(date);
        } else if (showType === 'day') {
            date = this.$moment(`${this.year}-${this.month}-${this.day}`);
            this.pickerDate = date.format();

        } else if (!showType) {
            this.showType = 'day';
            date = this.$moment();
            this.day = date.date();
            this.month = date.month() + 1;
            this.year = date.year();
            this.pickerDate = date.format();
        }
    },
    methods: {
        toPrevDate: function() {
            const num = this.showType === 'day' ? 1 : 7;
            const date = this.$moment(`${this.year}-${this.month}-${this.day}`).subtract(num, 'days');
            this._handleNewDate(date);
        },
        toNextDate: function() {
            const num = this.showType === 'day' ? 1 : 7;
            const date = this.$moment(`${this.year}-${this.month}-${this.day}`).add(num, 'days');
            this._handleNewDate(date);
        },
        backToToday: function() {
            const date = this.$moment();
            this._handleNewDate(date);
        },

        handleChangeDate: function(newDate) {
            this._handleNewDate(this.$moment(newDate));
        },
        onSelectTeammate: function() {
            this.closeTeammate++;
        },
        handleChangeShowType: function(newType) {
            if (newType !== this.showType) {
                this.showType = newType;
                const monday = this.$moment(this.pickerDate).weekday(0);
                this._handleChangeDate(monday);

            }
        },
        _handleNewDate: function(date) {
            if (this.showType === 'day') {
                const dateStr = date.format();
                if (dateStr !== this.pickerDate) {
                    this._handleChangeDate(date);
                }
            } else if (this.showType === 'week') {
                const monday = date.clone().weekday(0);
                const sunday = monday.clone().weekday(6);
                if (!this.$moment(this.pickerDate).isBetween(monday, sunday, undefined, '[]')) {
                    this._handleChangeDate(monday);
                }
            }
        },
        _handleChangeDate: function(date) {
            this.day = date.date();
            this.month = date.month() + 1;
            this.year = date.year();
            this.pickerDate = date.format();
            const path = `/time/${this.showType}/${date.format('yyyy/MM/DD')}`;
            this.$router.replace({
                path: path
            });
        }
    }
};
</script>

<style scoped>
.timesheet-wrapper {
    margin: 0 auto;
    padding: 0;
    position: relative;
    width: 1024px;
}
</style>
