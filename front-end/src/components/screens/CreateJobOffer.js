import React,{Component} from 'react';
import api from '../../api/index';
import MessageBox from '../MessageBox';

class CreateJobOffer extends Component{

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
        var info = {
            title: this.state.title,
            desc: this.state.desc,
            reqs: this.state.req,
            reason: this.state.reason,
            fullTime: this.state.fullTime,
            fromHome: this.state.fromHome,
            permanent: this.state.permanent,
            salary: this.state.salary,
        }
        if(this.state.otherDetails!==''){
            info.otherDetails = this.setState.otherDetails;
        }
        if(info.permanent===false){
            info.duration = this.state.duration;
        }
        if(info.fromHome===false){
            info.address = this.state.address;
        }
        const headers = {
            'X-access-token': localStorage.getItem("userToken"),
        }
        if(this.checkForm(info)){
            console.log(info);
            return api.post('/offer/create-job', { info:info, headers:headers }).then(res => {
                if(res.data.success){
                    this.messages=["Job created successfully"];
                    this.msgType = "positive";
                    this.setState({msgBox:true});
                }
            }).catch(e => {
                this.messages=["Job could not be created"];
                this.msgType = "negative";
                this.setState({msgBox:true});
            })
        }
        else{
            this.setState({ msgBox:true });
            this.msgType="negative";
        }
    }

    checkForm = (info) =>{
        if(info.title==='' || info.reqs==='' || info.desc==='' || info.reason==='' || info.fromHome==='' || info.fullTime==='' ||
         info.salary==='' || info.permanent==='' ){
            this.messages = ['Enter all the details to continue'];
            return false;
        }
        if(info.permanent===false && info.duration===''){
            this.messages = ['Enter all the details to continue'];
            return false;
        }
        if(info.fromHome===false && info.address===''){
            this.messages = ['Enter all the details to continue'];
            return false;
        }
        return true;
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

    render(){
        return(
            <main className="main">
            <div className="content">
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        <input id="title" type="text" placeholder="Title" onChange={(e) => { this.changeHandler("title",e) }} /> <br/>
                        
                        <textarea id="desc" placeholder="Description" rows="6" cols="500"
                            onChange={(e) => { this.changeHandler("desc",e) }} /> <br/>
                        
                        <textarea id="req" placeholder="Requirements" rows="4" cols="50"
                            onChange={(e) => { this.changeHandler("req",e) }} /><br/>

                        <input id="salary" type="number" placeholder="Salary in Rs per month" onChange={(e) => { this.changeHandler("salary",e) }} /> <br/>

                        <textarea id="reason" placeholder="What will the employee gain?" rows="3" cols="50"
                            onChange={(e) => { this.changeHandler("reason",e) }} /> <br/>
                        
                        <label>This is a permanent job ?</label>
                        <input id="r5" type="radio" checked={this.state.permanent===true}
                            onChange={(e) => { this.radioHandler("r5",e) }} />
                            <label htmlFor="r5">Yes</label><br/>

                        <input id="r6" type="radio" checked={this.state.permanent===false}
                            onChange={(e) => { this.radioHandler("r6",e) }} />
                            <label htmlFor="r6">No</label><br/>
                        
                        { this.state.permanent===false ? 
                        <input id="duration" type="text" placeholder="Duration" onChange={(e) => { this.changeHandler("duration",e) }} />
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
                        <input id="address" type="text" placeholder="Address of workplace" onChange={(e) => { this.changeHandler("address",e) }} />
                        : <div></div> }
                        
                        <textarea id="otherDetails" placeholder="Any other details (opional)" rows="3" cols="50"
                            onChange={(e) => { this.changeHandler("otherDetails",e) }} /> <br/>

                        { this.state.msgBox ? <MessageBox messages={this.messages} type={this.msgType} /> : <div></div> }

                        <input type="submit" value="Create Job Offer"></input>
                    </form>
                </div>
            </div>
            </main>
        )
    }
}

export default CreateJobOffer;