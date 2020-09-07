import React,{ Component } from 'react';
import api from '../../api/index';
import Modal from 'react-modal';
import InDetails from './InDetails';
import MessageBox from '../MessageBox';

Modal.setAppElement("#root");

class InOffers extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            internships:"",
            modal:false,
            loading:true,
        }
        this.internship = {};
        this.messages = [];
        this.msgType = "neutral";
    }

    componentDidMount(){
        api.get('/offer/internship-list').then(res=>{
            this.setState({
                internships:res.data.internships,
                loading:false,
            });
        }).catch(e=>{
            this.setMsgBox([e.message], "negative");
        });
    }

    setMsgBox = (msg,type) => {
        this.setState({ msgBox: true});
        this.messages = [msg];
        this.msgType = type;
    }

    handleApply = (internship) => {
        if(localStorage.getItem("userToken")!==null){
            this.props.history.push(`/internships/${internship.title}`);
            this.setState({ modal:true });
            this.internship = internship;
        }
        else{
            this.setMsgBox(["You need to login with an employee's account to apply."], "negative");
        }
    }

    render(){
        var bool = false;
        const path = this.props.history.location.pathname;
        if(path.length>13){
            if(path.substr(0,13)==="/internships/"){
                bool=true;
            }
        }
        const loadingBlock = <div className="offer loading"><div className="item 1"></div></div>;
        const loadingList = [loadingBlock, loadingBlock, loadingBlock,];
        const internships = this.state.internships;
        const inList = internships.length ? (
            internships.map(internship => {
                return (
                    <div key={internship._id} className="offer" onClick={()=>{this.handleApply(internship)}}>
                        <h2>{internship.title}</h2>
                        <h3><span>from</span> Employer</h3>
                        <div className="offer-info">
                            <p>Requirement : {internship.reqs}</p>
                            <span>Stipend is {internship.stipend.available?"available":"not available"}.</span><br/>
                            {internship.stipend.available?<p>Amount : {internship.stipend.amount} Rs.</p>:null}
                            <span>{internship.fromHome?"You can work from home.":"You will have to come to the office"}</span><br/>
                        </div>
                        <div className="offer-apply">
                            {this.state.msgBox?<MessageBox messages={this.messages} type="negative" />:null}
                            <button className="button" onClick={() => { this.handleApply(internship); }}><span>Apply</span></button>
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
            <div className="offers">
                {this.state.loading?loadingList:inList}
                <Modal isOpen={this.state.modal || bool} onRequestClose={() => { this.setState({ modal:false }); this.props.history.push('/jobs'); }}>
                    <InDetails internship={this.internship} />
                </Modal>
            </div>
            </div>
            </main>
        )
    }
}

export default InOffers;