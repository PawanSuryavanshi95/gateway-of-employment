import React, { Component } from 'react';
import MessageBox from '../../MessageBox';
import Axios from 'axios';

class LogIn extends Component{
    constructor(props){
        super(props);

        this.state = {
            info: {
                userName:"",
                password:"",
            },
            msgBox: false,
        }

        this.messages = [];
    }

    handleChange = (e) => {
        var info = { ...this.state.info };
        info[e.target.id] =  e.target.value;
        this.setState({ info: info });
    }

    checkForm(info){
        var submit = true;
        this.messages = [];
        if(!info.userName){
            this.messages.push("UserName field is empty.");
            submit = false;
        }
        if(!info.password){
            this.messages.push("Password field is empty.");
            submit = false;
        }
        return submit;
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const {info} = this.state;
        if(this.checkForm(info)){
            this.setState({ msgBox:false });
            this.messages = [];
            Axios.post("/api/user/admin", { userName:info.userName, password:info.password }).then(res => {
                if(!res.error){
                    if(res.data.verified){
                        const data = {
                            userList:res.data.userList,
                            jobList:res.data.jobList,
                        };
                        this.setState({ msgBox:false });
                        this.messages = [];
                        this.props.onLogIn(true,res.data.token);
                        this.props.getData(data);
                    }
                    else{
                        this.messages.push(res.data.message);
                        this.setState({ msgBox:true });
                        this.props.onLogIn(false);
                    }
                }
            });
        }
        else{
            this.setState({ msgBox:true });
        }
    }

    render(){
        return(
            <div className="admin-login">
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <input id="userName" type="text" placeholder="Admin UserName" onChange={(e)=>{ this.handleChange(e) }}/>
                        <input id="password" type="password" placeholder="Password" onChange={(e)=>{ this.handleChange(e) }}/>
                        {this.state.msgBox?<MessageBox messages={this.messages}/>:<div></div>}
                        <input type="submit" value="Log In" />
                    </form>
                </div>
            </div>
        )
    }
}

export default LogIn;