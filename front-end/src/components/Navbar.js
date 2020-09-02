import React,{ Component } from 'react';
import {withRouter,NavLink,Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Navbar extends Component{
    constructor(props){
        super(props);

        this.state = {
            currentUser : undefined,
            userName : undefined,
            selected:'',
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
            currentUser:undefined,
            selected:"",
        })
        this.props.history.push('/');
        window.location.reload(false);
    }

    render(){
        const admin = this.props.location.pathname,selected=this.state.selected;
        const content = this.state.currentUser===undefined?(
                <ul>
                    <li className={selected==="signin" ? "Y":"N" }><NavLink to="/signin" onClick={()=>{this.setState({selected:"signin"})}}>Sign In</NavLink></li>
                    <li className={selected==="in" ? "Y":"N" }><NavLink to="/internships" onClick={()=>{this.setState({selected:"in"})}}>Internships</NavLink></li>
                    <li className={selected==="job" ? "Y":"N" }><NavLink to="/jobs" onClick={()=>{this.setState({selected:"job"})}}>Jobs</NavLink></li>
                </ul>
            ):(
                <ul>
                    <li className={selected==="profile" ? "Y":"N" }><NavLink to={`/profile/${this.state.userName}`} onClick={()=>{this.setState({selected:"profile"})}}>{this.state.userName}</NavLink></li>
                    <li className={selected==="in" ? "Y":"N" }><NavLink to="/internships" onClick={()=>{this.setState({selected:"in"})}}>Internships</NavLink></li>
                    <li className={selected==="job" ? "Y":"N" }><NavLink to="/jobs" onClick={()=>{this.setState({selected:"job"})}}>Jobs</NavLink></li>
                    <li className="N"><NavLink to="/" onClick={this.userLogout}>Logout</NavLink></li>
                </ul>
            );
        return (
            <header className="header">
            <div className="brand">
                <div className="img-container"><img src={process.env.PUBLIC_URL + '/images/logo_G.o.e_1.png'}/></div>
                <Link to="/">Gateway<span>of Employment</span></Link>
            </div>
            <input type="checkbox" id="menu-btn" className="menu-btn" />
            <label for="menu-btn" id="menu-btn-icon" className="menu-btn-icon">
            <i class="fa fa-bars"></i>
            </label>
            <div className="brand2"><Link to="/">Gateway of Employment</Link></div>
            <div className="header-links">
            <nav>
                {admin ==="/admin" ? <ul></ul> : content}
            </nav>
            </div>
            </header>
        )
    }
}
export default withRouter(Navbar);