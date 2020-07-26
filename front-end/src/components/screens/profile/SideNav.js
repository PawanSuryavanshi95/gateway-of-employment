import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNav extends Component{
    
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return(
            <div className="nav-menu-items profile">
                <ul>
                    <li><Link onClick={()=>{ this.props.sideTabSelector(true) }}>Notifications</Link></li>
                    <li><Link onClick={()=>{ this.props.sideTabSelector(false) }}>Chats</Link></li>
                </ul>
            </div>
        )
    }
}

export default SideNav;