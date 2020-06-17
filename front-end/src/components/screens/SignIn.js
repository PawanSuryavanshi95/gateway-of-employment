import React,{Component} from 'react';
import { withRouter, Link } from "react-router-dom";
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

class SignIn extends Component{

    state = {
        id:'',
        password:'',
    }

    submitHandler = (e) =>{
        e.preventDefault();
        return Axios.post('/api/user/signin', {
            id: this.state.id,
            password: this.state.password,
        }).then(res => {
            console.log('SignIn data sent');
            localStorage.setItem('userToken',res.data);
            const userName = jwt_decode(res.data).userName;
            this.props.history.push(`/profile/${userName}`);
            window.location.reload(false);  
            return res.data
        }).catch(e => {
            console.log('Error');
        })
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

                            <input type="submit" value="Sign In"></input>
                        </form>
                    </div>
                    <div className="register-link">
                        <h2> Don't have an account? </h2>
                        <Link to="/register"><button className="button"><span>Register</span></button></Link>
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(SignIn);