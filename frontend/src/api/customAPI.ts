import axios from 'axios'

const customAPI = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

customAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original_request = error.config

        if (error.response && error.response.status === 401 && !original_request._retry) {
            original_request._retry = true

            try {
                await customAPI.get('/auth/refresh-token', {withCredentials: true})
                return customAPI(original_request)
            } catch (refreshError: unknown) {
                if(refreshError instanceof Error){
                    console.log("Refresh token failed", refreshError.message)
                }else{
                    console.log("Refresh Error")
                }
                window.location.href = '/';
            }
        }

        return Promise.reject(error)
    }
)


export default customAPI