import React, { Component } from 'react';

class EmployerNav extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected:"Job",
        }
    }

    render(){
        return(
            <div className="nav-menu-items user-nav">
                <ul>
                    <li className={this.state.selected==="Job"?"Y1":"N"}><a onClick={()=>{ this.props.setNav(true); this.setState({selected:"Job"}); }} >Jobs</a></li>
                    <li className={this.state.selected==="In"?"Y1":"N"}><a onClick={()=>{ this.props.setNav(false); this.setState({selected:"In"}); }} >Internships</a></li>
                </ul>
            </div>
        )
    }
}

export default EmployerNav;