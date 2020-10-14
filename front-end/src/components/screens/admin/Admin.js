import React, { Component } from 'react';
import LogIn from './LogIn';
import Panel from './Panel';
import {adminRemove} from '../../../api/Admin';

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

    remove = async (id,type) => {
        const headers = { 'x-access-token':this.state.token };
        const query = { id:id, type:type, }
        var data = this.state.data;

        const result = await adminRemove(headers, query);
        if(result.success){
            if(type==="User"){
                data.userList = this.removeItem(data.userList,id);
                this.setState({ data:data });
            }
            else if(type==="Job"){
                data.jobList = this.removeItem(data.jobList,id);
                this.setState({ data:data });
            }
        }
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