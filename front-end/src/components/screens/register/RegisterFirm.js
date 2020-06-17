import React,{Component} from 'react';
import Axios from 'axios';

class RegisterFirm extends Component{
    state={
        email:'',
        firmName:'',
        userName:'',
        password:'',
        password2:'',
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const reg = this.props.match.params.reg_id;
        return Axios.post('/api/user/register', {
            firmName: this.state.firmName,
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password,
            create: reg==="1"?"USER_EMPLOYER_FIRM":(reg==="2"?"USER_EMPLOYEE":"Not Defined"),
            category: "Employer",
        }).then(res => {
            console.log('Registeration data sent');
        }).catch(e => {
            console.log('Could not send Registeration data');
        })
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
                    
                    <input type="submit" value="Register"></input><br/>
                </form>
                
            </div>
            </div>
            </main>
        )
    }
}

export default RegisterFirm;