import React, { Component } from 'react';

import auth from '../api/Auth';

import './RegisterForm.css';

class RegisterPerson extends Component{
    constructor(props){
        super(props);

        this.state ={
          email:'',
          firstName:'',
          lastName:'',
          userName:'',
          password:'',
          password2:'',
          gender: undefined,
        }
    }

    submitHandler = async (e) =>{
      e.preventDefault();
      
      const reg = this.props.code;
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
      const submit = this.checkForm(info,password2);

      if(submit){
          const result = await auth.register(info, reg);
          const _id = result._id? result._id: "";
          const result2 = await auth.sendConfirmLink(_id);
      }
  }

  checkForm(info,password2){
      var submit = true;
      if(info.password!==password2 && info.password!=="" && password2!==""){
          submit=false;
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
        return (
            <div  className="register-1">
                <div class="form_wrapper">
  <div class="form_container">
    <div class="title_container">
      <h2>{this.props.code==="1"?'Individual Employer Registration':this.props.code==="2"?'Job/Intern Seeker Registration':"I dom't know, I am just a bird."}</h2>
    </div>
    <div class="row clearfix">
      <div class="">
        <form onSubmit={this.submitHandler}>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
            <input type="email" name="email" placeholder="Email" required onChange={(e) => { this.changeHandler("email",e) }} />
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
            <input type="text" name="username" placeholder="User Name" required onChange={(e) => { this.changeHandler("userName",e) }} />
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <input type="password" name="password" placeholder="Password" required onChange={(e) => { this.changeHandler("password",e) }} />
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <input type="password" name="password" placeholder="Re-type Password" required onChange={(e) => { this.changeHandler("password2",e) }} />
          </div>
          <div class="row clearfix">
            <div class="col_half">
              <div class="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
                <input type="text" name="name" placeholder="First Name" onChange={(e) => { this.changeHandler("firstName",e) }} />
              </div>
            </div>
            <div class="col_half">
              <div class="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
                <input type="text" name="name" placeholder="Last Name" required onChange={(e) => { this.changeHandler("lastName",e) }} />
              </div>
            </div>
          </div>
            	<div class="input_field radio_option">
              <input type="radio" name="radiogroup1" id="rd1" onChange={ (e) => { this.changeHandler("radio1",e) } } />
              <label for="rd1">Male</label>
              <input type="radio" name="radiogroup1" id="rd2" onChange={ (e) => { this.changeHandler("radio2",e) } }/>
              <label for="rd2">Female</label>
              </div>
              {/*
                <div class="input_field select_option">
                <select>
                  <option>Select a country</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <div class="select_arrow"></div>
              </div>
            <div class="input_field checkbox_option">
            	<input type="checkbox" id="cb1"/>
    			<label for="cb1">I agree with terms and conditions</label>
            </div>
            <div class="input_field checkbox_option">
            	<input type="checkbox" id="cb2"/>
    			<label for="cb2">I want to receive the newsletter</label>
            </div>
              */}
          <input class="button" type="submit" value="Register" />
        </form>
      </div>
    </div>
  </div>
</div>
 {/*<p class="credit">Developed by <a href="http://www.designtheway.com" target="_blank">Design the way</a></p>*/}
            </div>
        )
    }
}

export default RegisterPerson;