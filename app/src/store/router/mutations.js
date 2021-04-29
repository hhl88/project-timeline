
const SET_ROUTER = (state, router) => {
    state.router = router;
};

const SET_ACTIVE_ROUTER = (state, path) => {
    const pathLowerCase = path.toLowerCase();
    console.log('path',path);
    state.router.forEach(r => r.active = pathLowerCase.startsWith(r.path));
};

export default {
    SET_ROUTER,
    SET_ACTIVE_ROUTER
};
