<template>
    <div class='reports-header-wrapper'>
        <v-row class='header-wrapper' justify='space-between' align-self='center'>
            <div class='left-side-wrapper'>
                <div class='pagination'>
                    <Button :btn-class-name="['btn-icon', $style['btn-prev']]"
                            @onClick='toPrevPeriod'>
                        <template v-slot:btn-label>
                            <v-icon>mdi-chevron-left</v-icon>
                        </template>
                    </Button>
                    <Button :btn-class-name="['btn-icon', $style['btn-next']]"
                            @onClick='toNextPeriod'>
                        <template v-slot:btn-label>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </Button>
                </div>
                <h1 class='date'>
                    <span class='hint'> {{ getHint() }}</span>
                    <span class='text'>{{ getDate() }}</span>
                </h1>
            </div>
            <div class='right-side-wrapper'>
                <Dropdown
                    :btn-class-name='$style["btn"]'
                    :label='showOptions[selectedShowOptionIdx]'
                    :value='selectedShowOptionIdx'
                    :list='showOptions.map((s, i)=>({id: i, title: s}))'
                    @onSelectItem='handleSelectShowOption'
                />
            </div>
        </v-row>
        <v-row class='interval-wrapper' v-if='selectedShowOptionIdx === showOptions.length - 1'
               align='center'>
            <span>View time report from</span>
            <DatePicker
                :value='startInterval'
                :class-name='$style["date-picker"]'
                @onChangeDate='handleChangeDate' />
            <span>to</span>
            <DatePicker
                :value='endInterval'
                :class-name='$style["date-picker"]'
                @onChangeDate='(date) => handleChangeDate(date, false)' />
            <Button>
                <template v-slot:btn-label>
                    Update Report
                </template>
            </Button>
        </v-row>

    </div>
</template>

<script>
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import DatePicker from '@/components/DatePicker/DatePicker';

export default {
    name: 'ReportHeader',
    components: { DatePicker, Button, Dropdown },
    data: () => ({
        showOptions: ['Week', 'Semimonth', 'Month', 'Quarter', 'Year', 'All Time', 'Custom'],
        selectedShowOptionIdx: 0,
        startInterval: null,
        endInterval: null,
    }),
    methods: {
        toPrevPeriod: function() {

        },
        toNextPeriod: function() {

        },
        getHint: function() {

        },
        getDate: function() {

        },
        handleSelectShowOption: function(showOptionId) {
            if (showOptionId !== this.selectedShowOptionIdx) {
                this.selectedShowOptionIdx = showOptionId;
            }
        },
        handleChangeDate: function(date, isStart = true) {
            if (isStart) {
                this.startInterval = date;
                if (this.endInterval && !this.validateDate(date, this.endInterval)) {
                    this.endInterval = date;
                }
            } else {
                this.endInterval = date;
                if (this.startInterval && !this.validateDate(this.startInterval, date)) {
                    this.startInterval = date;
                }
            }
        },
        validateDate: function(start, end) {
            const startDate = this.$moment(start).startOf('day');
            const endDate = this.$moment(end).startOf('day');
            const diff = startDate.diff(endDate, 'd');
            return diff <= 0;
        }
    }
};
</script>

<style scoped lang='scss'>
@import "style";

</style>

<style module lang='scss'>
.btn-prev {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}

.btn-next {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

.btn {
    width: auto !important;
}

.date-picker {
    margin: 0 10px !important;
    max-width: 98px;
    font-size: 14px;
}


</style>
