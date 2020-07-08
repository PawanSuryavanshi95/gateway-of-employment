import React,{ Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NotificationTab from './NotificationTab';
import UserDetails from "./UserDetails";

class Profile extends Component{

    constructor(props){
        super(props);

        this.state = {
            userData : undefined,
        };
    }

    componentDidMount(){
        const userToken = localStorage.getItem('userToken');
        const headers = {
            'X-access-token': userToken
        }
        axios.get('/api/user/profile', { headers: headers }).then(res => {
            if(!res.error){
                console.log(res.data);
                this.setState({
                    userData: res.data.userData
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
            this.showEmployerContent() : category==='Admin'?
            this.showAdminContent() : <div>No Content</div>
    }

    showEmployeeContent(){
        const info = this.state.userData.userEmployeeInfo;
        console.log(this.state.userData);
        return(
            <div className="employee-content">
                <h1><span>{info.firstName}</span>{" "}{info.lastName}</h1>

                <UserDetails details={info.details}/>
            </div>
        )
    }

    showEmployerContent(){
        const url = `/profile/${this.props.match.params.userName}/create`;
        return(
            <div className="employer-content">
                This is the employer's content
                <Link to={url}><button className="button"><span>Post a job Offer</span></button></Link>
            </div>
        )
    }

    showAdminContent(){
        return(
            <div>
                This is the admin panel.
            </div>
        )
    }

    render(){
        var category = this.state.userData ? this.state.userData.category : undefined;

        return(
            <main className="main">
                <div className="profile-content">
                    {this.displayContent(category)}
                    <NotificationTab category={category} />
                </div>
            </main>
        )
    }
}

export default Profile;