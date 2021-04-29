<template>
    <v-container :class="$style['timesheet-wrapper']">
        <v-row justify='space-between' align-self='center'>
            <div :class="$style['left-side-wrapper']">
                <div :class="$style['pagination']">
                    <v-btn depressed
                           :class="[$style['btn'], $style['btn-prev'], $style['btn-icon']]"
                           v-on:click='toPrevDate'>
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn depressed
                           :class="[$style['btn'], $style['btn-next'], $style['btn-icon']]"
                           v-on:click='toNextDate'>
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
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
                <Dropdown
                    :btn-class-name="[$style['btn'], $style['btn-calendar'], $style['btn-icon']]"
                    :value='pickerDate'
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
                            no-title
                            scrollable
                            v-on:click:date='onSelectDate'
                        />
                    </template>
                </Dropdown>
                <!--                <v-menu-->
                <!--                    ref='popCalendar'-->
                <!--                    v-model='popCalendar'-->
                <!--                    offset-y-->
                <!--                    :close-on-content-click='false'-->
                <!--                    transition='scale-transition'-->
                <!--                    :close-on-click='true'-->
                <!--                >-->
                <!--                    <template v-slot:activator='{ on, attrs }'>-->
                <!--                        <v-btn depressed class='btn btn-calendar btn-icon'-->
                <!--                               v-bind='attrs'-->
                <!--                               v-on='on'-->
                <!--                               v-on:click='popCalendar = !popCalendar'-->
                <!--                        >-->
                <!--                            <v-icon>mdi-calendar-month</v-icon>-->
                <!--                        </v-btn>-->

                <!--                    </template>-->

                <!--                    <v-date-picker-->
                <!--                        :value='pickerDate'-->
                <!--                        color='primary'-->
                <!--                        show-adjacent-months-->
                <!--                        no-title-->
                <!--                        scrollable-->
                <!--                        v-on:click:date='onSelectDate'-->
                <!--                    ></v-date-picker>-->
                <!--                </v-menu>-->

                <div :class="[$style['btn-type-wrapper']]">
                    <v-btn depressed :class="[$style['btn'], $style['btn-day']]"
                           v-on:click='toPrevDate'>
                        Day
                    </v-btn>
                    <v-btn depressed :class="[$style['btn'], $style['btn-week']]"
                           v-on:click='toNextDate'>
                        Week
                    </v-btn>
                </div>

                <Dropdown
                    :menu-class-name='$style["dropdown-teammate"]'
                    :btn-class-name="$style['btn']"
                    :props-to-pass='{
                        nudgeLeft: 138,
                        nudgeBottom: 10,
                    }'
                >
                    <template v-slot:btn-label>
                        Teammates
                    </template>
                    <template v-slot:dropdown-content>
                        <Input
                            label='Search...'
                            leftIcon='mdi-magnify'
                            :clearable='true' />
                        <v-list dense>
                            <v-subheader>Employee</v-subheader>
                            <v-list-item-group
                                v-model='selectedTeammate'
                                color='primary'
                            >
                                <v-list-item
                                    v-for='(item, i) in list'
                                    :key='i'
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text='item'></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </template>
                </Dropdown>

                <!--                <v-menu-->
                <!--                    ref='popTeammate'-->
                <!--                    v-model='popTeammate'-->
                <!--                    offset-y-->
                <!--                    :close-on-content-click='false'-->
                <!--                    transition='scale-transition'-->
                <!--                    :close-on-click='true'-->
                <!--                >-->
                <!--                    <template v-slot:activator='{ on, attrs }'>-->
                <!--                        <v-btn depressed class='btn'-->
                <!--                               v-bind='attrs'-->
                <!--                               v-on='on'-->
                <!--                               v-on:click='popTeammate = !popTeammate'-->
                <!--                        >-->
                <!--                            Teammates-->
                <!--                        </v-btn>-->

                <!--                    </template>-->
                <!--                    -->
                <!--                </v-menu>-->
            </div>
        </v-row>
    </v-container>
</template>

<script>

import Input from '@/components/Input/Input';
import Dropdown from '@/components/Dropdown/Dropdown';

export default {
    name: 'TimesheetHeader',
    components: { Dropdown, Input },
    data: () => ({
        showType: null,
        day: null,
        month: null,
        year: null,
        hint: null,
        pickerDate: null,
        selectedTeammate: null,
        list: ['Teammate 1', 'Teammate 2 long long', 'Teammate 3 long long long long'],
        popCalendar: false,
        popTeammate: false
    }),
    created() {
        console.log('Created');
        const { params } = this.$route;
        const { showType, day, month, year } = params;
        this.showType = showType;
        this.day = day;
        this.month = month;
        this.year = year;
        if (showType === 'week') {
            const monday = this.$moment(`${this.year}-${this.month}-${this.day}`, 'yyyy-MM-DD').day(1);
            this.day = monday.date();
        } else if (!showType) {
            this.showType = 'day';
            const today = this.$moment();
            this.day = today.date();
            this.month = today.month() + 1;
            this.year = today.year();
        }
        this.pickerDate = this.$moment(`${this.year}-${this.month}-${this.day}`, 'yyyy-MM-DD').format('yyyy-MM-DD');
    },
    methods: {
        toPrevDate: function() {
            const num = this.showType === 'day' ? 1 : 7;
            const date = this.$moment(`${this.year}-${this.month}/${this.day}`, 'yyyy-MM-DD').subtract(num, 'days');
            this._handleNewDate(date);
        },
        toNextDate: function() {
            const num = this.showType === 'day' ? 1 : 7;
            const date = this.$moment(`${this.year}-${this.month}/${this.day}`, 'yyyy-MM-DD').add(num, 'days');
            this._handleNewDate(date);
        },
        backToToday: function() {
            const date = this.$moment();
            this._handleNewDate(date);
        },
        _handleNewDate: function(date) {
            const dateStr = date.format('yyyy-MM-DD');
            console.log('_handleNewDate', dateStr, this.pickerDate, dateStr !== this.pickerDate);
            if (dateStr !== this.pickerDate) {
                this.day = date.date();
                this.month = date.month() + 1;
                this.year = date.year();
                this.pickerDate = date.format('yyyy-MM-DD');
                const path = `/time/${this.showType}/${date.format('yyyy/MM/DD')}`;
                this.$router.replace({
                    path: path
                });
            }

        },
        getDate: function() {
            if (this.showType === 'day') {
                return this.$moment(`${this.year}-${this.month}-${this.day}`, 'yyyy-MM-DD').format('dddd, DD MMM');
            }
            if (this.showType === 'week') {
                const monday = this.$moment(`${this.year}-${this.month}-${this.day}`, 'yyyy-MM-DD');
                const sunday = monday.clone().add(6, 'days');
                return `${monday.format('DD MMM')} - ${sunday.format('DD MMM YYYY')}`;
            }

            return 'Wrong format';
        },
        getHint: function() {
            if (this.showType === 'day') {
                const date = this.$moment(`${this.year}-${this.month}-${this.day}`, 'yyyy-MM-DD');
                const today = this.$moment();
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
            const date = this.$moment(this.pickerDate, 'yyyy-MM-DD');
            const today = this.$moment();
            const diff = date.diff(today, 'd');
            return diff !== 0;
        },
        onSelectDate: function(newDate) {
            this.popCalendar = false;
            this._handleNewDate(this.$moment(newDate, 'yyyy-MM-DD'));
        }
    }
};
</script>

<style module lang='scss'>
@import 'style';
</style>
