import React,{ Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Profile extends Component{

    constructor(props){
        super(props);

        this.state = {
            userToken : localStorage.getItem('userToken'),
            userData : undefined
        };
    }

    componentDidMount(){
        const userToken = localStorage.getItem('userToken');
        const headers = {
            'X-access-token': userToken
        }
        axios.get('/api/user/profile', { headers: headers }).then(res => {
            if(!res.error){
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

    displayContent(){
        var category = this.state.userData ? this.state.userData.category : undefined;
        
        return category==='Employee'?
            this.showEmployeeContent() : category==='Employer'?
            this.showEmployerContent() : <div>No Content</div>
    }

    showEmployeeContent(){
        console.log(this.state.userData)
        const userData = this.state.userData.userEmployeeInfo;
        return(
            <div className="employee-content">
                <h1>{userData.firstName}{" "}{userData.lastName}</h1>
                <p>Gender : {userData.gender}</p>
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

    render(){
        return(
            <main className="main">
            <div className="content">
                {this.displayContent()}
            </div>
            </main>
        )
    }
}

export default Profile;