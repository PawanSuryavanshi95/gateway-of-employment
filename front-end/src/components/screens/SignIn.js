import React,{Component} from 'react';
import { withRouter, Link } from "react-router-dom";
import Axios from 'axios';

class SignIn extends Component{

    state = {
        id:'',
        password:'',
        bool:false,
        _id:"",
    }

    submitHandler = (e) =>{
        e.preventDefault();
        return Axios.post('https://goe-server.herokuapp.com/api/auth/signin', {
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
                this.setState({bool:true, _id:res.data._id});
            }
        }).catch(e => {
            console.log('Error');
        })
    }

    sendConfirmLink = (e)=>{
        e.preventDefault();
        const service = Axios.create({
            baseURL: "https://www.findpathway.com",
            withCredentials: false,
            timeout: 5000,
        });
        service.post('/api/auth/send-link', { _id: this.state._id }).then(res => {
            console.log(res.message);
        }).catch(e=>{ console.log(e) });
    }

    changeHandler = (type,e) =>{
        this.setState({
            [type]: e.target.value
        })
    }

    render(){
        return(
            <main className="main">
                <div className="content">
                    <div className="form">
                        <form onSubmit={this.submitHandler}>
                            <input
                                type="text" 
                                placeholder="User Name or Email"
                                onChange={(e) => { this.changeHandler("id",e) }} >
                                </input>

                            <input 
                                type="password" 
                                placeholder="Password"
                                onChange={(e) => { this.changeHandler("password",e) }}>
                                </input>
                            {this.state.bool===true?<div className="confirm-id">
                                This id has not been activated, to use it you must confirm your email id.<br/>
                                Do you want us to send another confirmation link. <button onClick={this.sendConfirmLink}>Send</button>
                            </div> : null }
                            <input type="submit" value="Sign In"></input>
                        </form>
                        <div className="register-link">
                            <h2> Don't have an account? </h2>
                            <Link to="/register"><button className="button"><span>Register</span></button></Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(SignIn);