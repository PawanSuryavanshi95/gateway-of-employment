import React,{Component} from 'react';
import Axios from 'axios';
import MessageBox from '../../MessageBox';

class RegisterFirm extends Component{
    
    constructor(props){
        super(props);

        this.state={
            email:'',
            firmName:'',
            userName:'',
            password:'',
            password2:'',
            msgBox: false,
        }

        this.messages = [];
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const reg = this.props.match.params.reg_id;
        var info = {
            firmName: this.state.firmName,
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password,
            category: "Employer",
        }
        if(this.checkForm(info)){
            this.setState({
                msgBox:false
            })
            return Axios.post('/api/auth/register', {
                info: info,
                create: reg==="1"?"USER_EMPLOYER_FIRM":(reg==="2"?"USER_EMPLOYEE":"Not Defined"),
            }).then(res => {
                console.log('Registeration data sent');
            }).catch(e => {
                console.log('Could not send Registeration data');
            });
        }
        else{
            this.setState({
                msgBox:true
            });
        }
    }

    checkForm(info){
        var submit = true;
        this.messages = [];
        if(!info.firmName){
            submit = false;
            this.messages.push("First Name's field is empty.");
        }
        if(!info.userName){
            submit = false;
            this.messages.push("User Name's field is empty.");
        }
        if(!info.password){
            submit = false;
            this.messages.push("Password field is empty.");
        }
        if(!info.password2){
            submit = false;
            this.messages.push("Please confirm the password");
        }
        if(!info.email){
            submit = false;
            this.messages.push("Email's field is empty.");
        }
        if(info.password!==info.password2){
            submit=false;
            this.messages.push("Passwords don't match");
        }
        return submit;
    }

    changeHandler = (type,e) =>{
        this.setState({
            [type]:e.target.value
        })
    }

    render(){
        return(
            <main className="main">
            <div className="content">
            <div className="form">
                <form onSubmit={this.submitHandler}>
                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={(e) => { this.changeHandler("email",e) }} >
                        </input><br/>

                    <input 
                        type="text" 
                        placeholder="Firm Name"
                        onChange={(e) => { this.changeHandler("firmName",e) }} >
                        </input><br/>
                    
                    <input 
                        type="text" 
                        placeholder="User Name"
                        onChange={(e) => { this.changeHandler("userName",e) }} >
                        </input><br/>

                    <input 
                        type="password" 
                        placeholder="Password"
                        onChange={(e) => { this.changeHandler("password",e) }}>
                        </input><br/>
                    
                    <input 
                        type="password" 
                        placeholder="Confirm Password"
                        onChange={(e) => { this.changeHandler("password2",e) }}>
                        </input><br/>
                    
                    {this.state.msgBox?<MessageBox messages={this.messages} type="negative" /> : <div></div>}

                    <input type="submit" value="Register"></input><br/>
                </form>
                
            </div>
            </div>
            </main>
        )
    }
}

export default RegisterFirm;