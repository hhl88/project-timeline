<template>
    <div>
<!--        <v-navigation-drawer v-model='sidebar' app>-->
<!--            <v-list>-->
<!--                <v-list-tile-->
<!--                    v-for='item in routers'-->
<!--                    :key='item.name'-->
<!--                    :to='item.path'>-->
<!--                    <v-list-tile-action v-if='item.icon'>-->
<!--                        <v-icon>{{ item.icon }}</v-icon>-->
<!--                    </v-list-tile-action>-->
<!--                    <v-list-tile-content>{{ item.name }}</v-list-tile-content>-->
<!--                </v-list-tile>-->
<!--            </v-list>-->
<!--        </v-navigation-drawer>-->

        <v-toolbar color='primary' flat>
<!--            <span class='hidden-sm-and-up'>-->
<!--                <v-toolbar-side-icon @click='sidebar = !sidebar'>-->
<!--                </v-toolbar-side-icon>-->
<!--            </span>-->
            <v-toolbar-items class='hidden-xs-only'>
                <v-btn text to='/' color='white'
                >
                    <v-icon>home</v-icon>
                </v-btn>
                <template v-for='item  in routers'>
                    <v-btn
                        text
                        color='white'
                        v-if='item.meta && item.meta.enabled && item.meta.showInHeader'
                        :key='item.name'
                        :to='item.path'
                        :active='item.active'>
                        <v-icon left dark v-if='item.icon'>{{ item.icon }}</v-icon>
                        {{ item.name }}
                    </v-btn>
                </template>

            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Header',
    data: () => ({
        sidebar: false
    }),
    computed: {
        ...mapState({ routers: state => state.router.router })
    }

};
</script>

<style scoped lang='scss'>
@import './style';


</style>
