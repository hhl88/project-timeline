import axios from 'axios';
import { apiBaseUrl } from '@/enviroments/enviroments';

const http = axios.create({
    baseURL: apiBaseUrl,
    timeout: 1000,
    header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default http;
