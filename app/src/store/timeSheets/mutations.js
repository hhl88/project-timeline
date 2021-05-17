import moment from 'moment';

const SET_USER = (state, userId) => {
    state.userId = userId;
};

const SET_PICKER_DATE = (state, newDate) => {
    const monday = moment(newDate).weekday(0);
    const sunday = monday.clone().weekday(6);
    state.pickerDate = newDate;
    state.range.startDate = monday.format();
    state.range.endDate = sunday.format();

};

const SET_SHOW_TYPE = (state, newType) => {
    state.showType = newType;

};

const TIME_SHEETS_LOADING = (state) => {
    state.loading = true;
    state.timeSheets = [];
};

const TIME_SHEETS_LOADED = (state, timeSheets) => {
    state.loading = false;
    state.timeSheets = timeSheets;
};

const TIME_SHEETS_ERROR = (state, err) => {
    state.err = err;
};


export default {
    SET_USER,
    TIME_SHEETS_LOADING,
    TIME_SHEETS_LOADED,
    SET_PICKER_DATE,
    SET_SHOW_TYPE,
    TIME_SHEETS_ERROR
};
