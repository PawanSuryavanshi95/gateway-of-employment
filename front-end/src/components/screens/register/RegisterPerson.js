import React,{Component} from 'react';
import Axios from 'axios';

class RegisterPerson extends Component{
    state={
        email:'',
        firstName:'',
        lastName:'',
        userName:'',
        password:'',
        password2:'',
        gender:'',
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const reg = this.props.match.params.reg_id;
        return Axios.post('/api/user/register', {
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password,
            category: reg==="1"?"Employer":(reg==="2"?"Employee":"Not Defined"),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            create: reg==="1"?"USER_EMPLOYER_INDIVIDUAL":(reg==="2"?"USER_EMPLOYEE":"Not Defined"),
        }).then(res => {
            console.log('Registeration data sent');
        }).catch(e => {
            console.log('Could not send Registeration data');
        })
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
                        onChange={(e) => { this.changeHandler("password",e) }}>
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
                    
                    <input type="submit" value="Register"></input><br/>
                </form>
                
            </div>
            </div>
            </main>
        )
    }
}

export default RegisterPerson;