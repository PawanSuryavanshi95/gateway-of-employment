import React, { Component } from 'react';
import api from '../../api/index';
import MessageBox from '../MessageBox';

class JobDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            proposal:undefined,
            msgBox:false,
        };
        this.messages = [];
        this.msgType = "neutral";
    }

    setMsgBox = (msg,type) => {
        this.setState({ msgBox: true});
        this.messages = [msg];
        this.msgType = type;
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
        if(proposal){
            this.messages = [];
            this.setState({msgBox:false});
            api.post('/offer/apply-job', {headers : headers, employer: employer, jobTitle: title, proposal: proposal}).then(res => {
                if(res.error){
                    return <div>
                        Error occurered {res.error}
                    </div>
                }
            });
        }
        else{
            this.setMsgBox(["Proposal cannot be empty."], "negative");
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
                <h3><span>from</span>{" "+job.employerName}</h3>
                <div className="offer-info">
                    <div><span>This is a {job.permanent?"long term ,":""} {job.fullTime?"full time":"part time"} job {job.permanent?"":` for ${job.duration} days`}.</span></div>
                    <div><p className="title">Description : </p>{job.desc}</div>
                    <div><p className="title">Requirement : </p>{job.reqs}</div>
                    <div><p className="title">What's in it for you ? </p>{job.reason}</div>
                    <div><p className="title">Salary : {job.salary} Rs.</p></div>
                    <div><span>{job.fromHome?"You can work from home.":"You will have to come to the office"}</span></div>
                    <div>{job.fromHome?"":<p className="title">Workplace Address : </p>}{job.address}</div>
                    <div><p className="title">Other Details :</p>{job.otherDetails}</div>
                </div>
                <div className="offer-apply">
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