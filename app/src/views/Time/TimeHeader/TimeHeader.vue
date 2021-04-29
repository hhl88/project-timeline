<template>
    <div>
        <v-tabs v-model='tab'  background-color="primary">
            <v-tab v-for='item in items' :key='item.tab'>
                {{ item.tab }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model='tab'>
            <v-tab-item
                v-for='item in items'
                :key='item.tab'
            >
                <v-card flat>
                    <v-card-text>
                        <component v-bind:is='item.content'></component>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import Timesheet from '@/views/Time/Timesheet/Timesheet';


export default {
    name: 'TimeHeader',
    components: { Timesheet },
    data: () => ({
        tab: null,
        items: [
            { tab: 'First', content: 'Timesheet' }
            // { tab: 'Two' },
            // { tab: 'Three' }
        ]
    })
};
</script>

<style scoped>

</style>
