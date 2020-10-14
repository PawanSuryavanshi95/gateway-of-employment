import React,{Component} from 'react';
import { withRouter, Link } from "react-router-dom";
import MessageBox from '../MessageBox';
import Modal from 'react-modal';
import { sendConfirmLink, signin } from '../../api/Auth';
import { forgotPassOTP, forgotPassword } from '../../api/User';

class SignIn extends Component{

    constructor(props){
        super(props);
        this.state = {
            id:'',
            password:'',
            bool:false,
            _id:"",
            msgBox:false,
            forPassId:"",
            otpID:"",
            modal:"",
            otpBox:false,
            otp:"",
            newPass1:"",
            newPass2:"",
        }
        this.messages = [];
        this.msgType = [];
    }

    submitHandler = async (e) =>{
        e.preventDefault();
        const result = await signin(this.state.id, this.state.password);
        if(result.success===true){
            localStorage.setItem('userToken',result.token);
            const userName = result.userName;
            this.props.history.push(`/profile/${userName}`);
            window.location.reload(false);  
        }
        else {
            if(result._id!==undefined){
                this.setState({bool:true, _id:result._id});
            }
            this.messages = [result.message];
            this.msgType = "negative";
            this.setState({msgBox:true});
        }
    }

    sendLink = async (e)=>{
        e.preventDefault();
        const result = await sendConfirmLink(this.state._id);
        this.messages = ["Confirmation Link Sent, click on 'send link' to send again."];
        this.msgType = "positive";
        this.setState({msgBox:true});
    }

    changeHandler = (type,e) =>{
        this.setState({
            [type]: e.target.value
        })
    }

    forgotPasswordModal = () =>{
        return ( <div className="form">
            <form onSubmit={this.forgotPasswordSubmit}>
                <input type="text" placeholder="Enter username or password" onChange={(e)=>{this.setState({forPassId:e.target.value});}} />
                <input type="submit" value="Send OTP" />
            </form>
            {this.state.otpBox? <form onSubmit={this.changePassword}>
                <input type="number" placeholder="Enter otp" onChange={(e)=>{this.setState({otp:e.target.value});}} />
                <input type="password" placeholder="Enter New Password" onChange={(e)=>{this.setState({newPass1:e.target.value});}} />
                <input type="password" placeholder="Confirm New Password" onChange={(e)=>{this.setState({newPass2:e.target.value});}} />
                <input type="submit" value="Change Password" />
            </form> : null}
        </div>
        )
    }

    forgotPasswordSubmit = async (e) => {
        e.preventDefault();
        const id = this.state.forPassId;
        const result = await forgotPassword(id);
        if(result.success){
            this.setState({ otpBox:true, otpID:id });
        }
        else{
            this.messages = [result.message];
            this.msgType = "negative";
            this.setState({ msgBox:true, modal:"", otpID:"", otpBox:false });
        }
    }

    changePassword = async (e) => {
        e.preventDefault();
        const result = await forgotPassOTP(this.state.otpID, this.state.otp, this.state.newPass1);
        if(result.success){
            this.messages = ["Password Changed."];
            this.msgType = "positive";
            this.setState({msgBox:true, modal:""});
        }
        else{
            this.messages = [result.message];
            this.msgType = "negative";
            this.setState({msgBox:true, modal:""});
        }
    }

    render(){
        return(
            <main className="main">
                <div className="content">
                    <div className="form">
                        <form onSubmit={this.submitHandler}>
                            <input type="text" placeholder="User Name or Email" onChange={(e) => { this.changeHandler("id",e) }} />
                            <input type="password" placeholder="Password" onChange={(e) => { this.changeHandler("password",e) }} />
                            {this.state.bool===true?<div className="confirm-id">
                                This id has not been activated, to use it you must confirm your email id. (Please check inside spam if not found inside your inbox)<br/>
                                Do you want us to send another confirmation link. <button onClick={this.sendLink}>Send</button>
                            </div> : null }
                            {this.state.msgBox?<MessageBox messages={this.messages} type={this.msgType} />:""}
                            <input type="submit" value="Sign In"></input>
                        </form>
                        <button className="forgot-password" onClick={()=>{this.setState({modal:"forgotPassword"})}}>Forgot Password?</button>
                        <div className="register-link">
                            <h2> Don't have an account? </h2>
                            <Link to="/register"><button className="button"><span>Register</span></button></Link>
                        </div>
                    </div>
                    <Modal className="modal" isOpen={this.state.modal!==""} onRequestClose={() => {this.setState({ modal:"" }) }}>
                        {this.state.modal==="forgotPassword"? this.forgotPasswordModal() : "Wrong Modal"}
                    </Modal>
                </div>
            </main>
        )
    }
}

export default withRouter(SignIn);