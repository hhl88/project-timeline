<template>
    <v-tabs v-model='tab'>
        <v-tab v-for='item in list' :key='item.title'>
            {{ item.title }}
        </v-tab>

        <v-tabs-items v-model='tab'>
            <v-tab-item
                v-for='item in list'
                :key='item.title'
            >
                <v-card flat>
                    <v-card-text>
                        <component v-bind:is='item.content'></component>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
export default {
    name: 'Tabs',
    props: [
        'list',
        'selectedTab'
    ],
    data: () => ({
        tab: null
    }),
    created() {
        if (this.selectedTab) {
            this.tab = this.selectedTab;
        }
    }
};
</script>

<style scoped>

</style>
