import React,{ Component } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import MessageBox from '../MessageBox';

Modal.setAppElement("#root");

class InOffers extends Component{
    
    constructor(props){
        super(props);
   
        this.state = {
            internships:"",
            proposal:undefined,
            modal:false,
            modalMsgBox:false,
        }

        this.internship = {};
        this.messages = [];
    }

    componentDidMount(){
        Axios.get('api/offer/internship-list').then(res=>{
            this.setState({
                internships:res.data.internships
            })
        }).catch(e=>{
            console.log(e);
        });
    }

    handleApply = () => {
        const employer = this.internship.employer, title = this.internship.title;
        const userToken = localStorage.getItem("userToken");
        const headers = {
            'X-access-token' : userToken
        }
        var proposal = this.state.proposal;
        if(proposal){
            console.log(proposal)
            Axios.post('api/offer/apply-internship', {headers : headers, employer: employer, inTitle: title, proposal: proposal}).then(res => {
                if(res.error){
                    return <div>
                        Error occurered {res.error}
                    </div>
                }
            });
        }
        else{
            this.setState({
                modalMsgBox:true
            });
            this.messages = [];
            this.messages.push("Proposal cannot be empty");
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    render(){
        const internships = this.state.internships;
        const inList = internships.length ? (
            internships.map(internship => {
                return (
                    <div key={internship._id} className="internship">
                        <h3>{internship.title}</h3><br/>
                        <div className="internship-info">
                            <p>Description : {internship.desc}</p>
                            <p>Requirement : {internship.reqs}</p>
                            <p>Reason(s) to join : {internship.reason}</p>
                            <span>This is a {internship.fullTime?"Full Time":"Part Time"} internship.</span><br/>
                            <span>{internship.fromHome?"You can work from home.":"You will have to come to the office"}</span><br/>
                            <button className="button" onClick={() => { this.messages=[]; this.internship = internship; this.setState({ modal:true }); }}><span>Apply</span></button>
                        </div>
                    </div>
                )
            })
        ):(
            <div>There are no internships to show.</div>
        )
        return(
            <main className="main">
            <div className="content">
                {inList}
                <Modal isOpen={this.state.modal} onRequestClose={() => { this.setState({ modal:false }) }}>
                    <textarea id="proposal" rows="3" cols="30"
                        placeholder="Enter a short proposal of maximum 150 words." 
                        onChange={(e) => { this.handleChange(e) }} />
                    {this.state.modalMsgBox ? <MessageBox messages={this.messages} type="negative" /> : <div></div>}
                    <button className="button" onClick={() => { this.handleApply() }}><span>Apply</span></button>
                </Modal>
            </div>
            </main>
        )
    }
}

export default InOffers;