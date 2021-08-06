import React, { Component } from 'react';

import auth from '../api/Auth';

import './RegisterForm.css';

class RegisterFirm extends Component{
    constructor(props){
        super(props);

        this.state ={
          email:'',
          firmName:'',
          userName:'',
          password:'',
          password2:'',
        }
    }

    submitHandler = async (e) =>{
      e.preventDefault();
      const reg = this.props.match.params.reg_id;
      var info = {
          firmName: this.state.firmName,
          email: this.state.email,
          userName: this.state.userName,
          password: this.state.password,
          category: "Employer",
      }
      const submit = this.checkForm(info, this.state.password2);

      if(submit){
          const result = await auth.register(info, reg);
          const _id = result._id? result._id: "";
          const result2 = await auth.sendConfirmLink(_id);   
      }
  }

  checkForm(info, password2){
      var submit = true;
      if(info.password!==password2 && info.password!=="" && password2!==""){
          submit=false;
      }
      return submit;
  }

  changeHandler = (type,e) =>{
      this.setState({
          [type]:e.target.value
      })
  }

    render(){
        return (
            <div  className="register-1">
                <div class="form_wrapper">
  <div class="form_container">
    <div class="title_container">
      <h2>Firm Employer Registration</h2>
    </div>
    <div class="row clearfix">
      <div class="">
        <form>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
            <input type="email" name="email" placeholder="Email" required onChange={(e) => { this.changeHandler("email",e) }} />
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
            <input type="text" name="firmname" placeholder="Firm Name" required onChange={(e) => { this.changeHandler("firmName",e) }} />
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
            <input type="text" name="username" placeholder="User Name" required onChange={(e) => { this.changeHandler("userName",e) }} />
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <input type="password" name="password" placeholder="Password" required onChange={(e) => { this.changeHandler("password",e) }}/>
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <input type="password" name="password" placeholder="Re-type Password" required onChange={(e) => { this.changeHandler("password2",e) }}/>
          </div>
          <input class="button" type="submit" value="Register" />
        </form>
      </div>
    </div>
  </div>
</div>
            </div>
        )
    }
}

export default RegisterFirm;