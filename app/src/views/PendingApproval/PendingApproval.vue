<template>
    <v-container class='pending-approval-wrapper'>
        <div class='header'>Pending Approval</div>
        <v-row class='sort-show-wrapper' justify='space-between' align='center'>
            <Dropdown
                :btn-class-name='$style["btn"]'
                :label='"Sort by: " + sorts[selectedSortIdx]'
                :value='selectedSortIdx'
                :list='sorts.map((s, i)=>({id: i, title: s}))'
                @onSelectItem='handleSelectSort'
            />
            <Dropdown
                :btn-class-name='$style["btn"]'
                :label='"Show: " + showOptions[selectedShowOptionIdx]'
                :value='selectedShowOptionIdx'
                :list='showOptions.map((s, i)=>({id: i, title: s}))'
                @onSelectItem='handleSelectShowOption'
            />

        </v-row>
        <v-card v-if='rows.length === 0'
                color='#f0f0f0'
                elevation='0'
        >
            <v-card-text>
                There are no timesheets pending approval.
            </v-card-text>
        </v-card>
        <v-simple-table dense v-else>

            <template v-slot:default>
                <colgroup>
                    <col style='width:33.33%;' />
                    <col style='width:33.33%;' />
                    <col style='width:33.33%;' />
                </colgroup>
                <tbody>
                <template v-for='(row) in rows'>
                    <tr
                        :key='"date-" + row.id'

                    >
                        <th scope='col' class='date' :colspan='3'>
                            {{ $moment(row.start_at).format('DD MMM YYYY') }} -
                            {{ $moment(row.end_at).format('DD MMM YYYY') }}
                        </th>

                    </tr>
                    <template v-for='item in row.items'>
                        <tr :key='row.id + "user-" + item.user_id' class='nav-row'>
                            <td class='user' :colspan='2'>
                                {{ item.user_name }}
                            </td>
                            <td class='hours' :colspan='1'>
                                {{ $utils.toTime(item.hours) }} hours
                                ({{ Math.round((item.billable_hours / item.hours)) * 100 }}% billable)
                            </td>
                        </tr>
                    </template>


                </template>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
import Dropdown from '@/components/Dropdown/Dropdown';

export default {
    name: 'PendingApproval',
    components: { Dropdown },
    data: () => ({
        sorts: ['Week', 'Project', 'People'],
        showOptions: ['Everyone', 'My Pinned Teammates', 'My Pinned Projects', 'Sample Role'],
        selectedSortIdx: 0,
        selectedShowOptionIdx: 0,
        rows: []
    }),
    created() {
        const pendingList = [
            {
                id: 1,
                user_id: 1,
                user_name: 'User 01',
                start_at: '2021-04-12',
                end_at: '2021-04-18',
                hours: 33.2,
                billable_hours: 20,
                link: '/entry/approve/'
            },
            {
                id: 2,
                user_id: 2,
                user_name: 'User 02',
                start_at: '2021-04-12',
                end_at: '2021-04-18',
                hours: 10,
                billable_hours: 10,
                link: '/entry/approve/'
            },
            {
                id: 3,
                user_id: 3,
                user_name: 'User 03',
                start_at: '2021-04-26',
                end_at: '2021-05-02',
                hours: 12.2,
                billable_hours: 8,
                link: '/entry/approve/'
            },
            {
                id: 4,
                user_id: 1,
                user_name: 'User 01',
                start_at: '2021-05-10',
                end_at: '2021-05-16',
                hours: 50.2,
                billable_hours: 48,
                link: '/entry/approve/'
            }
        ];

        this.rows = this.$_.chain(pendingList)
            .groupBy('start_at')
            .map((value, key) => {
                let end_at;
                const items = value.map(item => {
                    end_at = item.end_at;
                    return {
                        id: item.id,
                        user_id: item.user_id,
                        user_name: item.user_name,
                        hours: item.hours,
                        billable_hours: item.billable_hours,
                        link: item.link
                    };
                });
                return {
                    id: key,
                    start_at: key,
                    end_at,
                    items
                };
            })
            .value();
    },
    methods: {
        handleSelectSort: function(sortId) {
            if (sortId !== this.selectedSortIdx) {
                this.selectedSortIdx = sortId;
            }
        },
        handleSelectShowOption: function(showOptionId) {
            if (showOptionId !== this.selectedShowOptionIdx) {
                this.selectedShowOptionIdx = showOptionId;
            }
        }
    }
};
</script>

<style scoped lang='scss'>
@import "style";

::v-deep .v-data-table {
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    line-height: 1.3;
    margin: 0;
    border-bottom: 1px solid #ccc;

}
</style>

<style module lang='scss'>
.btn {
    width: auto !important;
}
</style>
