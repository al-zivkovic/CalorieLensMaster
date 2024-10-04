import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.154:4000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;