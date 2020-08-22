import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNav extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            selected:"Ntf",
        }
    }

    render(){
        return(
            <div className="nav-menu-items side-nav">
                <ul>
                    <li className={this.state.selected==="Ntf"?"Y2":"N"}><Link to="/" onClick={(e)=>{ e.preventDefault(); this.props.sideTabSelector(true); this.setState({selected:"Ntf"});  }}>Notifications</Link></li>
                    <li className={this.state.selected==="Chat"?"Y2":"N"}><Link to="/" onClick={(e)=>{ e.preventDefault(); this.props.sideTabSelector(false); this.setState({selected:"Chat"});  }}>Chats</Link></li>
                </ul>
            </div>
        )
    }
}

export default SideNav;