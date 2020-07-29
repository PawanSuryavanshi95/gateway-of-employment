import React, { Component } from 'react';

class EmployerNav extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div className="nav-menu-items user-nav">
                <ul>
                    <li><a onClick={()=>{ this.props.setNav(true) }} >Jobs</a></li>
                    <li><a onClick={()=>{ this.props.setNav(false) }} >Internships</a></li>
                </ul>
            </div>
        )
    }
}

export default EmployerNav;