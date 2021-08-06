import React, { Component } from 'react';

import JobCard from '../components/Job';
import offerAPI from '../api/Offer';

class Jobs extends Component{
    constructor(props){
        super(props);

        this.state ={
            jobs:[],
            retrieved:false,
        }
    }

    async componentDidMount(){
        if(this.state.retrieved===false){
            const data = await offerAPI.getJobs();
            this.setState({jobs : data.jobs, retrieved:true});
        }
    }

    render(){
        
        var {jobs} = this.state;
        console.log(this.state);
        if(jobs) jobs = jobs.map(job=>{
            return <JobCard data={job} />
        });

        return (
            <div>
                {jobs}
            </div>
        )
    }
}

export default Jobs;