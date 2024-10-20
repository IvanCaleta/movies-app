import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    params: {
        api_key: process.env.REACT_APP_API_KEY
    },
    headers: {
        Accept: 'application/json',
    },
})

export default instance;