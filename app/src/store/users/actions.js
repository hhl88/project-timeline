import axios from '@/services/axios';


const fetchUsers = ({ commit }) => {
    axios.get('/users')
        .then(res => {
            commit('SET_USERS', res.data);
        })
        .catch(e => console.log('e', e));
};


export default {
    fetchUsers,
};
