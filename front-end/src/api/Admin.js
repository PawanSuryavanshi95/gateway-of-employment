import api from './index';

export const adminLogin = async (info) => {
    const {data} = await api.post("/admin/login", { userName:info.userName, password:info.password }).catch(e =>{console.log(e.message)});
    return data;
}

export const adminRemove = async (headers, query) => {
    const {data} = await api.post('/admin/remove', { headers:headers, query:query }).catch(e =>{console.log(e.message)});
    return data;
}