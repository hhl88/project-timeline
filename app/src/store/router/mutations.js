const SET_ROUTER = (state, router) => {
    state.router = router;
};

const SET_ACTIVE_ROUTER = (state, path) => {
    const pathLowerCase = path.toLowerCase();
    state.router.forEach(r => {
        let active = pathLowerCase === r.path;
        if (!active && r.aliasPaths) {
            active = r.aliasPaths.some(a => {
                return pathLowerCase === a;
            });
        }
        r.active = active;
    });
};

export default {
    SET_ROUTER,
    SET_ACTIVE_ROUTER
};
