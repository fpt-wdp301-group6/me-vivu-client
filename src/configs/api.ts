import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (res) => {
        return res.data;
    },
    async (err) => {
        const { config } = err;

        if (config.url !== '/auth/login' && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !config._retry) {
                config._retry = true;

                try {
                    const res = await api.post('/auth/refresh-token');
                    localStorage.setItem('token', res.data?.token);
                    return api(config);
                } catch (error: any) {
                    return Promise.reject(error.response);
                }
            }
        }

        return Promise.reject(err.response);
    },
);

export const fetcher = (url: string) => api.get(url).then((res) => res as any);

export default api;
