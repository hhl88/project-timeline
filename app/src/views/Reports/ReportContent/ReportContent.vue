<template>
    <div>
        <div class='content-header'>
            <v-tabs v-model='tab' class='content-tabs'>
                <v-tab v-for='item in tabs' :key='item.title'>
                    {{ item.title }}
                </v-tab>

            </v-tabs>
            <v-row align='center' justify='end' class='content-actions'>
                <v-checkbox
                    class='checkbox'
                    v-model='onlyActiveProjects'
                    label='Active Projects Only'
                />
                <Dropdown
                    :btn-class-name='$style["btn"]'
                    label='Export'
                    :value='selectedExportOption'
                    :list='exportOptions.map((s, i)=>({id: i, title: s}))'
                    @onSelectItem='handleSelectExportOption'
                />
                <Button :btn-class-name='$style["btn"]'>
                    <template v-slot:btn-label>Detailed Report</template>
                </Button>

                <Button :btn-class-name="['btn-icon']"
                        @onClick='print'>
                    <template v-slot:btn-label>
                        <v-icon small>mdi-printer</v-icon>
                    </template>
                </Button>
            </v-row>
        </div>

        <v-data-table
            :headers='headers'
            :items='rows'
            :options.sync='options'
            :server-items-length='totalRows'
            :loading='loading'
            :hide-default-footer='rows.length === 0'
            class='elevation-4'
        >

            <template
                v-if='Object.keys(totals).length > 0'
                v-slot:body.append='{ headers }'
            >
                <tr class='summary-row'>
                    <td v-for='header in headers'
                        :key='"totals-"+header.value'
                        :class='["total", header.align ? "text-"+ header.align : ""]'
                    >
                        <strong> {{ totals[header.value] }}</strong>
                    </td>
                </tr>
            </template>
            <template v-slot:no-data>
                <v-row v-if='rows.length === 0' class='empty-box' justify='center' align='center'>
                    <div>
                        <div>There are no hours recorded for this time period</div>
                        <div>
                            Track your time under
                            <router-link to='/time'>Timesheets</router-link>
                            <span>.</span>
                        </div>
                    </div>
                </v-row>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import Dropdown from '@/components/Dropdown/Dropdown';
import Button from '@/components/Button/Button';

export default {
    name: 'ReportContent',
    components: { Button, Dropdown },
    data: () => ({
        tab: null,
        onlyActiveProjects: false,
        loading: true,
        totalRows: 0,
        options: {},
        tabs: [
            { title: 'Clients' },
            { title: 'Projects' },
            { title: 'Tasks' },
            { title: 'Teams' }
        ],
        exportOptions: ['Excel', 'CSV'],
        selectedExportOption: null,
        headers: [
            { text: 'Name', align: 'start', value: 'name' },
            { text: 'Clients', value: 'client_name', align: 'start' },
            { text: 'Hours', value: 'hours', align: 'end' },
            { text: 'Billable Hours', value: 'billable_hours', align: 'end' },
            { text: 'Billable Amount', value: 'billable_amount', align: 'end' }
        ],
        rows: [],
        totals: {}
    }),
    mounted() {
        this.getDataFromApi();
    },
    watch: {
        options: {
            handler() {
                this.getDataFromApi();
            },
            deep: true
        }
    },
    methods: {
        handleSelectExportOption(option) {
            this.selectedExportOption = null;
            console.log('option', option);
        },
        print() {

        },
        getDataFromApi() {
            this.loading = true;
            this.fakeApiCall().then((data) => {
                this.rows = data.items;
                this.totalRows = data.total;
                this.loading = false;

                this.totals = {
                    name: 'Total',
                    client_name: '',
                    hours: 20.02,
                    billable_hours: '20',
                    billable_amount: '€ 0.00'
                };
            });
        },
        fakeApiCall() {
            return new Promise((resolve) => {
                const { sortBy, sortDesc, page, itemsPerPage } = this.options;

                let items = this.getData();
                const total = items.length;

                if (sortBy.length === 1 && sortDesc.length === 1) {
                    items = items.sort((a, b) => {
                        const sortA = a[sortBy[0]];
                        const sortB = b[sortBy[0]];

                        if (sortDesc[0]) {
                            if (sortA < sortB) return 1;
                            if (sortA > sortB) return -1;
                            return 0;
                        } else {
                            if (sortA < sortB) return -1;
                            if (sortA > sortB) return 1;
                            return 0;
                        }
                    });
                }

                if (itemsPerPage > 0) {
                    items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
                }

                setTimeout(() => {
                    resolve({
                        items,
                        total
                    });
                }, 1000);
            });
        },
        getData() {
            return [
                {
                    name: '[SAMPLE] Fixed Fee Project 1',
                    client_name: '[SAMPLE] Client A 1',
                    hours: 2.02,
                    billable_hours: '3.02 hours (100%)',
                    billable_amount: '€ 0.00'
                },
                {
                    name: '[SAMPLE] Fixed Fee Project 2',
                    client_name: '[SAMPLE] Client A 2',
                    hours: 5.02,
                    billable_hours: '3.02 hours (100%)',
                    billable_amount: '€ 0.00'
                },
                {
                    name: '[SAMPLE] Fixed Fee Project 3',
                    client_name: '[SAMPLE] Client A 3',
                    hours: 4.02,
                    billable_hours: '1.02 hours (100%)',
                    billable_amount: '€ 3.00'
                },
                {
                    name: '[SAMPLE] Fixed Fee Project 4',
                    client_name: '[SAMPLE] Client A 2',
                    hours: 1.02,
                    billable_hours: '7.02 hours (100%)',
                    billable_amount: '€ 0.00'
                },
                {
                    name: '[SAMPLE] Fixed Fee Project 4',
                    client_name: '[SAMPLE] Client A 2',
                    hours: 1.02,
                    billable_hours: '7.02 hours (100%)',
                    billable_amount: '€ 0.00'
                }
            ];
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
    margin-right: 5px;
    margin-left: 5px;
}
</style>
