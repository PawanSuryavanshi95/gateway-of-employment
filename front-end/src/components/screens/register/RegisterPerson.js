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
            msgBox:false,
            _id:"",
        }

        this.messages = [];
        this.msgType = "neutral";
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
        
        if(this.checkForm(info,password2)){
            this.setState({
                msgBox: false
            });
            this.messages = [];
            api.post('/auth/register', {
                info: info,
                create: reg==="1"?"USER_EMPLOYER_INDIVIDUAL":(reg==="2"?"USER_EMPLOYEE":"Not Defined"),
            }).then(res => {
                if(res.data.success===true){
                    this.setState({
                        msgBox:true,
                        _id:res.data._id,
                    });
                    this.messages.push(res.data.message);
                    this.messages.push("You need to confirm your email to use this id, a confirmation mail was sent to you. ( Check your spam if it is not in your inbox )");
                    this.msgType = "positive";
                    this.sendConfirmLink();
                }
                else{
                    this.setState({
                        msgBox: true
                    });
                    this.msgType = "negative";
                    this.messages.push(`Registration failed, ${res.data.message}`);
                }
            }).catch(e => {
                this.setState({
                    msgBox: true
                });
                this.msgType = "negative";
                this.messages.push(e.message);
            })
        }
        else{
            this.setState({
                msgBox: true
            });
            this.msgType = "negative";
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
        this.messages = [];
        if(!info.firstName){
            submit = false;
            this.messages.push("First Name's field is empty.");
        }
        if(!info.lastName){
            submit = false;
            this.messages.push("Last Name's field is empty.");
        }
        if(!info.userName){
            submit = false;
            this.messages.push("User Name's field is empty.");
        }
        if(!info.password){
            submit = false;
            this.messages.push("Password field is empty.");
        }
        if(!password2){
            submit = false;
            this.messages.push("Please confirm the password");
        }
        if(!info.email){
            submit = false;
            this.messages.push("Email's field is empty.");
        }
        if(!info.gender){
            submit = false;
            this.messages.push("Please select your gender");
        }
        if(info.password!==password2 && info.password!=="" && password2!==""){
            submit=false;
            this.messages.push("Passwords don't match");
        }
        return submit;
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
        console.log(this.messages,this.msgType);
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

                    {this.state.msgBox?<MessageBox messages={this.messages} type={this.msgType} />:null}
                    
                    <input type="submit" value="Register"></input><br/>
                </form>
                
            </div>
            </div>
            </main>
        )
    }
}

export default RegisterPerson;