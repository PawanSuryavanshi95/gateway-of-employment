import React, { Component } from 'react';

class Panel extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:"User",
            sel_ID:"",
        }
    }

    userEntries = () => {
        var data = this.props.data, users;
        if(data){
            users = data.userList ? 
                data.userList.map(user => {
                    return(
                        <div id={user._id===this.state.sel_ID?1:0} className="entry" key={user._id} onClick={()=>{ this.setState({ sel_ID: user._id }) }}>
                            <span className="entry-name"> {user.userName} </span>
                            <button onClick={()=>{ this.props.remove(user._id,"User") }}>Remove</button><br/>
                            {user._id===this.state.sel_ID?
                            <div className="entry-info">
                                <div className="field"><div className="field-name">ID</div> : <span className="field-value">{user._id}</span></div><br/>
                                <div className="field"><div className="field-name">Email</div> : <span className="field-value">{user.email}</span></div><br/>
                                <div className="field"><div className="field-name">Password</div> : <span className="field-value">{user.password}</span></div><br/>
                                <div className="field"><div className="field-name">Category</div> : <span className="field-value">{user.category}</span></div><br/>
                            </div>:
                            <div></div>}
                        </div>
                    )
                }) :
                <div className="no-data">There are no users to show</div>
        }
        else{
            users = <div className="no-data"> Loading Data </div>;
        }
        return users;
    }

    jobEntries = () => {
        var data = this.props.data,jobs;
        if(data){
            jobs = data.jobList ? 
                data.jobList.map(job => {
                    return(
                        <div key={job._id} className="entry" id={job._id===this.state.sel_ID?1:0}  onClick={()=>{ this.setState({ sel_ID: job._id }) }}>
                            <span className="entry-name"> {job.title} </span>
                            <button onClick={()=>{ this.props.remove(job._id,"Job") }}>Remove</button><br/>
                            {job._id===this.state.sel_ID?
                            <div className="entry-info">
                                <div className="field"><div className="field-name">Title</div> : <span className="field-value">{job.title}</span></div><br/>
                                <div className="field"><div className="field-name">Recruiter</div> : <span className="field-value">{job.employer}</span></div><br/>
                                <div className="field"><div className="field-name">Description</div> : <span className="field-value">{job.desc}</span></div><br/>
                            </div>:
                            <div></div>}
                        </div>
                    )
                }) :
                <div className="no-content">There are no jobs to show</div>
        }
        else{
            jobs = <div className="no-content"> Loading Data </div>;
        }
        return jobs;
    }

    render(){
        return(
            <div className="admin-panel">
                <h1>Admin Panel</h1>
                <div className="nav-menu-items">
                    <ul>
                        <li><a className={this.state.show==="User"?1:0} onClick={() => { this.setState({ show:"User" }) }}>Users</a></li>
                        <li><a className={this.state.show==="Job"?1:0} onClick={() => { this.setState({ show:"Job" }) }}>Jobs</a></li>
                    </ul>
                </div>
                <div className="entries">
                    {this.state.show==="User"? this.userEntries(): this.state.show==="Job"? this.jobEntries(): <div></div>}
                </div>
            </div>
        )
    }
}

export default Panel;