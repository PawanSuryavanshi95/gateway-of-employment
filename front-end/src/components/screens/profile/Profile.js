import React,{ Component } from 'react';
import { getProfile } from "../../../api/User";
import {Link} from 'react-router-dom';
import NotificationTab from './NotificationTab';
import UserNav from "./UserNav";
import Stats from "./Stats";
import SideNav from './SideNav';
import Chats from './Chats';
import Details from './Employee/Details';
import Jobs from './Employer/Jobs';
import Internships from './Employer/Internships'
import Settings from './Settings';

class Profile extends Component{

    constructor(props){
        super(props);

        this.state = {
            userData : undefined,
            stats: null,
            public: true,
            side:"ntf",
            nav:"",
            internships:null,
        };

        this.editTitle = "";
    }

    componentDidMount(){
        this.profile();
    }

    profile = async () =>{
        const userToken = localStorage.getItem('userToken');
        var bool = userToken? false: true;
        const params = {
            userName: this.props.match.params.userName,
            public: bool,
        }
        const result = await getProfile(params);
        if(!result.userData.confirmed){
            this.props.history.push(`/error/404`);
            window.location.reload(false);
            console.log(result.userData.confirmed);
        }
        else{
            this.setState({
                userData: result.userData,
                public: result.public,
                stats: result.stats,
                nav: result.userData.category==="Employee"? "Info" : result.userData.category==="Employer"? "Job" : "",
            });
        }
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
                <UserNav setNav={this.setNav} type="employee" public={this.state.public} />
                {this.state.nav==="Info" ? <Details details={info.details} pub={this.state.public} /> :
                this.state.nav==="Set" ? <Settings type="employee" />: this.state.nav==="Ntf" ? <NotificationTab category="Employee" /> :
                this.state.nav==="Chat" ? <Chats /> : null}
            </div>
        )
    }

    showEmployerContent(){
        const url = `/profile/${this.props.match.params.userName}/create`;
        const info = this.state.userData.userEmployerInfo;
        var employerName = info.firm ? info.firmName : (info.firstName + " " + info.lastName);
        return(
            <div className="user-content">
                <h1><span>{employerName}</span></h1>
                <UserNav setNav={this.setNav} type="employer" public={this.state.public} />
                {this.state.nav==="Job" ? <Jobs employer={this.state.userData? this.state.userData._id : null} /> : this.state.nav==="In" ? <Internships employer={this.state.userData? this.state.userData._id : null}/> :
                this.state.nav==="Set" ? <Settings type="employer" />: this.state.nav==="Ntf" ? <NotificationTab category="Employer" /> :
                this.state.nav==="Chat" ? <Chats /> : null}
                <div className="create-offers">
                {this.state.public===true ? null : <Link to={url+'-job'}><button className="button large"><span>Post a Job</span></button></Link> }
                {this.state.public===true ? null : <Link to={url+'-internship'}><button className="button large"><span>Post an Internship</span></button></Link> }
                </div>
            </div>
        )
    }

    setNav = (value) => {
        this.setState({
            nav:value,
        });
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
                    <div className="nav"> <SideNav sideTabSelector={this.sideTabSelector} /> </div>
                    { this.state.side ? <NotificationTab category={category} /> : <Chats/>}
                    <div className="foot" ></div>
                </div> :
                <Stats data={this.state.stats} />
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
                    {!this.state.public ? <div className="stats-container"><Stats data={this.state.stats} type={category} /></div>:<div></div>}
                </div>
            </main>
        )
    }
}

export default Profile;