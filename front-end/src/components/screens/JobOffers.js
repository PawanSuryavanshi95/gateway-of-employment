import React,{ Component } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import MessageBox from '../MessageBox';

Modal.setAppElement("#root");

class JobOffers extends Component{
    
    constructor(props){
        super(props);
   
        this.state = {
            jobs:"",
            proposal:undefined,
            modal:false,
            modalMsgBox:false,
        }

        this.job = {};
        this.messages = [];
    }

    componentDidMount(){
        Axios.get('api/offer/job-List').then(res=>{
            this.setState({
                jobs:res.data.jobs
            })
        }).catch(e=>{
            console.log(e);
        });
    }

    handleApply = () => {
        const employer = this.job.employer, title = this.job.title;
        const userToken = localStorage.getItem("userToken");
        const headers = {
            'X-access-token' : userToken
        }
        var proposal = this.state.proposal;
        if(proposal){
            console.log(proposal)
            Axios.post('api/job/apply', {headers : headers, employer: employer, jobTitle: title, proposal: proposal}).then(res => {
                if(res.error){
                    return <div>
                        Error occurered {res.error}
                    </div>
                }
            });
        }
        else{
            this.setState({
                modalMsgBox:true
            });
            this.messages = [];
            this.messages.push("Proposal cannot be empty");
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
                            <button className="button" onClick={() => { this.messages=[]; this.job = job; this.setState({ modal:true }); }}><span>Apply</span></button>
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
                <Modal isOpen={this.state.modal} onRequestClose={() => { this.setState({ modal:false }) }}>
                    <textarea id="proposal" rows="3" cols="30"
                        placeholder="Enter a short proposal of maximum 150 words." 
                        onChange={(e) => { this.handleChange(e) }} />
                    {this.state.modalMsgBox ? <MessageBox messages={this.messages} type="negative" /> : <div></div>}
                    <button className="button" onClick={() => { this.handleApply() }}><span>Apply</span></button>
                </Modal>
            </div>
            </main>
        )
    }
}

export default JobOffers;