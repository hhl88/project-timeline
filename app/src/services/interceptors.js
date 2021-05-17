import { LocalStorage } from '@/services/storage';
import { TOKEN } from '@/enviroments/enviroments';
import http from '@/services/axios';


export default function setup() {
    http.interceptors.request.use(function(config) {
        const token = LocalStorage.getItem(TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        /** Do something with response error */
        return Promise.reject(err);
    });

    http.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            /** Do something with response error */
            return Promise.reject(error);
        }
    );
}



