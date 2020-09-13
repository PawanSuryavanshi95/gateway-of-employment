import Axios from 'axios';

const api = Axios.create({
    baseURL: "https://goe-server.herokuapp.com/api",
    withCredentials: false,
});

export default api;