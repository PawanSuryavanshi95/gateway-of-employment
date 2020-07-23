import React,{ Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NotificationTab from './NotificationTab';
import EmployeeDetails from "./EmployeeDetails";
import EmployerDetails from "./EmployerDetails";

class Profile extends Component{

    constructor(props){
        super(props);

        this.state = {
            userData : undefined,
            public: undefined,
        };
    }

    componentDidMount(){
        const userToken = localStorage.getItem('userToken');
        const headers = {
            'X-access-token': userToken
        }
        axios.get('/api/user/profile', { headers: headers, params: { userName: this.props.match.params.userName } })
        .then(res => {
            if(!res.error){
                console.log(res.data);
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

                <EmployeeDetails details={info.details} public={this.state.public}/>
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
                <EmployerDetails />
                <Link to={url}><button className="button"><span>Post a job Offer</span></button></Link>
            </div>
        )
    }

    render(){
        var category = this.state.userData ? this.state.userData.category : undefined;

        return(
            <main className="main">
                <div className="profile-content">
                    {this.displayContent(category)}
                    <div className="side-tab">
                    <NotificationTab category={category} />
                    </div>
                </div>
            </main>
        )
    }
}

export default Profile;