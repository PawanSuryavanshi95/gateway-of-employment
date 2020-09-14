import React, { Component } from 'react';
import Modal from 'react-modal';
import EditDetails from './Employee/EditDetails';
import api from '../../../api/index';
import MessageBox from '../../MessageBox';

class Settings extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: "",
            email1: "",
            msgBox: false,
            messages:[],
            msgType:"neutral",
            receiveMail: "",
            pass1:"",
            pass2:"",
        };
    }

    setModal = (value) => {
        this.setState({
            modal: value,
        });
    }

    changeHandler = (type,e) =>{
        if(type==="radio1"){
            this.setState({ receiveMail:"Yes" });
        }
        else if(type==="radio2"){
            this.setState({ receiveMail:"No" });
        }
        else{
            this.setState({
                [type]: e.target.value
            })
        }
    }

    sendConfirmLink = (_id)=>{
        console.log("send-link");
        api.post('/auth/send-link', { _id: _id }).then(res => {
            console.log(res.data);
        }).catch(e=>{ console.log(e) });
    }

    setMsgBox = (msg,type) => {
        this.setState({ msgBox: true, messages:msg, type:type});
    }

    changeEmailSubmit = (e) => {
        e.preventDefault();
        if(this.state.email1===""){
            this.setMsgBox(["Enter the email."],"negative");
        }
        else{
            const userToken = localStorage.getItem("userToken");
            const headers = { 'X-access-token': userToken }
            api.post("/user/change-email", {headers: headers, email:this.state.email1}, (res)=>{
                if(res.data.success){
                    this.sendConfirmLink(res.data._id);
                    this.setMsgBox(["Email has been changed, please confirm your email."],"positive");
                }
            }).catch(e => {
                this.setMsgBox([e.message],"negative");
            });
        }
    }

    changeEmailModal = () => {
        return( <div className="form">
            <form onSubmit={this.changeEmailSubmit}>
                <input
                    type="email" 
                    placeholder="Email"
                    onChange={(e) => { this.changeHandler("email1",e) }} >
                    </input>
                {this.state.msgBox?<MessageBox messages={this.state.messages} type={this.state.msgType} />:""}
                <input type="submit" value="Change Email"></input>
            </form>
        </div> )
    }

    changePassModal = () => {
        return( <div className="form">
            <form onSubmit={this.changePassSubmit}>
                <input type="text" placeholder="Current Password" onChange={(e) => { this.changeHandler("pass1",e) }} />
                <input type="text" placeholder="New Password" onChange={(e) => { this.changeHandler("pass2",e) }} />
                {this.state.msgBox?<MessageBox messages={this.state.messages} type={this.state.msgType} />:""}
                <input type="submit" value="Change Password"></input>
            </form>
        </div> )
    }

    changePassSubmit = (e) => {
        e.preventDefault();
        if(!this.state.pass1 || !this.state.pass2){
            const messages = [];
            if(!this.state.pass1){
                messages.push("Enter your current password");
            }
            if(!this.state.pass2){
                messages.push("Enter your new password");
            }
            this.setMsgBox(messages,"negative");
        }
        else{
            const userToken = localStorage.getItem("userToken");
            const headers = { 'X-access-token': userToken }
            api.post("/user/change-password", {headers: headers, password:this.state.pass1, new_password:this.state.pass2}, (res)=>{
                if(res.data.success===true){
                    this.setMsgBox(["Password Changed"],"positive");
                }
                else{
                    this.setMsgBox([res.body.message],"negative");
                }
            }).catch(e => {
                this.setMsgBox([e.message],"negative");
            });
        }
    }

    receiveMailSubmit = (e) => {
        e.preventDefault();
        if(this.state.receiveMail===""){
            this.setMsgBox(["Select either of the two options to continue."], "negative");
        }
        else{
            const userToken = localStorage.getItem("userToken");
            const headers = { 'X-access-token': userToken }
            const bool = this.state.receiveMail==="Yes"? true : false;
            api.post("/user/toggle-receive-mail", {headers: headers, receiveMail:bool}, (res)=>{
                console.log(res);
            }).catch(e => {
                this.setMsgBox([e.message],"negative");
            });
        }
    }

    receiveMailModal = () => {
        return( <div className="form">
            <form onSubmit={this.receiveMailSubmit}>
            <label>Do you want to receive emails from us ?</label><br/>
            <input 
                id="yes" 
                type="radio" 
                value="Yes" 
                checked={this.state.receiveMail==="Yes"} 
                onChange={ (e) => { this.changeHandler("radio1",e) } }/>
                <label htmlFor="yes">Yes</label><br/>

            <input 
                id="no" 
                type="radio" 
                value="No" 
                checked={this.state.receiveMail==="No"}
                onChange={ (e) => { this.changeHandler("radio2",e) } }/>
                <label htmlFor="no">No</label><br/>

            {this.state.msgBox?<MessageBox messages={this.state.messages} type={this.state.msgType} />:""}
            <input type="submit" value="Confirm" />
            </form>
        </div> )
    }

    render(){
        // <li onClick={()=>{ this.setState({ modal: "changePass" }) }}>Change Password</li>
        return(
            <div className="user-tab settings">
                <ul>
                    <li>
                    <h2><span>Personal Info</span></h2>
                    <ul>
                        {this.props.type==="employee"? <li onClick={()=>{ this.setState({ modal: "editDetails" }) }}><div className="option">Edit your Additional Details</div></li> :null}
                        <li onClick={()=>{ this.setState({ modal: "changeEmail" }) }}><div className="option">Change Email</div></li>
                        <li onClick={()=>{ this.setState({ modal: "changePass" }) }}><div className="option">Change Password</div></li>
                    </ul>
                    </li>
                    <li>
                    <h2><span>Notifications</span></h2>
                    <ul>
                        <li onClick={()=>{ this.setState({ modal: "email" }) }}><div className="option">Do you want to recieve mails from us?</div></li>
                    </ul>
                    </li>
                </ul>
                <Modal className="modal settings" isOpen={this.state.modal!==""} onRequestClose={() => {this.setState({ modal:"" }) }}>
                    {this.state.modal==="editDetails"? <EditDetails title={"Edit Details"} setModal={this.setModal} />:
                    this.state.modal==="changeEmail"? this.changeEmailModal():
                    this.state.modal==="changePass"? this.changePassModal():
                    this.state.modal==="email"? this.receiveMailModal(): "Wrong Modal"}
                </Modal>
            </div>
        )
    }
}

export default Settings;