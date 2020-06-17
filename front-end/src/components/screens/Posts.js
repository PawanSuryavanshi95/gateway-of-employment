import React,{ Component } from 'react';
import Axios from 'axios';

class Posts extends Component{
    
    state = {
        jobs:""
    }

    componentDidMount(){
        Axios.get('api/user/jobList').then(res=>{
            this.setState({
                jobs:res.data.jobs
            })
        }).catch(e=>{
            console.log(e);
        });
    }

    render(){
        const jobs = this.state.jobs;
        const jobList = jobs.length ? (
            jobs.map(job => {
                return (
                    <div key={job._id} className="job">
                        <h3>{job.title}</h3><br/>
                        <div className="job-info">
                            <p>Description : {job.desc}</p>
                            <p>Requirement : {job.reqs}</p>
                            <p>Reason(s) to join : {job.reason}</p>
                            <span>This is a {job.fullTime?"Full Time":"Part Time"} job.</span><br/>
                            <span>{job.fromHome?"You can work from home.":"You will have to come to the office"}</span><br/>
                        </div>
                    </div>
                )
            })
        ):(
            <div>There are no jobs to show.</div>
        )
        return(
            <main className="main">
            <div className="content">
                {jobList}
            </div>
            </main>
        )
    }
}

export default Posts;