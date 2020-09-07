import Axios from 'axios';

const api = Axios.create({
    baseURL: "https://goe-server.herokuapp.com/api",
    withCredentials: false,
    timeout: 5000,
});

export default api;