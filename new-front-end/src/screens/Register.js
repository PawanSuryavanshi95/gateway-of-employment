import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import Register1 from '../components/RegisterPerson';
import Register2 from '../components/RegisterFirm';
import auth from '../api/Auth';

import './Register.css';

class Register extends Component{
    constructor(props){
        super(props);

        this.state ={
            current:'screen1',
        }

        this.screen1 = <div>
            <div className="content bg1">
                <div className="center">
                    <p>
                        <h1>What is your purpose ?</h1>
                        <h4>I want to ...</h4>
                        <button className="button white" onClick={()=>{this.setState({current:'screen2'})}}><span>Hire</span></button>
                        <button className="button black" onClick={()=>{this.setState({current:'register-2-person'})}}><span>Get Hired</span></button>
                    </p>
                </div>
            </div>
        </div>;

        this.screen2 = <div>
            <div className="content bg1">
                <div className="center">
                    <p><h2>Who are you ?</h2><br/></p>
                    <button className="button white" onClick={()=>{this.setState({current:'register-1-person'})}}><span>Individual</span></button>
                    <button className="button black" onClick={()=>{this.setState({current:'register-firm'})}}><span>Firm</span></button>
                </div>
            </div>
        </div>;
    }

    getCurrentScreen = ()=>{
        switch(this.state.current){
            case 'screen1': return this.screen1;
            case 'screen2': return this.screen2;
            case 'register-1-person': return <Register1 code="1" />;
            case 'register-2-person': return <Register1 code="2" />;
            case 'register-firm': return <Register2 />;
            default : return <div>I dom't know, I am just a bird.</div>
        }
    }

    render(){
        return (
            <div className="register">
                {this.getCurrentScreen()}
            </div>
        )
    }
}

export default withRouter( Register);