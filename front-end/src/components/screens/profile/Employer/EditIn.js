import React, { Component } from 'react';
import api from '../../../../api/index';
import MessageBox from '../../../MessageBox';

class EditIn extends Component{
    constructor(props){
        super(props);

        this.state = {
            title:'',
            desc:'',
            req:'',
            reason:'',
            fromHome:'',
            address:'',
            stipend:'',
            amount:'',
            duration:'',
            otherDetails:'',
            msgBox:false,
        }

        this.messages = [];
        this.msgType = "neutral";
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const internship = this.props.internship;
        var info = {
            title: this.state.title==='' ? this.state.title : internship.title,
            desc: this.state.desc==='' ? this.state.desc : internship.desc,
            reqs: this.state.req==='' ? this.state.req : internship.reqs,
            reason: this.state.reason==='' ? this.state.reason : internship.reason,
            fromHome: this.state.fromHome==='' ? this.state.fromHome : internship.fromHome,
            stipend:{
                available: this.state.stipend==='' ? this.state.stipend : internship.stipend.available,
            },
            duration: this.state.duration==='' ? this.state.duration : internship.duration,
        }
        if(this.state.otherDetails!==''){
            info.otherDetails = this.state.otherDetails==='' ? this.state.otherDetails : internship.otherDetails;
        }
        if(info.fromHome===false){
            info.address = this.state.address==='' ? this.state.address : internship.address;
        }
        if(info.stipend.available===true){
            info.stipend.amount = this.state.amount==='' ? this.state.amount : internship.stipend.amount;
        }
        const headers = {
            'X-access-token': localStorage.getItem("userToken"),
        }
        return api.post('/offer/edit-internship', { info:info, headers:headers }, {timeout:5000}).then(res => {
            if(res.data.success){
                this.messages=["Internship has been edited"];
                this.msgType = "positive";
                this.setState({msgBox:true});
            }
        }).catch(e => {
            this.messages=["Internship could not be edited",e.message];
            this.msgType = "negative";
            this.setState({msgBox:true});
        })
    }

    changeHandler = (type,e) =>{
        console.log("djfj")
        this.setState({
            [type]: e.target.value
        });
    }

    radioHandler = (type,e) => {
        if(type==="r1"){
            this.setState({ stipend: true });
        }
        else if(type==="r2"){
            this.setState({ stipend: false });
        }
        else if(type==="r3"){
            this.setState({ fromHome: true });
        }
        else if(type==="r4"){
            this.setState({ fromHome: false });
        }
    }

    render(){
        const internship = this.props.internship;
        return(
            <div className="edit-in">
                <h2>{internship.title}</h2>
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        <textarea id="desc"  placeholder="Description" rows="6" cols="500" value={internship.desc}
                                onChange={(e) => { this.changeHandler("desc",e) }} />
                        <br/>

                        <input id="duration" type="text" value={internship.duration} placeholder="Duration" onChange={(e) => { this.changeHandler("duration",e) }} /><br/>

                        <textarea id="req" placeholder="Requirements" rows="4" cols="50" value={internship.reqs}
                                onChange={(e) => { this.changeHandler("req",e) }} />
                        <br/>

                        <textarea id="reason" placeholder="What will the employee gain?" rows="3" cols="50" value={internship.reason}
                                onChange={(e) => { this.changeHandler("reason",e) }} />
                        <br/>

                        <label> Stipend is Available ? </label>
                        <input id="stipend-yes" type="radio" checked={this.state.stipend===true}
                            onChange={(e) => { this.radioHandler("r1",e) }} />
                            <label htmlFor="stipend-yes">Yes</label><br/>

                        <input id="stipend-no" type="radio"  checked={this.state.stipend===false}
                            onChange={(e) => { this.radioHandler("r2",e) }} />
                            <label htmlFor="stipend-no">No</label><br/>
                        
                        { this.state.stipend===true ? 
                        <input id="amount" type="text" placeholder="Amount" value={internship.stipend.amount} onChange={(e) => { this.changeHandler("amount",e) }} />
                        : <div></div> }
                        
                        <label> Intern can work from home? ? </label>
                        <input id="home-yes" type="radio" checked={this.state.fromHome===true}
                            onChange={(e) => { this.radioHandler("r3",e) }} />
                            <label htmlFor="home-yes">Yes</label><br/>

                        <input id="home-no" type="radio" checked={this.state.fromHome===false}
                            onChange={(e) => { this.radioHandler("r4",e) }} />
                            <label htmlFor="home-no">No</label><br/>
                        
                        { this.state.fromHome===false? 
                        <textarea id="address" placeholder="Address of workplace" rows="3" cols="50" value={internship.address}
                            onChange={(e) => { this.changeHandler("address",e) }} /> : <div></div> }

                        <textarea id="otherDetails" placeholder="Other Details (optional)" rows="6" cols="500" value={internship.otherDetails}
                            onChange={(e) => { this.changeHandler("otherDetails",e) }} /> <br/>
                        
                        {this.state.msgBox===true?<MessageBox messages={this.messages} type={this.msgType} />:<div></div>}

                        <input type="submit" value="Create Internship Offer"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditIn;