<template>
    <div class='timesheet-wrapper'>
        <TimesheetHeader />
    </div>
</template>

<script>
import TimesheetHeader from '@/views/Time/TimesheetHeader/TimesheetHeader';
export default {
    name: 'Timesheet',
    components: { TimesheetHeader }
};
</script>

<style scoped>
.timesheet-wrapper {
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    width: 1020px;
}
</style>
