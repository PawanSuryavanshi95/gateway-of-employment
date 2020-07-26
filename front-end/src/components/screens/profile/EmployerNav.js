import React, { Component } from 'react';

class EmployerNav extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div className="nav-menu-items profile">
                <ul>
                    <li><a>Jobs</a></li>
                    <li><a>Internships</a></li>
                </ul>
            </div>
        )
    }
}

export default EmployerNav;