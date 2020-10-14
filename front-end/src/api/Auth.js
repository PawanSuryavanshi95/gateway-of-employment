import api from './index';

export const sendConfirmLink = async (_id)=>{
    console.log("send-link");
    const {data} = await api.post('/auth/send-link', { _id: _id }).catch(e =>{console.log(e.message)});
    return data;
}

export const register = async (info,reg)=>{ 
    const {data} = await api.post('/auth/register', {
        info: info,
        create: reg==="1"?"USER_EMPLOYER_FIRM":(reg==="2"?"USER_EMPLOYEE":"Not Defined"),
    }).catch(e =>{console.log(e.message)});
    return data;
}

export const signin = async (id, password) => {
    const {data} = await api.post('/auth/signin', {
        id: id,
        password: password,
    }).catch(e => {
        console.log(e.message);
    });
    return data;
}