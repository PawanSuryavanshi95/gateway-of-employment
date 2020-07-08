import React,{ Component } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';

//Modal.setAppElement("#root");

class Posts extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            jobs:"",
            proposal:undefined,
            modal:false,
        }
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

    handleApply = (employer,title) => {
        const userToken = localStorage.getItem("userToken");
        const headers = {
            'X-access-token' : userToken
        }
        var proposal = this.state.proposal;
        if(proposal){
            console.log(proposal)
            Axios.post('api/user/apply', {headers : headers, employer: employer, jobTitle: title, proposal: proposal}).then(res => {
                if(res.error){
                    return <div>
                        Error occurered {res.error}
                    </div>
                }
            });
        }
        else{
            console.log("Enter Proposal");
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
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
                            <button className="button" onClick={() => { this.setState({ modal:true }) }}><span>Apply</span></button>
                            <Modal isOpen={this.state.modal} onRequestClose={() => { this.setState({ modal:false }) }}>
                                <textarea id="proposal" rows="3" cols="30"
                                    placeholder="Enter a short proposal of maximum 150 words." 
                                    onChange={(e) => { this.handleChange(e) }} />
                                <button className="button" onClick={() => { this.handleApply(job.employer,job.title) }}><span>Apply</span></button>
                            </Modal>
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