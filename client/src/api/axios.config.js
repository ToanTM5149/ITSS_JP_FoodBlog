import axios from "axios";
import queryString from 'query-string';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    // withCredentials: true,
    headers: {
        'Content-Type' : 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

API.interceptors.request.use(
    function (req) {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) req.headers['auth-token'] = token
        return req
    },
    function (error) {
        return Promise.reject(error)
    },
);

export default API;