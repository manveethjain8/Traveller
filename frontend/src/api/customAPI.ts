import axios from 'axios'

const customAPI = axios.create({
    baseURL: 'http://localhost:5000'
})

export default customAPI