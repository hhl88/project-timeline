<template>
    <div class='router-tabs-container'>
        <v-tabs v-model='tab' background-color='primary'>
            <v-tab v-for='item in items' :key='item.tab' :to='item.route'>
                {{ item.tab }}
            </v-tab>
        </v-tabs>

        <v-card flat>
            <v-card-text>
                <router-view></router-view>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>


export default {
    name: 'RouterTabs',
    props: [
        'items'
    ],

    data: () => ({
        tab: null
    })
};
</script>

<style scoped lang='scss'>
.router-tabs-container {
    height: 100%;
    width: 100%;
}

::v-deep .v-card {
    height: calc(100% - 48px);
    .v-card__text {
        padding-top: 40px;
        height: 100%;
    }
}

::v-deep .v-tab--active {
    font-weight: bold;
}
</style>
