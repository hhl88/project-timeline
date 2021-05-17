import axios from '@/services/axios';

const fetchTimeSheets = ({ state, commit }) => {
    if (state.userId) {
        commit('TIME_SHEETS_LOADING');
        axios.get(`/users/${state.userId}/tasks`, {
            params: {
                startDate: state.range.startDate,
                endDate: state.range.endDate
            }
        })
            .then(res => {
                commit('TIME_SHEETS_LOADED', res.data);
            })
            .catch(e => {
                console.log('Error', e);
                commit('TIME_SHEETS_ERROR', e);
            });
    }

};
const setUser = ({ commit }, userId) => {
    commit('SET_USER', userId);
};

const setPickerDate = ({ commit }, newDate) => {
    commit('SET_PICKER_DATE', newDate);
};

const setTimeSheetType = ({ commit }, newType) => {
    commit('SET_SHOW_TYPE', newType);
};


export default {
    setUser,
    fetchTimeSheets,
    setPickerDate,
    setTimeSheetType
};
