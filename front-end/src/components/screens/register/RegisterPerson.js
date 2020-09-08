import React,{Component} from 'react';
import api from '../../../api/index';
import MessageBox from '../../MessageBox';

class RegisterPerson extends Component{
    
    constructor(props){
        super(props);

        this.state={
            email:'',
            firstName:'',
            lastName:'',
            userName:'',
            password:'',
            password2:'',
            gender: undefined,
            msgBox: false,
            messages: [],
            msgType: "neutral",
            _id:"",
        }
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const reg = this.props.match.params.reg_id;
        var info = {
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password,
            category: reg==="1"?"Employer":(reg==="2"?"Employee":"Not Defined"),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
        }
        var password2 = this.state.password2;
        const { submit, messages } = this.checkForm(info,password2);
        if(submit){
            this.setState({
                msgBox: false,
                messages: [],
            });
            api.post('/auth/register', {
                info: info,
                create: reg==="1"?"USER_EMPLOYER_INDIVIDUAL":(reg==="2"?"USER_EMPLOYEE":"Not Defined"),
            }).then(res => {
                if(res.data.success===true){
                    this.setState({
                        msgBox:true,
                        messages: [res.data.message,"You need to confirm your email to use this id, a confirmation mail was sent to you. ( Check your spam if it is not in your inbox )",],
                        msgType:"positive",
                        _id:res.data._id,
                    });
                    this.sendConfirmLink();
                }
                else{
                    this.setState({
                        msgBox: true,
                        messages:[`Registration failed, ${res.data.message}`,],
                        msgType:"negative",
                    });
                }
            }).catch(e => {
                this.setState({
                    msgBox: true,
                    messages: [e.message,],
                    msgType:"negative",
                });
            })
        }
        else{
            console.log(messages);
            this.setState({
                msgBox: true,
                msgType:"negative",
                messages: messages,
            });
        }
    }

    sendConfirmLink = ()=>{
        console.log("send-link");
        api.post('/auth/send-link', { _id: this.state._id }).then(res => {
            console.log(res.data);
        }).catch(e=>{ console.log(e) });
    }

    checkForm(info,password2){
        var submit = true;
        const messages = [];
        if(!info.firstName){
            submit = false;
            messages.push("First Name's field is empty.");
        }
        if(!info.lastName){
            submit = false;
            messages.push("Last Name's field is empty.");
        }
        if(!info.userName){
            submit = false;
            messages.push("User Name's field is empty.");
        }
        if(!info.password){
            submit = false;
            messages.push("Password field is empty.");
        }
        if(!password2){
            submit = false;
            messages.push("Please confirm the password");
        }
        if(!info.email){
            submit = false;
            messages.push("Email's field is empty.");
        }
        if(!info.gender){
            submit = false;
            messages.push("Please select your gender");
        }
        if(info.password!==password2 && info.password!=="" && password2!==""){
            submit=false;
            messages.push("Passwords don't match");
        }
        return {submit, messages};
    }

    changeHandler = (type,e) =>{
        if(type==="radio1"){
            this.setState({ gender:"Male" });
        }
        else if(type==="radio2"){
            this.setState({ gender:"Female" });
        }
        else{
            this.setState({
                [type]: e.target.value
            });
        }
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
                        placeholder="First Name"
                        onChange={(e) => { this.changeHandler("firstName",e) }} >
                        </input><br/>

                    <input 
                        type="text" 
                        placeholder="Last Name"
                        onChange={(e) => { this.changeHandler("lastName",e) }} >
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

                    <input 
                        id="male" 
                        type="radio" 
                        value="Male" 
                        checked={this.state.gender==="Male"} 
                        onChange={ (e) => { this.changeHandler("radio1",e) } }/>
                        <label htmlFor="male">Male</label><br/>

                    <input 
                        id="female" 
                        type="radio" 
                        value="Female" 
                        checked={this.state.gender==="Female"}
                        onChange={ (e) => { this.changeHandler("radio2",e) } }/>
                        <label htmlFor="female">Female</label><br/>

                    {this.state.msgBox?<MessageBox messages={this.state.messages} type={this.state.msgType} />:null}
                    
                    <input type="submit" value="Register"></input><br/>
                </form>
                
            </div>
            </div>
            </main>
        )
    }
}

export default RegisterPerson;