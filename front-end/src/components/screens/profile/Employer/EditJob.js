import React, { Component } from 'react';
import api from '../../../../api/index';
import MessageBox from '../../../MessageBox';

class EditJob extends Component{
    constructor(props){
        super(props);

        this.state = {
            title:'',
            desc:'',
            req:'',
            reason:'',
            fullTime:'',
            fromHome:'',
            permanent:'',
            otherDetails:'',
            salary:'',
            duration:'',
            address:'',
            msgBox:false,
        }

        this.messages = [];
        this.msgType = "neutral";
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const job = this.props.job;
        var info = {
            title: this.state.title==='' ? job.title : this.state.title,
            desc: this.state.desc==='' ? job.desc : this.state.desc,
            reqs: this.state.req==='' ? job.req : this.state.req,
            reason: this.state.reason==='' ? job.reason : this.state.reason,
            fullTime: this.state.fullTime==='' ? job.fullTime : this.state.fullTime,
            fromHome: this.state.fromHome==='' ? job.fromHome : this.state.fromHome,
            permanent: this.state.permanent==='' ? job.permanent : this.state.permanent,
            salary: this.state.salary==='' ? job.salary : this.state.salary,
        }
        if(this.state.otherDetails!==''){
            info.otherDetails = this.setState.otherDetails==='' ? job.otherDetails : this.setState.otherDetails;
        }
        if(info.permanent===false){
            info.duration = this.state.duration==='' ? job.duration : this.setState.duratiion;
        }
        if(info.fromHome===false){
            info.address = this.state.address==='' ? job.address : this.state.address;
        }
        const headers = {
            'X-access-token': localStorage.getItem("userToken"),
        }
        return api.post('/offer/edit-job', { info:info, headers:headers }, {timeout:5000}).then(res => {
            if(res.data.success){
                this.messages=["Job has been edited"];
                this.msgType = "positive";
                this.setState({msgBox:true});
            }
        }).catch(e => {
            this.messages=["Job could not be edited",e.message];
            this.msgType = "negative";
            this.setState({msgBox:true});
        })
    }

    changeHandler = (type,e) =>{
        this.setState({
            [type]: e.target.value
        });
    }

    radioHandler = (type,e) => {
        if(type==="r1"){
            this.setState({ fullTime: false });
        }
        else if(type==="r2"){
            this.setState({ fullTime: true });
        }
        else if(type==="r3"){
            this.setState({ fromHome: true });
        }
        else if(type==="r4"){
            this.setState({ fromHome: false });
        }
        else if(type==="r5"){
            this.setState({ permanent: true });
        }
        else if(type==="r6"){
            this.setState({ permanent: false });
        }
    }
//<input id="title" type="text" placeholder="Title" onChange={(e) => { this.changeHandler("title",e) }} /> <br/>
    render(){
        const job = this.props.job;
        return(
            <div className="edit-job">
            <h2>{job.title}</h2>
            <div className="form">
                <form onSubmit={this.submitHandler}>
                        <textarea id="desc" placeholder="Description" rows="6" cols="500"
                            onChange={(e) => { this.changeHandler("desc",e) }} value={job.desc} /> <br/>
                        
                        <textarea id="req" placeholder="Requirements" rows="4" cols="50"
                            onChange={(e) => { this.changeHandler("req",e) }} value={job.req} /><br/>

                        <input id="salary" type="number" placeholder="Salary in Rs per month" onChange={(e) => { this.changeHandler("salary",e) }} value={job.salary} /> <br/>

                        <textarea id="reason" placeholder="What will the employee gain?" rows="3" cols="50" value={job.reason}
                            onChange={(e) => { this.changeHandler("reason",e) }} /> <br/>
                        
                        <label>This is a permanent job ?</label>
                        <input id="r5" type="radio" checked={this.state.permanent===true}
                            onChange={(e) => { this.radioHandler("r5",e) }} />
                            <label htmlFor="r5">Yes</label><br/>

                        <input id="r6" type="radio" checked={this.state.permanent===false}
                            onChange={(e) => { this.radioHandler("r6",e) }} />
                            <label htmlFor="r6">No</label><br/>
                        
                        { this.state.permanent===false ? 
                        <input id="duration" type="text" placeholder="Duration" value={job.value} onChange={(e) => { this.changeHandler("duration",e) }} />
                        : <div></div> }

                        <input id="part-time" type="radio" checked={this.state.fullTime===false}
                            onChange={(e) => { this.radioHandler("r1",e) }} />
                            <label htmlFor="part-time">Part Time</label><br/>

                        <input id="full-time" type="radio" checked={this.state.fullTime===true}
                            onChange={(e) => { this.radioHandler("r2",e) }} />
                            <label htmlFor="full-time">Full Time</label><br/>

                        <label>Employee can work from home ?</label>
                        <input id="home" type="radio" checked={this.state.fromHome===true}
                            onChange={(e) => { this.radioHandler("r3",e) }} />
                            <label htmlFor="home">Yes</label><br/>

                        <input id="office" type="radio" checked={this.state.fromHome===false}
                            onChange={(e) => { this.radioHandler("r4",e) }} />
                            <label htmlFor="office">No</label><br/>
                        
                        { this.state.fromHome===false ? 
                        <input id="address" type="text" placeholder="Address of workplace" value={job.address} onChange={(e) => { this.changeHandler("address",e) }} />
                        : <div></div> }
                        
                        <textarea id="otherDetails" placeholder="Any other details (opional)" rows="3" cols="50" value={job.otherDetails}
                            onChange={(e) => { this.changeHandler("otherDetails",e) }} /> <br/>

                        { this.state.msgBox ? <MessageBox messages={this.messages} type={this.msgType} /> : <div></div> }

                        <input type="submit" value="Edit Job"></input>
                    </form>
            </div></div>
        )
    }
}

export default EditJob;