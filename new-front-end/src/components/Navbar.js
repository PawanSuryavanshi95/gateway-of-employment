import React,{ Component } from 'react';
import {withRouter} from 'react-router-dom';

import { Button } from 'reactstrap';

import './Navbar.css';

class NavMenu extends Component{
    constructor(props){
        super(props);

        this.state = {
            currentUser : undefined,
            userName : undefined,
            selected:'',
            sidebar:false,
            isOpen:false,
        }

        this.toggle = true;

        this.state.loggedIn = localStorage.getItem('userToken')!==''?true:false;
    }

    handleScroll = (event) => {
        if(window.pageYOffset>50){
            document.querySelector(".nav").classList.add('affix');
        }
        else{
            document.querySelector(".nav").classList.remove('affix');
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
    

    toggler = () => {
        if(this.toggle){
            document.querySelector(".navTrigger").classList.add('active');
            document.querySelector("#mainListDiv").classList.add('show_list');
            this.toggle = false;
        }
        else{
            document.querySelector(".navTrigger").classList.remove('active');
            document.querySelector("#mainListDiv").classList.remove('show_list');
            this.toggle = true;
        }
        
    };

    userLogout = () => {
        localStorage.removeItem('userToken');
        this.setState({
            loggedIn:false,
            currentUser:undefined,
            selected:"",
        })
        this.props.history.push('/');
        window.location.reload(false);
    }

    render(){
        return (
            <div className="header">
                <nav className="nav">
                <div className="container">
                    <div className="logo">
                    <a href="/">Head-Start</a>
                    </div>
                    <div id="mainListDiv" className="main_list">
                        <ul className="navlinks">
                            <li><a href="/jobs">Jobs</a></li>
                            <li><a href="/internships">Internships</a></li>
                            <li><a href="/">About</a></li>
                            <li><a href="/signin">Sign In</a></li>
                        </ul>
                    </div>
                    <span className="navTrigger" onClick={this.toggler}>
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </div>
            </nav>
            
            {this.props.history.location.pathname==='/'?
            <div id="particles">
                <div id="webcoderskull">
                    <h1>Head Start</h1>
                    <p> Some Catchy Tag line </p>          
                    <Button> Sign up </Button>          
                </div>
                </div>:null}
        
            </div>
        )
    }
}
export default withRouter(NavMenu);
        