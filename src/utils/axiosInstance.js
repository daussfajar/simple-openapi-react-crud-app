import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1/',
});

const { API_KEY, X_API_KEY } = config;

instance.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['api-key']       = API_KEY;
            config.headers['x-api-key']     = X_API_KEY;
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;