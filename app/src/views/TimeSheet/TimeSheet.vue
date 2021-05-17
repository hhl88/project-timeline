<template>
    <div class='timesheet-wrapper'>
        <TimesheetHeader
            @toPrevDate='toPrevDate'
            @toNextDate='toNextDate'
            @onSelectDate='handleChangeDate'
            @backToToday='backToToday'
            @onChangeShowType='handleChangeShowType' />
        <TimeSheetDay v-if='showType === "day"'
                      @onChangeDate='handleChangeDate'
                      @openNewEntryDialog='handleOpenNewEntryDialog' />
        <TimeSheetWeek v-else-if='showType === "week"'
                       @openNewEntryDialog='handleOpenNewEntryDialog'
        />

        <NewEntryDialog
            v-if='openDialog'
            :date='pickerDate'
            @onSubmit='handleAddNewEntry'
            @onClose='openDialog = false' />

    </div>
</template>

<script>
import TimesheetHeader from '@/views/TimeSheet/TimesheetHeader/TimesheetHeader';
import TimeSheetDay from '@/views/TimeSheet/TimeSheetDay/TimeSheetDay';
import TimeSheetWeek from '@/views/TimeSheet/TimeSheetWeek/TimeSheetWeek';
import NewEntryDialog from '@/views/TimeSheet/NewEntryDialog/NewEntryDialog';

export default {
    name: 'Timesheet',
    components: { TimesheetHeader, TimeSheetDay, TimeSheetWeek, NewEntryDialog },
    data: () => ({
        closeTeammate: false,
        openDialog: false
    }),
    created() {
        const { params } = this.$route;
        let { showType, day, month, year, userId } = params;

        if (showType === 'week') {
            const date = this.$moment(`${year}-${month}-${day}`).startOf('day');
            const monday = date.clone().weekday(0).startOf('day');
            this._handleNewDate(monday, showType, monday.diff(date) !== 0);
        } else if (showType === 'day') {
            const date = this.$moment(`${year}-${month}-${day}`).startOf('day');
            this._handleNewDate(date, showType, false);
        } else if (!showType) {
            this._handleNewDate(this.$moment(), showType, false);
        }
        if (userId) {
            this.$store.dispatch('setUser', userId);
        }
    },
    computed: {
        userId() {
            return this.$store.getters.userId;
        },
        users() {
            return this.$store.getters.users;
        },
        showType() {
            return this.$store.getters.showType;
        },
        pickerDate() {
            return this.$store.getters.pickerDate;
        },
        range() {
            return this.$store.getters.range;
        }
    },
    methods: {
        handleAddNewEntry:function(payload) {
            console.log('payload', payload);
        },
        handleOpenNewEntryDialog: function() {
            this.openDialog = true;
        },
        toPrevDate: function() {
            const num = this.showType === 'day' ? 1 : 7;
            const date = this.$moment(this.pickerDate).subtract(num, 'days');
            this._handleNewDate(date);
        },
        toNextDate: function() {
            const num = this.showType === 'day' ? 1 : 7;
            const date = this.$moment(this.pickerDate).add(num, 'days');
            this._handleNewDate(date);
        },
        backToToday: function() {
            const date = this.$moment();
            this._handleNewDate(date);
        },

        handleChangeDate: function(newDate) {
            this._handleNewDate(this.$moment(newDate), this.showType, true);
        },
        onSelectTeammate: function() {
            this.closeTeammate++;
        },
        handleChangeShowType: function(newType) {
            if (newType !== this.showType) {
                const monday = this.$moment(this.$store.getters.pickerDate).weekday(0);
                this._handleChangeDate(monday, newType, true);
            }
        },
        _handleNewDate: function(date, newType, isNavigating) {
            if (this.showType === 'day') {
                const dateStr = date.format();
                if (dateStr !== this.pickerDate) {
                    this._handleChangeDate(date, newType, isNavigating);
                }
            } else if (this.showType === 'week') {
                const monday = date.clone().weekday(0);
                const sunday = monday.clone().weekday(6);
                if (!this.$moment(this.pickerDate).isBetween(monday, sunday, undefined, '[]')) {
                    this._handleChangeDate(monday, newType, isNavigating);
                }
            }
        },
        _handleChangeDate: function(date, newType, isNavigating = true) {
            let type = this.showType;
            if (newType) {
                this.$store.dispatch('setTimeSheetType', newType);
                type = newType;
            }
            this.$store.dispatch('setPickerDate', date.format());
            if (isNavigating) {
                const path = `/time/${type}/${date.format('YYYY/MM/DD')}`;
                this.$router.replace({
                    path: path
                });
            }

        }
    },
    watch: {
        userId(newValue) {
            if (newValue) {
                this.$store.dispatch('fetchTimeSheets');
            }
        },
        range: {
            handler(newValue) {
                if (newValue) {
                    this.$store.dispatch('fetchTimeSheets');
                }
            },
            deep: true

        },
        users(newUsers) {
            if (!this.$store.getters.userId && newUsers && newUsers.length > 0) {
                this.$store.dispatch('setUser', newUsers[0].user_id);
            }
        }
    }
};
</script>

<style scoped lang='scss'>
.timesheet-wrapper {
    margin: 0 auto;
    padding: 0;
    position: relative;
    width: 1024px;
}
</style>
