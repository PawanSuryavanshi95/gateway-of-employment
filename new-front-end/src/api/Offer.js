import api from './index';

const headers = { 'X-access-token': localStorage.getItem('userToken') };

export default {
    editIn : async (info) => {
        const {data} = await api.post('/offer/edit-internship', { info:info, headers:headers }, {timeout:5000}).catch(e => { console.log(e.message) });
        return data;
    },
    
    getInternships: async (employer) =>{
        const {data} = await api.get('/offer/internship-list', { params: { employer: employer ? employer : null } }).catch(e=>{console.log(e.message)});
        return data;
    },
    
    removeIn :async (_id) => {
        const {data} = await api.post("/offer/remove-in", {headers:headers, _id:_id }).catch(e => { console.log(e.message) });
        return data;
    },
    
    createIn : async (info)=>{
        const {data} = await api.post('/offer/create-internship', { info:info, headers:headers }, {timeout:10000}).catch(e => { console.log(e.message); })
        return data;
    },
    
    applyIn: async (employer, title, proposal)=>{
        const {data} = await api.post('/offer/apply-internship', {headers : headers, employer: employer, inTitle: title, proposal: proposal}).catch(e=>{console.log(e.message)});
        return data;
    },
    
    editJob : async (info) => {
        const {data} = await api.post('/offer/edit-job', { info:info, headers:headers }, {timeout:5000}).catch(e => { console.log(e.message)});
        return data;
    },
    
    getJobs : async (employer) => {
        const {data} = await api.get('/offer/job-list', { params: { employer: employer ? employer : null } }).catch(e=>{console.log(e.message)});
        return data;
    }
    ,
    removeJob : async (_id) => {
        const {data} = await api.post("/offer/remove-job", {headers:headers, _id:_id }).catch(e => { console.log(e.message) });
        return data;
    },
    
    createJob : async (info)=>{
        const {data} = await api.post('/offer/create-job', { info:info, headers:headers }, {timeout:10000}).catch(e => { console.log(e.message) });
        return data;
    },
    applyJob : async (employer, title, proposal)=>{
        const {data} = await api.post('/offer/apply-job', {headers : headers, employer: employer, jobTitle: title, proposal: proposal}).catch(e=>{console.log(e.message)});
        return data;
    },
}