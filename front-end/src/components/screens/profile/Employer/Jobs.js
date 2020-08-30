import React, { Component } from 'react';

class Jobs extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        var key = 0;
        var jobs = this.props.jobs;
        var bool = jobs!=null ? jobs.length>0 ? true : false : false ;
        jobs = bool ? jobs.map(job => {
            ++key;
            return(
                <div className={key%2===1?"wbg":""} key={key}>
                    <div className="title">{job.title}</div>
                </div>
            )
        }) : <div className="no-content">Nothing to show</div>;
        return(
            <div className="user-tab">
                {jobs}
            </div>
        )
    }
}

export default Jobs;