<template>
    <div class='reports-wrapper'>
        <ReportHeader />
        <ReportStatistics />
        <ReportContent />
    </div>
</template>

<script>

import ReportHeader from '@/views/Reports/ReportHeader/ReportHeader';
import ReportStatistics from '@/views/Reports/ReportStatistics/ReportStatistics';
import ReportContent from '@/views/Reports/ReportContent/ReportContent';

export default {
    name: 'Reports',
    components: { ReportContent, ReportStatistics, ReportHeader }
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
