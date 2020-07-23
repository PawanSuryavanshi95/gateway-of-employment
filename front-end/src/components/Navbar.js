import React,{ Component } from 'react';
import {withRouter,NavLink,Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Navbar extends Component{
    constructor(props){
        super(props);

        this.state = {
            currentUser : undefined,
            userName : undefined,
        }
    }

    componentDidMount(){
        const user = localStorage.getItem('userToken');
        if(user!==null){
            const userName = jwt_decode(user).userName;
            if(user){
                this.setState({
                    currentUser: user,
                    userName:userName,
                });
            }
        }
    }

    userLogout = () => {
        localStorage.removeItem('userToken');
        this.setState({
            currentUser:undefined
        })
        this.props.history.push('/');
        window.location.reload(false);
    }

    render(){
        const admin = this.props.location.pathname;
        const content = this.state.currentUser===undefined?(
                <ul>
                    <li><NavLink to="/signin">Sign In</NavLink></li>
                </ul>
            ):(
                <ul>
                    <li><NavLink to={`/profile/${this.state.userName}`}>{this.state.userName}</NavLink></li>
                    <li><NavLink to="/posts">Posts</NavLink></li>
                    <li><NavLink to="/" onClick={this.userLogout}>Logout</NavLink></li>
                </ul>
            );
        return (
            <header className="header">
                <div className="brand">
                <Link to="/">Aatma Nirbhar</Link>
            </div>
            <div className="header-links">
                {admin ==="/admin" ? <ul></ul> : content}
            </div>
            </header>
        )
    }
}

export default withRouter(Navbar);