import React, { Component } from 'react';
import LogIn from './LogIn';
import Panel from './Panel';
import Axios from 'axios';

class Admin extends Component{

    constructor(props){
        super(props);

        this.state={
            verified:false,
            data:undefined,
            token:undefined,
        }
    }

    onLogIn = (value,token) => {
        this.setState({
            verified:value,
            token:token,
        });
    }

    getData = (data) => {
        this.setState({
            data:data
        });
    }

    removeItem = (list,id) => {
        list = list.filter(item => {
            return item._id !==id
        })
        return list;
    }

    remove = (id,type) => {
        const headers = {
            'x-access-token':this.state.token,
        };
        const query = {
            id:id,
            type:type,
        }
        var data = this.state.data;
        Axios.post('https://goe-server.herokuapp.com/api/admin/remove', { headers:headers, query:query }).then(res => {
            if(res.data.success){
                if(type==="User"){
                    data.userList = this.removeItem(data.userList,id);
                    this.setState({ data:data });
                }
                else if(type==="Job"){
                    data.jobList = this.removeItem(data.jobList,id);
                    this.setState({ data:data });
                }
            }
        });
    }

    render(){
        console.log(this.state);
        return(
            <div className="admin">
                { this.state.verified ?
                    <Panel data={this.state.data} remove={this.remove} /> : 
                    <LogIn onLogIn={this.onLogIn} getData={this.getData} /> }
            </div>
        )
    }
}

export default Admin;