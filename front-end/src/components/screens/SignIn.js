import React,{Component} from 'react';
import { withRouter, Link } from "react-router-dom";
import api from '../../api/index';
import MessageBox from '../MessageBox';
import Modal from 'react-modal';

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
            modal:false,
        }
        this.messages = [];
        this.msgType = [];
    }

    submitHandler = (e) =>{
        e.preventDefault();
        return api.post('/auth/signin', {
            id: this.state.id,
            password: this.state.password,
        }).then(res => {
            if(res.data.success===true){
                localStorage.setItem('userToken',res.data.token);
                const userName = res.data.userName;
                this.props.history.push(`/profile/${userName}`);
                window.location.reload(false);  
                return res.data
            }
            else {
                if(res.data._id!==undefined){
                    this.setState({bool:true, _id:res.data._id});
                }
                this.messages = [res.data.message];
                this.msgType = "negative";
                this.setState({msgBox:true});
            }
        }).catch(e => {
            console.log('Error');
        })
    }

    sendConfirmLink = (e)=>{
        e.preventDefault();
        console.log("send-link");
        api.post('/auth/send-link', { _id: this.state._id }).then(res => {
            console.log(res.data);
        }).catch(e=>{ console.log(e) });
    }

    changeHandler = (type,e) =>{
        this.setState({
            [type]: e.target.value
        })
    }

    forgotPasswordModal = () =>{
        return ( <div className="form">
            <form>
                <input type="text" placeholder="Enter username or password" onChange={(e)=>{this.setState({forPassId:e.target.value});}} />
                <input type="submit" value="Send OTP" />
            </form>
        </div>
        )
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
                                Do you want us to send another confirmation link. <button onClick={this.sendConfirmLink}>Send</button>
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
                    <Modal className="modal" isOpen={this.state.modal} onRequestClose={() => {this.setState({ modal:false }) }}>
                        {this.state.modal? this.forgotPasswordModal() : "Wrong Modal"}
                    </Modal>
                </div>
            </main>
        )
    }
}

export default withRouter(SignIn);