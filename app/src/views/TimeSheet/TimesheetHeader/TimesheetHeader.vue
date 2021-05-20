<template>
    <div :class="$style['time-sheets-header-wrapper']">
        <v-row justify='space-between' align-self='center'>
            <div :class="$style['left-side-wrapper']">
                <div :class="$style['pagination']">
                    <Button :btn-class-name="['btn-icon', $style['btn-prev']]"
                            @onClick='toPrevDate'>
                        <template v-slot:btn-label>
                            <v-icon>mdi-chevron-left</v-icon>
                        </template>
                    </Button>
                    <Button :btn-class-name="['btn-icon', $style['btn-next']]"
                            @onClick='toNextDate'>
                        <template v-slot:btn-label>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </Button>
                </div>
                <h1 :class="[$style['date']]">
                    <span :class="[$style['hint']]"> {{ getHint() }}</span>
                    <span :class="[$style['text']]">{{ getDate() }}</span>
                </h1>
                <a :class="[$style['back-to-today']]"
                   v-if='showType === "day" && isNotToday()'
                   v-on:click='backToToday'>Return to Today</a>
                <a :class="[$style['back-to-today']]"
                   v-else-if='showType === "week" && isNotThisWeek()'
                   v-on:click='backToToday'>Return to This Week</a>

            </div>
            <div :class="[$style['right-side-wrapper']]">
                <DropdownCalendar
                    :value='pickerDate'
                    @onSelectDate='onSelectDate' />

                <div :class="[$style['btn-type-wrapper']]">
                    <Button :class="[$style['btn-day'], showType==='day' ? 'selected' : '']"
                            @onClick='onChangeShowType("day")'>
                        <template v-slot:btn-label>
                            Day
                        </template>
                    </Button>
                    <Button :class="[$style['btn-week'], showType==='week' ? 'selected' : '']"
                            @onClick='onChangeShowType("week")'>
                        <template v-slot:btn-label>
                            Week
                        </template>
                    </Button>
                </div>

                <DropdownTeammate :props-to-pass='{
                        nudgeLeft: 148,
                        nudgeBottom: 5,
                        maxWidth: 320,
                        minWidth: 320
                    }' />
            </div>
        </v-row>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import DropdownTeammate from '@/views/TimeSheet/DropdownTeammate/DropdownTeammate';
import Button from '@/components/Button/Button';
import DropdownCalendar from '@/views/TimeSheet/DropdownCalendar/DropdownCalendar';

export default {
    name: 'TimesheetHeader',
    components: { DropdownCalendar, Button, DropdownTeammate },
    computed: {
        ...mapState(
            {
                selectedTeammate: state => state.timeSheets.userId,
                users: state => state.users.users,
                pickerDate: state => state.timeSheets.pickerDate,
                range: state => state.timeSheets.range,
                showType: state => state.timeSheets.showType
            })
    },
    methods: {
        toPrevDate: function() {
            this.$emit('toPrevDate');
        },
        toNextDate: function() {
            this.$emit('toNextDate');
        },
        backToToday: function() {
            this.$emit('backToToday');
        },
        getDate: function() {
            if (this.showType === 'day') {
                return this.$moment(this.pickerDate).format('dddd, DD MMM');
            }
            if (this.showType === 'week') {
                const monday = this.$moment(this.pickerDate).weekday(0);
                const sunday = monday.clone().add(6, 'days');
                return `${monday.format('DD MMM')} - ${sunday.format()}`;
            }

            return 'Wrong format';
        },
        getHint: function() {
            if (this.showType === 'day') {
                const date = this.$moment(this.pickerDate).startOf('day');
                const today = this.$moment().startOf('day');
                const diff = date.diff(today, 'd');
                if (diff === 0) {
                    return 'Today: ';
                } else if (diff === -1) {
                    return 'Yesterday: ';
                } else if (diff === 1) {
                    return 'Tomorrow: ';
                }


            } else if (this.showType === 'week') {
                return 'This Week: ';
            }
            return null;
        },
        isNotToday: function() {
            const date = this.$moment(this.pickerDate).startOf('day');
            const today = this.$moment().startOf('day');
            const diff = date.diff(today, 'd');
            return diff !== 0;
        },
        isNotThisWeek: function() {
            const monday = this.$moment(this.range.startDate).startOf('day');
            const sunday = this.$moment(this.range.endDate).startOf('day');
            const today = this.$moment().startOf('day');
            return !today.isBetween(monday, sunday, undefined, '[]');

        },
        onSelectDate: function(newDate) {
            this.$emit('onSelectDate', newDate);
        },
        onSelectTeammate: function(value) {

            // this.closeTeammate++;
            console.log('onSelectTeammate', value);
        },
        onChangeShowType: function(newType) {
            this.$emit('onChangeShowType', newType);
        }
    }
};
</script>

<style module lang='scss'>
@import 'style';
</style>
