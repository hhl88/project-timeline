<template>
    <div class='reports-wrapper' ref='reportsWrapper'>
        <ReportHeader @onResize='(height) => handleResize("header", height)' />
        <ReportStatistics @onResize='(height) => handleResize("statistics", height)' />
        <ReportContent  />
    </div>
</template>

<script>

import ReportHeader from '@/views/Reports/ReportHeader/ReportHeader';
import ReportStatistics from '@/views/Reports/ReportStatistics/ReportStatistics';
import ReportContent from '@/views/Reports/ReportContent/ReportContent';

export default {
    name: 'Reports',
    components: { ReportContent, ReportStatistics, ReportHeader },
    data: (() => ({
        // reportsWrapperHeight: 1000,
        // reportsStatisticsHeight: 50,

        // reportsContentHeight: 800
    })),
    mounted() {
        // this.reportsWrapperHeight = this.$refs.reportsWrapper.offsetHeight;
    },
    methods: {
        handleResize(key, height) {
            console.log('111', key, height);
            // if (key === 'statistics') {
            //     this.reportsStatisticsHeight = height;
            // } else {
            //     this.reportsContentHeight = this.reportsWrapperHeight - this.reportsStatisticsHeight - height;
            // }
        }
    }
};
</script>

<style scoped>
.reports-wrapper {
    margin: 0 auto;
    padding: 0;
    position: relative;
    width: 1024px;
}
</style>
