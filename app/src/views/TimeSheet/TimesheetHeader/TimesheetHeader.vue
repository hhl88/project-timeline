<template>
    <div :class="$style['timesheet-wrapper']">
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
                   v-if='isNotToday'
                   v-on:click='backToToday'>Return to Today</a>

            </div>
            <div :class="[$style['right-side-wrapper']]">
                <DropdownCalendar
                    :value='date'
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
import DropdownTeammate from '@/views/TimeSheet/DropdownTeammate/DropdownTeammate';
import Button from '@/components/Button/Button';
import DropdownCalendar from '@/views/TimeSheet/DropdownCalendar/DropdownCalendar';

export default {
    name: 'TimesheetHeader',
    components: { DropdownCalendar, Button, DropdownTeammate },
    props: [
        'showType',
        'date',
        'selectedTeammate'
    ],
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
                return this.$moment(this.date).format('dddd, DD MMM');
            }
            if (this.showType === 'week') {
                const monday = this.$moment(this.date).day(1);
                const sunday = monday.clone().add(6, 'days');
                return `${monday.format('DD MMM')} - ${sunday.format()}`;
            }

            return 'Wrong format';
        },
        getHint: function() {
            if (this.showType === 'day') {
                const date = this.$moment(this.date).startOf('day');
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
            const date = this.$moment(this.date).startOf('day');
            const today = this.$moment().startOf('day');
            const diff = date.diff(today, 'd');
            return diff !== 0;
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
