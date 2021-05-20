<template>

    <v-simple-table class='time-sheet-week-wrapper'>
        <template v-slot:default>
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
            <tr>
                <th class='th-name'>
                </th>
                <template v-for='(weekday) in $_.orderBy(Object.values(weekdays), ["order"], ["asc"])'>
                    <th :class='[
                        weekday.label ? "th-weekday" : "th-total",
                        weekday.hours > 0 && weekday.label && "tracked"
                    ]'
                        :key='"header-"+weekday.id'
                    >
                        <router-link
                            v-if='weekday && weekday.date'
                            style='text-decoration: none; color: #666;'
                            :to='"/time/day/"+ weekday.date.format("YYYY/MM/DD")'
                            v-on:click.native='$store.dispatch("setTimeSheetType", "day")'>
                            <div class='label'>
                                {{ weekday.label }}
                            </div>
                            <div class='date'>
                                {{ weekday.date.format('DD MMM') }}
                            </div>
                        </router-link>

                    </th>
                </template>
                <th class='th-delete'>
                </th>
            </tr>
            </thead>
            <tbody>
            <template v-if='loading'>
                <tr>
                    <td :colspan='10' class='td-loading'>
                        <v-progress-linear
                            indeterminate
                            rounded
                            color='primary'
                        ></v-progress-linear>
                    </td>
                </tr>
            </template>
            <template v-else-if='$_.orderBy(Object.values(modifiedRows)).length > 0'>
                <tr

                    v-for='row in $_.orderBy(Object.values(modifiedRows), ["project_id", "updated_at", ],["asc", "desc"])'
                    class='week-view-entry'
                    :key='row.id+ "-row"'
                >
                    <td class='td-name'>
                        <div class='project-client'>
                            <span class='project'>[{{ row.project_code }}] {{ row.project_name }}</span>
                            <span class='client'>({{ row.client_name }})</span>
                        </div>
                        <div class='task-notes'>
                            <span class='task'>{{ row.task_name }}</span>
                        </div>
                    </td>
                    <td v-for='weekday in $_.orderBy(Object.values(row.weekdays), ["order"], ["asc"])'
                        :key='row.id + "-" +weekday.id'
                        :class='weekday.label ? "td-weekday" : "td-total"'>
                        <Input v-if='weekday.label'
                               :class-name='[$style["input-hours"]]'
                               :value='weekday.hours > 0 ? $utils.toTime(weekday.hours) : ""'
                               :props-to-pass='{
                                    rules: [
                                        (v) =>  !v || (v &&v.trim().length ===0) ||$utils.isTime(v, true)
                                    ]
                               }'
                               @onChange='(newValue) => handleChangeInput(row.id,weekday.id, newValue)'

                        />
                        <span v-else>{{ $utils.toTime(weekday.hours) }}</span>
                    </td>
                    <td class='delete'>
                        <div class='btn-delete' @click='() =>handleDelete(row.id)'>
                            <v-icon small>mdi-close</v-icon>
                        </div>
                    </td>
                </tr>
            </template>

            <template v-else>
                <tr>
                    <td colspan='10' class='empty-box-wrapper'>
                        <div class='empty-box'>
                            <div>
                                <div>There are no timesheets for this period.</div>
                                <div>Please add a new one.</div>
                            </div>
                        </div>
                    </td>
                </tr>

            </template>

            </tbody>

            <tfoot>
            <tr>
                <td class='td-name'>
                    <Button :btn-class-name='$style["btn-add-row"]' @onClick='openAddNewEntryDialog'>
                        <template v-slot:btn-label>
                            <v-icon>mdi-plus</v-icon>
                            <span>New Row</span>
                        </template>
                    </Button>

                    <Button :btn-class-name='$style["btn-save"]'

                            :props-to-pass='{
                            disabled: $_.isEqual(rows, modifiedRows),
                            color: "primary"
                        }'
                    >
                        <template v-slot:btn-label>
                            Save
                        </template>
                    </Button>
                </td>

                <td v-for='(weekday) in $_.orderBy(Object.values(weekdays), ["order"], ["asc"])'
                    :key='"footer-" +weekday.label'
                    :class='weekday.label ? "td-weekday" : "td-total"'>
                    <div class='time'>
                        {{ $utils.toTime(weekday.hours) }}
                    </div>
                </td>
                <td class='td-delete'>
                </td>
            </tr>
            </tfoot>
        </template>
    </v-simple-table>
</template>

<script>
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { mapState } from 'vuex';

export default {
    name: 'TimeSheetWeek',
    components: { Button, Input },
    data: () => ({
        weekdays: [],
        rows: {},
        modifiedRows: {}
    }),
    mounted() {
        this.handleChangeDate(this.pickerDate);
        this.handleEntries(this.timeSheets);
    },
    computed: {
        ...mapState({
            timeSheets: state => state.timeSheets.timeSheets,
            pickerDate: state => state.timeSheets.pickerDate,
            loading: state => state.timeSheets.loading
        })
    },
    methods: {
        openAddNewEntryDialog: function() {
            console.log('openAddNewEntryDialog');
            this.$emit('openNewEntryDialog');
        },
        handleChangeInput: function(rowId, weekDayId, newValue) {
            const num = this.$utils.timeToNum(newValue, true);
            if (!isNaN(num)) {
                const oldHours = this.modifiedRows[rowId].weekdays[weekDayId].hours;
                const diff = num - oldHours;

                this.modifiedRows[rowId].weekdays[weekDayId].hours = num;
                this.modifiedRows[rowId].weekdays.total.hours += diff;
                this.weekdays[weekDayId].hours += diff;
                this.weekdays.total.hours += diff;
            }

        },
        handleDelete: function(rowId) {
            Object.values(this.modifiedRows[rowId].weekdays).forEach(weekday => {
                if (weekday.id !== 'total') {
                    this.weekdays[weekday.id].hours -= weekday.hours;
                    this.weekdays.total.hours -= weekday.hours;
                }
            });
            delete this.modifiedRows[rowId];
        },
        handleChangeDate: function(newPickerDate) {
            const monday = this.$moment(newPickerDate);
            this.rows = {};
            this.modifiedRows = {};
            this.weekdays = {
                Mon: {
                    order: 0,
                    id: 'Mon',
                    label: 'M',
                    date: monday,
                    hours: 0
                },
                Tue: {
                    order: 1,
                    id: 'Tue',
                    label: 'T',
                    date: monday.clone().add(1, 'days'),
                    hours: 0
                },
                Wed: {
                    order: 2,
                    id: 'Wed',
                    label: 'W',
                    date: monday.clone().add(2, 'days'),
                    hours: 0
                },
                Thu: {
                    order: 3,
                    id: 'Thu',
                    label: 'Th',
                    date: monday.clone().add(3, 'days'),
                    hours: 0
                },
                Fri: {
                    order: 4,
                    label: 'F',
                    id: 'Fri',
                    date: monday.clone().add(4, 'days'),
                    hours: 0
                },
                Sat: {
                    order: 5,
                    id: 'Sat',
                    label: 'S',
                    date: monday.clone().add(5, 'days'),
                    hours: 0
                },
                Sun: {
                    order: 6,
                    id: 'Sun',
                    label: 'Su',
                    date: monday.clone().add(6, 'days'),
                    hours: 0
                },
                total: {
                    order: 7,
                    id: 'total',
                    hours: 0
                }
            };
            console.log('weekDay', this.weekdays);
            // this.weekdays = this.$_.cloneDeep(weekdays);
        },
        handleEntries: function(newEntries) {

            const weekdays = this.$_.cloneDeep(this.weekdays);

            newEntries.forEach((entry) => {
                const id = `${entry.project_id}-${entry.task_id}`;

                if (!this.rows[id]) {
                    this.rows[id] = {
                        id: id,
                        task_id: entry.task_id,
                        project_id: entry.project_id,
                        project_code: entry.project_code,
                        project_name: entry.project_name,
                        client_name: entry.client_name,
                        task_name: entry.task_name,
                        weekdays: this.$_.cloneDeep(weekdays),
                        hours: 0,
                        updated_at: entry.updated_at,
                        create_at: entry.create_at
                    };
                }
                const weekday = this.$moment(entry.start_at).format('ddd');

                this.rows[id].weekdays[weekday].hours += entry.hours;
                this.rows[id].hours += entry.hours;
                this.rows[id].weekdays.total.hours += entry.hours;

                this.weekdays[weekday].hours += entry.hours;
                this.weekdays.total.hours += entry.hours;
                this.modifiedRows = this.$_.cloneDeep(this.rows);
            });
        }
    },
    watch: {
        timeSheets(newTimeSheets) {
            this.handleChangeDate(this.pickerDate);
            this.handleEntries(newTimeSheets);
        },
        pickerDate(newPickerDate) {
            this.handleChangeDate(newPickerDate);
        }

    }
};
</script>

<style scoped lang='scss'>
@import "style.scss";


.v-data-table td {
    //border-bottom: none !important;
    padding: 12px 5px !important;

}

::v-deep .v-input__control {
    .v-input__slot {
        padding: 0 6px !important;
        min-height: 35px !important;

        input {
            padding: 4px 0;
            text-align: right;
        }
    }
}

</style>
<style module lang='scss'>

.input-hours {
    font-size: 14px;
    font-weight: 600;
}

.btn-add-row {
    margin-right: 10px;
}
</style>
