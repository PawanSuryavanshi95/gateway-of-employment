import React,{ Component } from 'react';
import api from '../../api/index';
import Modal from 'react-modal';
import JobDetails from './JobDetails';
import MessageBox from '../MessageBox';

Modal.setAppElement("#root");

class JobOffers extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            jobs:"",
            modal:false,
            loading:true,
        }
        this.job = {};
        this.messages = [];
        this.msgType = "neutral";
    }

    componentDidMount(){
        api.get('/offer/job-List').then(res=>{
            this.setState({
                jobs:res.data.jobs,
                loading:false,
            });
        }).catch(e=>{
            this.setMsgBox([e.message], "negative");
        });
    }

    setMsgBox = (msg,type) => {
        this.setState({ msgBox: true});
        this.messages = [msg];
        this.msgType = type;
    }

    handleApply = (job) => {
        if(localStorage.getItem("userToken")!==null){
            this.props.history.push(`/jobs/${job.title}`);
            this.setState({ modal:true });
            this.job=job;
        }
        else{
            this.setMsgBox(["You need to login with an employee's account to apply."], "negative");
        }
    }

    render(){
        var bool = false;
        const path = this.props.history.location.pathname;
        if(path.length>6){
            if(path.substr(0,6)==="/jobs/"){
                bool=true;
            }
        }
        const loadingBlock = <div className="offer loading"><div className="item 1"></div></div>;
        const loadingList = [loadingBlock, loadingBlock, loadingBlock,];
        const jobs = this.state.jobs;
        const jobList = jobs.length ? (
            jobs.map(job => {
                return (
                    <div key={job._id} className="offer" onClick={()=>{this.handleApply(job)}}>
                        <h2>{job.title}</h2>
                        <h3><span>from</span>{" "+job.employerName}</h3>
                        <div className="offer-info">
                            <p>Requirement : {job.reqs}</p>
                            <p>Salary : {job.salary} Rs.</p>
                            <span>This is a {job.fullTime?"Full Time":"Part Time"} job.</span><br/>
                            <span>{job.fromHome?"You can work from home.":"You will have to come to the office"}</span><br/>
                        </div>
                        <div className="offer-apply">
                            {this.state.msgBox?<MessageBox messages={this.messages} type="negative" />:null}
                            <button className="button" onClick={() => { this.handleApply(job); }}><span>Apply</span></button>
                        </div>
                    </div>
                )
            })
        ):(
            <div>There are no jobs to show.</div>
        )
        return(
            <main className="main">
            <div className="content offers">
                {this.state.loading?loadingList:jobList}
                <Modal className="modal offer" isOpen={this.state.modal || bool} onRequestClose={() => {this.setState({ modal:false }); this.props.history.push('/jobs'); }}>
                    <JobDetails job={this.job} />
                </Modal>
            </div>
            </main>
        )
    }
}

export default JobOffers;