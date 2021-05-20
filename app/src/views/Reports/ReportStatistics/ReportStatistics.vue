<template>
    <v-row class='report-statistics-wrapper' ref='reportStatistics'>
        <div class='item'>
            <div class='label'>
                Hours Tracked
            </div>
            <div class='data'>
                3,02
            </div>
        </div>
        <div class='item progress-wrapper'>
            <v-progress-circular
                class='progress-hours'
                :rotate='-90'
                :size='80'
                :width='10'
                value='80'
                color='primary'
            >
                100%
            </v-progress-circular>
            <div class='progress-info'>
                <div class='label'>
                    Billable Hours
                </div>
                <div class='progress-helper'>
                    <v-icon small color='primary' class='progress-icon-helper'>mdi-checkbox-blank</v-icon>
                    <strong>3,02 Billable</strong>
                </div>
                <div class='progress-helper'>
                    <v-icon small color='grey lighten-1' class='progress-icon-helper'>mdi-checkbox-blank
                    </v-icon>
                    <strong>0,00 Non-Billable</strong>
                </div>
            </div>
        </div>
        <div class='item'>
            <div class='label'>
                Billable Amount
            </div>
            <div class='data'>
                €0,00
            </div>
            <v-checkbox
                class='checkbox'
                v-model='checkbox'
                label='Include fixed fee projects'
            ></v-checkbox>
        </div>
        <div class='item'>
            <div class='label'>
                Uninvoiced Amount
            </div>
            <div class='data'>
                €0,00
            </div>
            <div class='hint'>
                Excludes fixed fee projects
            </div>
        </div>
    </v-row>
</template>

<script>
export default {
    name: 'ReportStatistics',
    props: [],
    data: () => ({
        checkbox: false
    }),
    mounted() {
        console.log('11', this.$refs.reportStatistics.offsetHeight);
        this.$emit('onResize', this.$refs.reportStatistics.offsetHeight + 30);
    }
};
</script>

<style scoped lang='scss'>
@import "style.scss";
</style>
