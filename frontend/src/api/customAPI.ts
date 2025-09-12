import axios from 'axios'

const customAPI = axios.create({
    baseURL: 'http://localhost:5000',
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
            } catch (refreshErr) {
                console.error('Refresh token failed', refreshErr);
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);


export default customAPI