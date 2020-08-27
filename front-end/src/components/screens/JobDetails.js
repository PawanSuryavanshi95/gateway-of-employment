import React, { Component } from 'react';
import Axios from 'axios';
import MessageBox from '../MessageBox';

class JobDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            proposal:undefined,
            msgBox:false,
        };
        this.messages = [];
    }

    handleApply = (e) => {
        e.preventDefault();
        const {job} = this.props;
        const employer = job.employer, title = job.title;
        const userToken = localStorage.getItem("userToken");
        const headers = {
            'X-access-token' : userToken
        }
        var proposal = this.state.proposal;
        console.log(localStorage);
        if(proposal){
            this.messages = [];
            this.setState({msgBox:false});
            Axios.post('https://goe-server.herokuapp.com/api/offer/apply-job', {headers : headers, employer: employer, jobTitle: title, proposal: proposal}).then(res => {
                if(res.error){
                    return <div>
                        Error occurered {res.error}
                    </div>
                }
            });
        }
        else{
            this.setState({
                msgBox:true
            });
            this.messages = ["Proposal cannot be empty"];
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    getData = (title) =>{
        console.log(title)
    }

    render(){
        var {job} = this.props;
        
        return(
            <div className="offer" >
                <h2>{job.title}</h2>
                <h3><span>from</span> Employer</h3>
                <div className="offer-info">
                    <span>This is a {job.permanent?"long term ,":""} {job.fullTime?"full time":"part time"} job {job.permanent?"":` for ${job.duration} days`}.</span><br/>
                    <p>Description : {job.desc}</p>
                    <p>Requirement : {job.reqs}</p>
                    <p>What's in it for you ? <br/>{job.reason}</p>
                    <p>Salary : {job.salary} Rs.</p>
                    <span>{job.fromHome?"You can work from home.":"You will have to come to the office"}</span><br/>
                    {job.fromHome?"":<p>Workplace Address : {job.address}</p>}
                    <p>Other Details : {job.otherDetails}</p>
                    <div className="form no-box"><form>
                    <textarea id="proposal" placeholder="Enter a proposal" onChange={(e)=>{this.handleChange(e)}} />
                    {this.state.msgBox?<MessageBox messages={this.messages} type="negative" />:null}
                    <input type="submit" value="Apply" onClick={this.handleApply}/>
                    </form></div>
                </div>
            </div>
        )
    }
}

export default JobDetails;