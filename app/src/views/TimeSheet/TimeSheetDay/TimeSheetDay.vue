<template>
    <div :class='$style["time-sheet-day-wrapper"]'>
        <div :class='$style["btn-add-entry"]'
        >
            <div :class='$style["btn-label"]'>
                <div :class='$style["btn-icon"]' @click='openAddNewEntryDialog'>
                    <v-icon color='white' x-large>mdi-plus</v-icon>
                </div>
                <div :class='$style["btn-text"]'>New entry</div>
            </div>
        </div>
        <div :class='[$style["weekdays-header"]]'>
            <Button
                v-for='(weekday) in $_.orderBy(Object.values(weekdays), ["order"], ["asc"])'
                :key='weekday.label'
                :btn-class-name="[$style['btn-weekday'], weekday.date === pickerDate ? 'selected' : '']"
                :propsToPass='{
                    disabled: weekday.label === "Total"
                }'
                @onClick='changeDate(weekday.date)'
            >
                <template v-slot:btn-label>
                    <div :class='[$style["label-wrapper"], weekday.label === "Total" ? $style["total-wrapper"]: ""]'>
                        <div :class='$style["label"]'>
                            {{ weekday.label }} {{ weekday.label === 'Total' ? ': ' : '' }}
                        </div>
                        <div :class='$style["time"]'>
                            {{ $utils.toTime(weekday.hours) }}
                        </div>
                    </div>

                </template>

            </Button>
        </div>
        <template v-if='loading'>
            <div>
                <v-progress-linear
                    indeterminate
                    rounded
                    color='primary'
                ></v-progress-linear>
            </div>
        </template>
        <div :class='$style["day-view-entry-list"]'
             v-else-if='selectedWeekday && weekdays[selectedWeekday] && weekdays[selectedWeekday].rows.length > 0'
        >

            <div
                v-for='(row) in weekdays[selectedWeekday].rows'
                :key='row.id'
                :class='$style["day-view-entry-item"]'
                align='center'>
                <v-col
                    :class='$style["day-entry-label-wrapper"]'
                    cols='8'>
                    <div :class='$style["project-client"]'>
                        <span :class='$style["project"]'>[{{ row.project_code }}] {{ row.project_name }}</span>
                        <span :class='$style["client"]'>({{ row.client_name }})</span>
                    </div>
                    <div :class='$style["task-notes"]'>
                        <span :class='$style["task"]'>[{{ row.task_name }}]</span>
                        <span :class='$style["notes"]'>{{ row.notes }}</span>
                    </div>
                </v-col>
                <v-col cols='1' class='text-right'>
                    <span :class='[$style["entry-time"]]'>{{ $utils.toTime(row.hours) }}</span>
                </v-col>
                <v-col cols='2'>
                    <Button :btn-class-name="[$style['btn-action']]">
                        <template v-slot:btn-label>
                            Start
                        </template>
                    </Button>
                </v-col>
                <v-col cols='1'>
                    <Button :btn-class-name="[$style['btn-edit'], 'btn-icon']"
                            :props-to-pass='{small: true}'>
                        <template v-slot:btn-label>
                            <v-icon small>mdi-pencil</v-icon>
                        </template>
                    </Button>
                </v-col>
            </div>

        </div>
        <div v-else class='empty-box'>
            <div>There are no timesheets for this period.</div>
            <div>Please add a new one.</div>
        </div>

        <div :class='$style["day-view-summary"]'
             v-if='selectedWeekday && weekdays[selectedWeekday] && weekdays[selectedWeekday].rows.length > 0'
        >
            <v-col cols='8' :class='$style["label"]'>
                <span>Total:</span>
            </v-col>
            <v-col cols='1' :class='$style["time"]'>
                <span>{{ $utils.toTime(weekdays[selectedWeekday].hours) }}</span>
            </v-col>
        </div>




    </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '@/components/Button/Button';

export default {
    name: 'TimesheetDay',
    components: { Button },
    data: () => ({
        weekdays: [],
        selectedWeekday: '',
    }),
    computed: {
        ...mapState(
            {
                timeSheets: state => state.timeSheets.timeSheets,
                pickerDate: state => state.timeSheets.pickerDate,
                loading: state => state.timeSheets.loading
            })

    },
    created() {
        this.selectedWeekday = this.$moment(this.pickerDate).format('ddd');
        this.handleDayEntries(this.timeSheets);
    },
    methods: {
        openAddNewEntryDialog: function() {
            this.$emit('openNewEntryDialog');
        },
        handleDayEntries: function(dayEntries) {
            const selectedDate = this.$moment(this.pickerDate);
            const monday = selectedDate.clone().day(1);

            const weekdays = {
                Mon: {
                    order: 0,
                    label: 'M',
                    date: monday.format(),
                    hours: 0,
                    rows: []
                },
                Tue: {
                    order: 1,
                    label: 'T',
                    date: monday.clone().add(1, 'days').format(),
                    hours: 0,
                    rows: []
                },
                Wed: {
                    order: 2,
                    label: 'W',
                    date: monday.clone().add(2, 'days').format(),
                    hours: 0,
                    rows: []
                },
                Thu: {
                    order: 3,
                    label: 'Th',
                    date: monday.clone().add(3, 'days').format(),
                    hours: 0,
                    rows: []
                },
                Fri: {
                    order: 4,
                    label: 'F',
                    date: monday.clone().add(4, 'days').format(),
                    hours: 0,
                    rows: []
                },
                Sat: {
                    order: 5,
                    label: 'S',
                    date: monday.clone().add(5, 'days').format(),
                    hours: 0,
                    rows: []
                },
                Sun: {
                    order: 6,
                    label: 'Su',
                    date: monday.clone().add(6, 'days').format(),
                    hours: 0,
                    rows: []
                },
                total: {
                    order: 7,
                    label: 'Total',
                    date: '',
                    hours: 0,
                    rows: []
                }
            };
            dayEntries.forEach(entry => {
                const weekday = this.$moment(entry.start_at).format('ddd');
                weekdays[weekday].hours += entry.hours;
                weekdays[weekday].rows.push(entry);
                weekdays.total.hours += entry.hours;
            });
            this.weekdays = weekdays;

        },
        changeDate: function(newDate) {
            this.selectedWeekday = this.$moment(newDate).format('ddd');
            this.$emit('onChangeDate', newDate);
        }
    },
    watch: {
        timeSheets(newTimeSheets) {
            this.handleDayEntries(newTimeSheets);
        },
        pickerDate(newDate) {
            this.selectedWeekday = this.$moment(newDate).format('ddd');
        }
    }
};
</script>


<style scoped lang='scss'>
.empty-box {
    background-color: rgb(240, 240, 240);
    color: #626262;
    font-size: 20px;
    padding: 64px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}
</style>


<style module lang='scss'>
@import 'style';
</style>
