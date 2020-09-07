import React, { Component } from 'react';
import api from '../../api/index';
import MessageBox from '../MessageBox';

class InDetails extends Component{
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
        const {internship} = this.props;
        const employer = internship.employer, title = internship.title;
        const userToken = localStorage.getItem("userToken");
        const headers = {
            'X-access-token' : userToken
        }
        var proposal = this.state.proposal;
        if(proposal){
            this.messages = [];
            this.setState({msgBox:false});
            api.post('/offer/apply-internship', {headers : headers, employer: employer, inTitle: title, proposal: proposal}).then(res => {
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

    getData = (title) => {
        console.log(title);
    }

    render(){
        var {internship} = this.props;
        
        return(
            <div className="offer" >
                <h2>{internship.title}</h2>
                <h3><span>from</span> Employer</h3>
                <div className="offer-info">
                    <p>Description : {internship.desc}</p>
                    <p>Requirement : {internship.reqs}</p>
                    <span>This will be a {internship.duration} day internship.</span>
                    <p>What's in it for you ?<br/>{internship.reason}</p>
                    <span>Stipend is {internship.stipend.available?"available":"not available"}.</span><br/>
                    {internship.stipend.available?<p>Amount : {internship.stipend.amount} Rs.</p>:null}
                    <span>{internship.fromHome?"You can work from home.":"You will have to come to the office"}</span><br/>
                    {internship.fromHome?"":<p>Workplace Address : {internship.address}</p>}
                    <p>Other Details : {internship.otherDetails}</p>
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

export default InDetails;