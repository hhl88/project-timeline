import axios from '@/services/axios';
import MockAdapter from 'axios-mock-adapter';

// import * as queryString from 'query-string';
import { Users } from '@/__mocks__/routes/users';


export function mockBackend() {
    // let realFetch = window.fetch;
    const mock = new MockAdapter(axios, { delayResponse: 500 });

    const ok = (body, status = 200) => {
        return [status, body];
    };

    const error = (message, status) => {
        return [status, message];
    };

    const toRouteRegex = (path = '') => {
        return typeof path === 'string'
            ? new RegExp(path.replace(/:\w+/g, '[^/]+'))
            : path;
    };

    const parserIdFromUrl = (actualUrl, regexUrl) => {
        const regexUrlParts = regexUrl.split('/');
        const urlParts = actualUrl.split('/');

        const res = {};
        regexUrlParts.forEach((p, i) => {
            if (/:\w+/g.test(p)) {
                res[p.slice(1)] = urlParts[i].split('?')[0];
            }
        });
        return res;
    };
    // const parseQueryString = (url) => {
    //     const queryString = url.replace(/.*\?/, '');
    //     const result = {};
    //
    //     if (queryString === url || !queryString) {
    //         return result;
    //     }
    //
    //     const urlParams = new URLSearchParams(queryString);
    //     urlParams.forEach((val, key) => {
    //         if (result[key]) {
    //             result[key] = [result[key], val];
    //         } else {
    //             result[key] = val;
    //         }
    //     });
    //
    //     return result;
    // };

    const fetchUserTask = (config, regexUrl) => {
        const { userId } = parserIdFromUrl(config.url, regexUrl);

        if (userId) {
            const opts = config.params;
            console.log('opts', userId, opts);

            const found = Users.getUserTasks(parseInt(userId), opts.startDate, opts.endDate);
            return found != null ? ok(found) : error('user not found', 404);
        }
        return error('Missing user id', 400);
    };

    const createUser = (config) => {
        return Users.create(JSON.parse(config.data)) ? ok('new user has been created', 201) : error('Bad request', 400);
    };

    const fetchUser = (config, regexUrl) => {
        const { userId } = parserIdFromUrl(config.url, regexUrl);
        if (userId) {
            const user = Users.getUser(parseInt(userId));
            return user != null? ok(user) : error('user not found', 404);
        }
        return error('Missing user id', 400);
    };
    const fetchUsers = () => {
        return ok(Users.getUsers());
    };


    const routes = [
        { match: '/users/:userId/tasks', action: 'GET', fn: fetchUserTask },
        { match: '/users/:userId', action: 'GET', fn: fetchUser },
        { match: '/users', action: 'GET', fn: fetchUsers },
        { match: '/users', action: 'POST', fn: createUser },

    ];

    routes.forEach(route => {
        if (route.action === 'GET') {
            mock.onGet(toRouteRegex(route.match)).reply((config) => route.fn(config, route.match));
        } else if (route.action === 'POST') {
            mock.onPost(toRouteRegex(route.match)).reply((config) => route.fn(config, route.match));
        }

    });

}
