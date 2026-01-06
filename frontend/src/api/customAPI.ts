import axios from 'axios'

export const customAPI = axios.create({
    baseURL: import.meta.env.VITE_BackendURL,
    withCredentials: true
})

customAPI.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.log('Access token expired. Attempting to refresh token...');
                await customAPI.get('/auth/refresh-token');
                return customAPI(originalRequest); // ✅ MUST return the retried request
            } catch (err) {
                console.error('Refresh token failed', err);
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);

export const fastAPI_client = axios.create({
    baseURL: "http://localhost:8001/api/v1"
})

