<template>
    <div ref='appBar'>
        <v-toolbar color='primary' flat dark>
            <div class='hidden-sm-and-up'>
                <v-menu
                    v-model='sidebar'
                    offset-y
                    bottom
                    left
                >
                    <template v-slot:activator='{ on, attrs }'>
                        <v-app-bar-nav-icon
                            dark
                            v-bind='attrs'
                            v-on='on'
                            @click='sidebar = !sidebar'>
                        </v-app-bar-nav-icon>
                    </template>
                    <v-list class='hidden-sm-and-up'>
                        <template v-for='item  in routers'>
                            <v-list-item
                                color='primary'
                                v-if='item.meta && item.meta.enabled && item.meta.showInHeader'
                                :key='item.name'
                                :to='item.path'
                            >
                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-menu>
            </div>

            <v-toolbar-title :class='["hidden-sm-and-up", $style["app-title-header"]]'>
                {{ routers.find(r => r.active) ? routers.find(r => r.active).name : '' }}
            </v-toolbar-title>
            <v-toolbar-items class='hidden-xs-only'>
                <v-btn text to='/' color='white'>
                    <v-icon>home</v-icon>
                </v-btn>
                <template v-for='item  in routers'>
                    <v-btn
                        :class='[$style["title-header"], item.active ? "v-btn--active " : ""]'
                        text
                        color='white'
                        v-if='item.meta && item.meta.enabled && item.meta.showInHeader'
                        :key='item.name'
                        :to='item.path'
                    >
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
        sidebar: false,
        showMenuBar: false,
        ro: null
    }),

    mounted() {
        this.ro = new ResizeObserver(this.onResize).observe(this.$refs.appBar);
    },
    beforeDestroy() {
        if (this.ro) {
            this.ro.unobserve(this.$refs.appBar);
        }
    },
    computed: {
        ...mapState({ routers: state => state.router.router })
    },
    methods: {
        onResize() {
            const width = this.$refs && this.$refs.appBar && this.$refs.appBar.offsetWidth;
            if (this.showMenuBar && width >= 600) {
                this.sidebar = false;
                this.showMenuBar = false;
            } else if (!this.showMenuBar && width < 600) {
                this.showMenuBar = true;
            }
        }
    }
};
</script>

<style scoped lang='scss'>
@import './style';

</style>

<style module lang='scss'>
.title-header {
    font-size: 16px !important;
}

.app-title-header {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
}
</style>
