import api from './index';

export default {
    sendConfirmLink: async (_id)=>{
        console.log("send-link");
        const {data} = await api.post('/auth/send-link', { _id: _id }).catch(e =>{console.log(e.message)});
        return data;
    },

    register: async (info,reg)=>{ 
        const {data} = await api.post('/auth/register', {
            info: info,
            create: reg==="1"?"USER_EMPLOYER_FIRM":(reg==="2"?"USER_EMPLOYEE":"Not Defined"),
        }).catch(e =>{console.log(e.message)});
        return data;
    },

    signin: async (id, password) => {
        const {data} = await api.post('/auth/signin', {
            id: id,
            password: password,
        }).catch(e => {
            console.log(e.message);
        });
        if(data.success===true){
            localStorage.setItem('userToken', data.token);
        }
        console.log(data)
        return data;
    },

}
