import React,{ Component } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import JobDetails from './JobDetails';

Modal.setAppElement("#root");

class JobOffers extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            jobs:"",
            modal:false,
        }
        this.job = {};
    }

    componentDidMount(){
        Axios.get('https://goe-server.herokuapp.com/api/offer/job-List').then(res=>{
            this.setState({
                jobs:res.data.jobs
            })
        }).catch(e=>{
            console.log(e);
        });
    }

    handleApply = (job) => {
        this.props.history.push(`/jobs/${job.title}`);
        this.setState({ modal:true });
        this.job=job
    }

    render(){
        var bool = false;
        const path = this.props.history.location.pathname;
        if(path.length>6){
            if(path.substr(0,6)==="/jobs/"){
                bool=true;
            }
        }
        const jobs = this.state.jobs;
        const jobList = jobs.length ? (
            jobs.map(job => {
                return (
                    <div key={job._id} className="offer" onClick={()=>{this.handleApply(job)}}>
                        <h2>{job.title}</h2>
                        <h3><span>from</span> Employer</h3>
                        <div className="offer-info">
                            <p>Requirement : {job.reqs}</p>
                            <p>Salary : {job.salary} Rs.</p>
                            <span>This is a {job.fullTime?"Full Time":"Part Time"} job.</span><br/>
                            <span>{job.fromHome?"You can work from home.":"You will have to come to the office"}</span><br/>
                            <button className="button" onClick={() => { this.job = job; this.setState({ modal:true }); }}><span>Apply</span></button>
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
            <div className="offers">
                {jobList}
                <Modal isOpen={this.state.modal || bool} onRequestClose={() => {this.setState({ modal:false }); this.props.history.push('/jobs'); }}>
                    <JobDetails job={this.job} />
                </Modal>
            </div>
            </div>
            </main>
        )
    }
}

export default JobOffers;