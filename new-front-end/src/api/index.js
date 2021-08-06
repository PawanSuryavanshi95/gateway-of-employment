import Axios from 'axios';

const api = Axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: false,
});

export default api;