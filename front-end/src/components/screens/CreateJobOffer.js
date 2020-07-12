import React,{Component} from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

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
        }
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const info = {
            title: this.state.title,
            desc: this.state.desc,
            reqs: this.state.req,
            reason: this.state.reason,
            fullTime: this.state.fullTime,
            fromHome: this.state.fromHome,
        }
        const headers = {
            'X-access-token': localStorage.getItem("userToken"),
        }
        console.log(info,headers);
        return Axios.post('/api/user/createjob', { info:info, headers:headers }).then(res => {
            console.log(res.body);
        }).catch(e => {
            console.log('Could not send CreateJobOffer data');
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
    }

    render(){
        return(
            <main className="main">
            <div className="content">
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        <input
                            id="title"
                            type="text" 
                            placeholder="Title"
                            onChange={(e) => { this.changeHandler("title",e) }} >
                            </input><br/>

                        <textarea id="desc"
                                placeholder="Description"
                                rows="6"
                                cols="500"
                                onChange={(e) => { this.changeHandler("desc",e) }} />
                                <br/>

                        <textarea id="req"
                                placeholder="Requirements"
                                rows="4"
                                cols="50"
                                onChange={(e) => { this.changeHandler("req",e) }} />
                                <br/>

                        <textarea id="reason"
                                placeholder="What will the employee gain?"
                                rows="3"
                                cols="50"
                                onChange={(e) => { this.changeHandler("reason",e) }} />
                                <br/>

                        <input 
                            id="part-time"
                            type="radio" 
                            checked={this.state.fullTime===false}
                            onChange={(e) => { this.radioHandler("r1",e) }} />
                            <label htmlFor="part-time">Part Time</label><br/>

                        <input 
                            id="full-time"
                            type="radio" 
                            checked={this.state.fullTime===true}
                            onChange={(e) => { this.radioHandler("r2",e) }} />
                            <label htmlFor="full-time">Full Time</label><br/>

                        <input 
                            id="home"
                            type="radio" 
                            checked={this.state.fromHome===true}
                            onChange={(e) => { this.radioHandler("r3",e) }} />
                            <label htmlFor="home">Work from Home</label><br/>

                        <input 
                            id="office"
                            type="radio" 
                            checked={this.state.fromHome===false}
                            onChange={(e) => { this.radioHandler("r4",e) }} />
                            <label htmlFor="office">Office</label><br/>

                        <input type="submit" value="Create Job Offer"></input>
                    </form>
                </div>
            </div>
            </main>
        )
    }
}

export default CreateJobOffer;