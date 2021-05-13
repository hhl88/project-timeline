<template>
    <v-simple-table dense fixed-header>
        <template v-slot:default>
            <colgroup>
                <col style='width:5%;' />
                <col style='width:75%;' />
                <col style='width:10%;' />
                <col style='width:10%;' />
            </colgroup>
            <thead>
            <tr>
                <th>
                    <v-checkbox
                        @click='toggleSelectAll'
                        :indeterminate='selected.length > 0 && selected.length !== totalRows'
                        :input-value='totalRows > 0 && selected.length === totalRows'
                    ></v-checkbox>
                </th>
                <template v-for='(header) in headers'>
                    <th :key='header.value'>{{ header.text }}</th>
                </template>
            </tr>
            </thead>
            <tbody>
            <template v-for='(row) in rows'>
                <tr class='row-clickable' :key='row.user_name' @click='handleClickRow(row)'>
                    <td>
                        <v-checkbox
                            :input-value='row.selected'
                        >
                        </v-checkbox>
                    </td>
                    <td>{{ row.user_name }}</td>
                    <td>{{ row.hours }}</td>
                    <td>
                        <Button
                        >
                            <template v-slot:btn-label>
                                <router-link
                                    style='text-decoration: none; color: #222;'
                                    :to='row.link'>View Timesheet
                                </router-link>
                            </template>
                        </Button>
                    </td>

                </tr>
            </template>
            </tbody>
        </template>

    </v-simple-table>

</template>

<script>
import Button from '@/components/Button/Button';

export default {
    name: 'UnsubmittedTimesheetsContent',
    components: { Button },
    data: () => ({
        loading: true,
        options: {},
        totalRows: 0,
        rows: [],
        headers: [
            { text: 'Team members', value: 'user_name', align: 'start' },
            { text: 'Time', value: 'hours', align: 'end' },
            { text: '', value: 'button', align: 'center' }
        ],
        selected: []
    }),
    created() {

    },
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
        handleClickRow(row) {
            const idx = this.selected.findIndex(id => row.user_name === id);
            if (idx > -1) {
                this.selected.splice(idx, 1);
            } else {
                this.selected.push(row.user_name);
            }
            row.selected = !row.selected;
        },
        toggleSelectAll() {
            if (this.selected.length === this.totalRows) {
                this.selected = [];
                this.rows.forEach(row => row.selected = false);
            } else {
                this.selected = this.rows.map(row => row.user_name);
                this.rows.forEach(row => row.selected = true);

            }
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

                let items = this.getData().map(item => ({ ...item, selected: false }));
                const total = items.length;


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
                    user_name: '[SAMPLE] User 01',
                    hours: 2.02,
                    link: '/time'
                },
                {
                    user_name: '[SAMPLE] User 02',
                    hours: 5.02,
                    link: '/time'
                },
                {
                    user_name: '[SAMPLE] User 03',
                    hours: 4.02,
                    link: '/time'
                },
                {
                    user_name: 'Hai',
                    hours: 3.02,
                    link: '/time'
                }
            ];
        }
    }

};
</script>

<style scoped lang='scss'>
.checkbox-wrapper {
    display: flex;
}

.row-clickable {
    cursor: pointer;
}
</style>
