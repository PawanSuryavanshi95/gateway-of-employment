import React, { Component } from 'react';

import auth from '../api/Auth';

import './SignIn.css';

class SignIn extends Component{
    constructor(props){
        super(props);

        this.state ={
            username:"",
            pass:"",
        }
    }

    submitHandler = (e)=>{
      e.preventDefault();

      auth.signin(this.state.username, this.state.pass).then(data=>{
        console.log(data);
        this.props.history.push(`/profile/${data.userName}`);
      window.location.reload(false);  
      });
      
    }

    render(){
        return (
            <div  className="sign-in">
            
            <div class="wrapper fadeInDown">
              <div id="formContent">
                <h2 class="active"> Sign In </h2>
                <form onSubmit={this.submitHandler}>
                  <input type="text" id="login" class="fadeIn second" name="login" placeholder="login" onChange={(e)=>{this.setState({username:e.target.value})}}/>
                  <input type="text" id="password" class="fadeIn third" name="login" placeholder="password" onChange={(e)=>{this.setState({pass:e.target.value})}}/>
                  <input type="submit" class="fadeIn fourth" value="Log In"/>
                </form>

                <a class="underlineHover reg" href="/register">Don't have an account? Register</a>
                <div id="formFooter">
                  <a class="underlineHover" href="#">Forgot Password?</a>
                </div>

              </div>
            </div>

            </div>
        )
    }
}

export default SignIn;