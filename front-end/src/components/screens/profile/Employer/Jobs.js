import React, { Component } from 'react';
import Axios from 'axios';

class Jobs extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        var key = 0;
        var jobs = this.props.jobs;
        jobs = jobs!=null ? jobs.map(job => {
            ++key;
            return(
                <div key={key}>
                    <div className="title">{job.title}</div>
                </div>
            )
        }) : <div>Nothing to show</div>;
        return(
            <div className="user-tab">
                {jobs}
            </div>
        )
    }
}

export default Jobs;