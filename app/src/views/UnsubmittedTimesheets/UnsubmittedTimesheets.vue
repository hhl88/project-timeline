<template>
    <v-container class='unsubmitted-timesheets-wrapper'>

        <UnsubmittedTimesheetsHeader
            @onChangeDate='handleChangeDate'
            @onUpdateTimesheets='handleUpdateTimeSheet' />
        <UnsubmittedTimesheetsContent />
    </v-container>
</template>

<script>
import UnsubmittedTimesheetsHeader
    from '@/views/UnsubmittedTimesheets/UnsubmittedTimesheetsHeader/UnsubmittedTimesheetsHeader';
import UnsubmittedTimesheetsContent
    from '@/views/UnsubmittedTimesheets/UnsubmittedTimesheetsContent/UnsubmittedTimesheetsContent';

export default {
    name: 'UnsubmittedTimesheets',
    components: { UnsubmittedTimesheetsContent, UnsubmittedTimesheetsHeader },
    data: () => ({}),

    methods: {
        handleChangeDate(newStartDate) {
            console.log('newStartDate', newStartDate);
        },
        handleUpdateTimeSheet() {

        }

    }
};
</script>

<style scoped lang='scss'>
@import "style";
</style>

<style module lang='scss'>

.btn {
    width: auto !important;
}

.date-picker {
    margin: 0 10px !important;
    max-width: 98px;
    font-size: 14px;
}


</style>

