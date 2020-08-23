import React,{Component} from 'react';
import Axios from 'axios';
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
        }

        this.messages = [];
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
            return Axios.post('https://goe-server.herokuapp.com/api/auth/register', {
                info: info,
                create: reg==="1"?"USER_EMPLOYER_INDIVIDUAL":(reg==="2"?"USER_EMPLOYEE":"Not Defined"),
            }).then(res => {
                if(res.error){
                    this.messages = ["Registration failed"];
                    this.setState({ msgBox: true });
                }
                else{
                    this.props.history.push('/signin');
                }
            }).catch(e => {
                console.log('Could not send Registeration data');
            })
        }
        else{
            this.setState({
                msgBox: true
            });
        }
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

                    {this.state.msgBox?<MessageBox messages={this.messages} type="negative" />:null}
                    
                    <input type="submit" value="Register"></input><br/>
                </form>
                
            </div>
            </div>
            </main>
        )
    }
}

export default RegisterPerson;