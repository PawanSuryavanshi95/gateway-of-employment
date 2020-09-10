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
                <h3><span>from</span>{" "+internship.employerName}</h3>
                <div className="offer-info">
                    <div><p className="title">Description :</p> {internship.desc}</div>
                    <div><p className="title">Requirement : </p>{internship.reqs}</div>
                    <div><span>This will be a {internship.duration} day internship.</span></div>
                    <div><p className="title">What's in it for you ?</p>{internship.reason}</div>
                    <div><span>Stipend is {internship.stipend?internship.stipend.available?"available":"not available":"not available"}.</span></div>
                    <div>{internship.stipend?internship.stipend.available?<p className="title">Amount :  Rs.</p>:null:null}{internship.stipend.amount}</div>
                    <div><span>{internship.fromHome?"You can work from home.":"You will have to come to the office"}</span></div>
                    <div>{internship.fromHome?"":<p className="title">Workplace Address : </p>} {internship.address}</div>
                    <div><p className="title">Other Details : </p>{internship.otherDetails}</div>
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