<template>
    <v-app id='app'>
        <Header />
        <main>
            <router-view />
        </main>
    </v-app>
</template>

<style lang='scss'>
@import 'style';
</style>
<script>
import Header from '@/components/Header/Header';

export default {
    components: { Header },
    mounted() {
        this.$store.dispatch('fetchUsers');
    }
};
</script>
