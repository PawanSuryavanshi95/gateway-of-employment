import React,{ Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NotificationTab from './NotificationTab';
import EmployerNav from "./EmployerNav";
import Stats from "./Stats";
import SideNav from './SideNav';
import Chats from './Chats';
import Details from './Details';

class Profile extends Component{

    constructor(props){
        super(props);

        this.state = {
            userData : undefined,
            public: true,
            side:"ntf",
        };

        this.editTitle = "";
    }

    componentDidMount(){
        const userToken = localStorage.getItem('userToken');
        const headers = {
            'X-access-token': userToken,
        }
        var bool;
        if(userToken){
            bool = false;
        }
        else{
            bool = true;
        }
        const params = {
            userName: this.props.match.params.userName,
            public: bool,
        }
        axios.get('/api/user/profile', { headers: headers, params: params })
        .then(res => {
            if(!res.error){
                this.setState({
                    userData: res.data.userData,
                    public: res.data.public,
                });
            }
            else{
                return <div>
                    Error occurered {res.error}
                </div>
            }
        }).catch(e=>{
            console.log(e)
        });
    }

    displayContent(category){
        return category==='Employee'?
            this.showEmployeeContent() : category==='Employer'?
            this.showEmployerContent() : <div className="no-content" >No Content</div>
    }

    showEmployeeContent(){
        const info = this.state.userData.userEmployeeInfo;
        return(
            <div className="user-content">
                <h1><span>{info.firstName}</span>{" "}{info.lastName}</h1>
                {<Details details={info.details} public={this.state.public} setEditDetails={this.setEditDetails} />}
            </div>
        )
    }

    showEmployerContent(){
        const url = `/profile/${this.props.match.params.userName}/create`;
        const info = this.state.userData.userEmployerInfo;
        console.log(this.state.userData);
        return(
            <div className="user-content">
                <h1><span>{info.firmName}</span></h1>
                <EmployerNav/>
                <Link to={url}><button className="button"><span>Post a job Offer</span></button></Link>
            </div>
        )
    }

    setEditDetails = (value,title) => {
        this.setState({
            editDetails:value
        });
        this.editTitle = title;
    }

    sideTabSelector = (value) => {
        this.setState({
            side:value
        });
    }

    displaySideContent(category){
        return(
            !this.state.public?
                <div className="side-tab">
                    <SideNav sideTabSelector={this.sideTabSelector} />
                    { this.state.side ? <NotificationTab category={category} /> : <Chats/>}
                </div> :
                <div className="side-tab"> <Stats/> </div>
        )
    }

    render(){
        var category = this.state.userData ? this.state.userData.category : undefined;
        return(
            <main className="main">
                <div className="profile-content">
                    {this.displayContent(category)}
                    <div className="side-container">
                        {this.displaySideContent(category)}
                    </div>
                    {!this.state.public?<Stats/>:<div></div>}
                </div>
            </main>
        )
    }
}

export default Profile;