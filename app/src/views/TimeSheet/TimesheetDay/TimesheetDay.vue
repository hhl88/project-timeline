<template>
    <div :class="[$style['timesheet-day-wrapper']]">
        <div
            :class="[$style['btn-add-entry']]"
        >
            <div :class='$style["btn-label"]'>
                <div :class='$style["btn-icon"]' @click='openDialog = true'>
                    <v-icon color='white' x-large>mdi-plus</v-icon>
                </div>
                <div :class='$style["btn-text"]'>New entry</div>
            </div>
        </div>
        <v-row
            :class='[$style["weekdays-header"]]'
            align-self='center'>
            <Button
                v-for='(weekday) in $_.orderBy(Object.values(weekdays), ["order"], ["asc"])'
                :key='weekday.label'
                :btn-class-name="[$style['btn-weekday'], weekday.date === selectedDate ? 'selected' : '']"
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
        </v-row>
        <div :class='$style["day-view-entry-list"]'
             v-if='selectedWeekday && weekdays[selectedWeekday] && weekdays[selectedWeekday].rows'
        >
            <v-row
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
                <v-col cols='1'>
                    <span :class='$style["entry-time"]'>{{ $utils.toTime(row.hours) }}</span>
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
            </v-row>

        </div>

        <div :class='$style["day-view-summary"]'
             v-if='selectedWeekday && weekdays[selectedWeekday] && weekdays[selectedWeekday].rows.length > 0'
        >
            <v-row align='center'>
                <v-col cols='8' :class='$style["label"]'>
                    <span>Total:</span>
                </v-col>
                <v-col cols='1' :class='$style["time"]'>
                    <span>{{ $utils.toTime(weekdays[selectedWeekday].hours) }}</span>
                </v-col>
            </v-row>

        </div>


        <NewEntryDialog
            v-if='openDialog'
            :date='selectedDate'
            @onSubmit='handleAddNewEntry'
            @onClose='openDialog = false' />

    </div>
</template>

<script>

import Button from '@/components/Button/Button';
import NewEntryDialog from '@/views/TimeSheet/NewEntryDialog/NewEntryDialog';

export default {
    name: 'TimesheetDay',
    components: { NewEntryDialog, Button },
    props: [
        'entries',
        'date'
    ],
    data: () => ({
        dayEntries: [],
        weekdays: [],
        selectedDate: '',
        selectedWeekday: '',
        openDialog: false
    }),
    created() {
        const dayEntries = [
            {
                id: 1,
                notes: 'This is sample time entry',
                task_name: 'Marketing',
                user_id: 1,
                hours: 2.81,
                project_code: 'SAMPLE',
                project_id: 1,
                project_name: 'Fixed Fee Project',
                client_name: '[SAMPLE] Client A',
                billable: true,
                is_archived: false,
                is_billed: false,
                is_closed: false,
                timer_started_at: null,
                updated_at: '2021-04-27T01:04:47Z',
                user_active: true,
                user_assignment_active: true,
                spent_at: '2021-04-27'


            }
        ];
        this.selectedDate = this.date;
        this.selectedWeekday = this.$moment(this.selectedDate).format('ddd');
        this.handleDayEntries(dayEntries);
    },
    methods: {
        handleAddNewEntry: function(payload) {
            this.openDialog = false;
            console.log('payload', payload);
        },
        handleDayEntries: function(dayEntries) {
            this.dayEntries = dayEntries;
            const selectedDate = this.$moment(this.selectedDate);
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
                const weekday = this.$moment(entry.spent_at).format('ddd');
                weekdays[weekday].hours = entry.hours;
                weekdays[weekday].rows.push(entry);
                weekdays.total.hours += entry.hours;
            });
            this.weekdays = weekdays;

        },
        changeDate: function(newDate) {
            this.selectedDate = newDate;
            this.selectedWeekday = this.$moment(this.selectedDate).format('ddd');

            this.$emit('onChangeDate', newDate);
        }
    },
    watch: {
        dayEntries: function(newDayEntries) {
            this.handleDayEntries(newDayEntries);
        },
        date: function(newDate) {
            this.selectedDate = newDate;
            this.selectedWeekday = this.$moment(this.selectedDate).format('ddd');
        }
    }
};
</script>

<style module lang='scss'>
@import 'style';
</style>
