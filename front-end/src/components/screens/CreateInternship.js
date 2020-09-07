import React,{Component} from 'react';
import api from '../../api/index';
import MessageBox from '../MessageBox';

class CreateInternship extends Component{

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
        var info = {
            title: this.state.title,
            desc: this.state.desc,
            reqs: this.state.req,
            reason: this.state.reason,
            fromHome: this.state.fromHome,
            stipend:{
                available: this.state.stipend,
            },
            duration: this.state.duration,
        }
        if(this.state.otherDetails!==''){
            info.otherDetails = this.state.otherDetails;
        }
        if(info.fromHome===false){
            info.address = this.state.address;
        }
        if(info.stipend.available===true){
            info.stipend.amount = this.state.amount;
        }
        const headers = {
            'X-access-token': localStorage.getItem("userToken"),
        }

        if(this.checkForm(info)){
            return api.post('/offer/create-internship', { info:info, headers:headers }).then(res => {
                if(res.data.success){
                    this.messages=["Internship created successfully"];
                    this.msgType = "positive";
                    this.setState({msgBox:true});
                }
            }).catch(e => {
                this.messages=["Internship could not be created"];
                this.msgType = "negative";
                this.setState({msgBox:true});
            })
        }
        else{
            this.setState({ msgBox:true });
            this.msgType = "negative";
        }
        console.log(info,headers);
    }

    checkForm = (info) => {
        if(info.title==='' || info.reqs==='' || info.desc==='' || info.reason==='' || info.fromHome==='' || info.stipend.available==='' ||
         info.duration==='' ){
            this.messages = ['Enter all the details to continue'];
            return false;
        }
        if(info.stipend.available===true && info.stipend.amount===''){
            this.messages = ['Enter all the details to continue'];
            return false;
        }
        if(info.fromHome===true && info.address===''){
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
        return(
            <main className="main">
            <div className="content">
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        <input id="title" type="text" placeholder="Title" onChange={(e) => { this.changeHandler("title",e) }} /><br/>
                        
                        <textarea id="desc" placeholder="Description" rows="6" cols="500"
                                onChange={(e) => { this.changeHandler("desc",e) }} />
                        <br/>

                        <input id="duration" type="text" placeholder="Duration in days" onChange={(e) => { this.changeHandler("duration",e) }} /><br/>

                        <textarea id="req" placeholder="Requirements" rows="4" cols="50"
                                onChange={(e) => { this.changeHandler("req",e) }} />
                        <br/>

                        <textarea id="reason" placeholder="What will the employee gain?" rows="3" cols="50"
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
                        <input id="amount" type="text" placeholder="Amount" onChange={(e) => { this.changeHandler("amount",e) }} />
                        : <div></div> }
                        
                        <label> Intern can work from home? ? </label>
                        <input id="home-yes" type="radio" checked={this.state.fromHome===true}
                            onChange={(e) => { this.radioHandler("r3",e) }} />
                            <label htmlFor="home-yes">Yes</label><br/>

                        <input id="home-no" type="radio" checked={this.state.fromHome===false}
                            onChange={(e) => { this.radioHandler("r4",e) }} />
                            <label htmlFor="home-no">No</label><br/>
                        
                        { this.state.fromHome===false? 
                        <textarea id="address" placeholder="Address of workplace" rows="3" cols="50"
                            onChange={(e) => { this.changeHandler("address",e) }} /> : <div></div> }

                        <textarea id="otherDetails" placeholder="Other Details (optional)" rows="6" cols="500"
                            onChange={(e) => { this.changeHandler("otherDetails",e) }} /> <br/>
                        
                        {this.state.msgBox===true?<MessageBox messages={this.messages} type={this.msgType} />:<div></div>}

                        <input type="submit" value="Create Internship Offer"></input>
                    </form>
                </div>
            </div>
            </main>
        )
    }
}

export default CreateInternship;