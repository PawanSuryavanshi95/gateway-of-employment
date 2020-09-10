import React, { Component } from 'react';

class EmployerNav extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: this.props.type==="employer"? "Job": this.props.type==="employee"? "Info": "",
        }
    }

    render(){
        return(
            <div className="nav-menu-items user-nav">
                {this.props.type==="employer"?
                <ul>
                    <li className={this.state.selected==="Job"?"Y1":"N"}><a onClick={()=>{ this.props.setNav("Job"); this.setState({selected:"Job"}); }} >Jobs</a></li>
                    <li className={this.state.selected==="In"?"Y1":"N"}><a onClick={()=>{ this.props.setNav("In"); this.setState({selected:"In"}); }} >Internships</a></li>
                    {!this.props.public? <li className={this.state.selected==="Set"?"Y1":"N"}><a onClick={()=>{ this.props.setNav("Set"); this.setState({selected:"Set"}); }} >Settings</a></li>: null}
                    {!this.props.public? <li className={(this.state.selected==="Ntf"?"Y1":"N") + " mob"}><a onClick={()=>{ this.props.setNav("Ntf"); this.setState({selected:"Ntf"}); }} >Notifications</a></li>: null}
                    {!this.props.public? <li className={(this.state.selected==="Chat"?"Y1":"N") + " mob"}><a onClick={()=>{ this.props.setNav("Chat"); this.setState({selected:"Chat"}); }} >Chats</a></li>: null}
                </ul> : this.props.type==="employee"?
                <ul>
                    <li className={this.state.selected==="Info"?"Y1":"N"}><a onClick={()=>{ this.props.setNav("Info"); this.setState({selected:"Info"}); }} >Info</a></li>
                    {!this.props.public? <li className={this.state.selected==="Set"?"Y1":"N"}><a onClick={()=>{ this.props.setNav("Set"); this.setState({selected:"Set"}); }} >Settings</a></li>: null}
                    {!this.props.public? <li className={(this.state.selected==="Ntf"?"Y1":"N") + " mob"}><a onClick={()=>{ this.props.setNav("Ntf"); this.setState({selected:"Ntf"}); }} >Notifications</a></li>: null}
                    {!this.props.public? <li className={(this.state.selected==="Chat"?"Y1":"N") + " mob"}><a onClick={()=>{ this.props.setNav("Chat"); this.setState({selected:"Chat"}); }} >Chats</a></li>: null}
                </ul> : null}
            </div>
        )
    }
}

export default EmployerNav;