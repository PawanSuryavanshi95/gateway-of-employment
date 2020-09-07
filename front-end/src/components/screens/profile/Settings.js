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
            receiveMail: "",
        };

        this.messages = [];
        this.msgType = "neutral";
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

    setMsgBox = (msg,type) => {
        this.setState({ msgBox: true});
        this.messages = [msg];
        this.msgType = type;
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
                console.log(res);
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
                {this.state.msgBox?<MessageBox messages={this.messages} type={this.msgType} />:""}
                <input type="submit" value="Change Email"></input>
            </form>
        </div> )
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

            {this.state.msgBox?<MessageBox messages={this.messages} type={this.msgType} />:""}
            <input type="submit" value="Confirm" />
            </form>
        </div> )
    }

    render(){
        // <li onClick={()=>{ this.setState({ modal: "changePass" }) }}>Change Password</li>
        return(
            <div className="settings">
                <ul>
                    <li>
                    <h3>Personal Info :</h3>
                    <ul>
                        {this.props.type==="employee"? <li onClick={()=>{ this.setState({ modal: "editDetails" }) }}>Edit your Additional Details</li> :null}
                        <li onClick={()=>{ this.setState({ modal: "changeEmail" }) }}>Change Email</li>
                    </ul>
                    </li>
                    <li>
                    <h3>Notifications :</h3>
                    <ul>
                        <li onClick={()=>{ this.setState({ modal: "email" }) }}>Do you want to recieve mails from us?</li>
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