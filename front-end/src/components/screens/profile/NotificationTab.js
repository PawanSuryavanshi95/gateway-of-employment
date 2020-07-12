import React,{ Component } from 'react';
import Axios from 'axios';

class NotificationTab extends Component{
    constructor(props){
        super(props);

        this.state = {
            notifications:[],
            selectedID:null,
        }
    }

    componentDidMount(){
        const headers = {
            'X-access-token': localStorage.getItem('userToken')
        }
        Axios.get('/api/user/notifications', { headers : headers }).then(res => {
            this.setState({
                notifications: res.data.notifications
            });
        }).catch(e => {
            console.log(e);
        });
    }

    handleClick = (proposal) => {
        return(
            <div className="proposal">
                {proposal}
                <br/>
                <button>Open Profile</button>
                <button>Reject</button>
            </div>
        )
    }

    render(){
        const notifications = this.state.notifications;
        const content = notifications? notifications.length ? 
            notifications.map(notification => {
                return(
                    <div id={notification.new ? 1 : 2} className="notification"  key={notification._id}
                        onClick={() => { this.setState({ selectedID: notification._id }) }} >
                        {notification.msg}
                        {this.state.selectedID===notification._id && this.props.category==="Employer"? this.handleClick(notification.proposal) : null}
                    </div>
                )
            }) :
            <div className="no-content" >
                There are no notifications to show
            </div> :
            <div className="no-content" >
                There are no notifications to show
            </div>
        return(
            <div className="notification-tab">
                <div className="menu-bar">
                    <h2>Notifications</h2>
                </div>
                <div className="notification-msg">
                    {content}
                </div>
            </div>
        )
    }
}

export default NotificationTab;