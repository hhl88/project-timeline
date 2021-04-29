const setRouter = ({ commit }, router) => {
    commit('SET_ROUTER', router);
};
const setActiveRouter = ({ commit }, path) => {
    commit('SET_ACTIVE_ROUTER', path);
};


export default {
    setRouter,
    setActiveRouter
};
