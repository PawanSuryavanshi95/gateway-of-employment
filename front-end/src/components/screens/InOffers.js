import React,{ Component } from 'react';
import Modal from 'react-modal';
import InDetails from './InDetails';
import MessageBox from '../MessageBox';
import { getInList } from '../../api/Offer';

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
        this.fetchIn();
    }

    fetchIn = async () => {
        const result = await getInList();
        this.setState({
            internships:result.internships,
            loading:false,
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
                        <h3><span>from</span>{" "+internship.employerName}</h3>
                        <div className="offer-info">
                            <div><p className="title">Requirement : </p> {internship.reqs}</div>
                            <div><span>Stipend is {internship.stipend.available?"available":"not available"}.</span></div>
                            <div>{internship.stipend.available?<p>Amount : {internship.stipend.amount} Rs.</p>:null}</div>
                            <div><span>{internship.fromHome?"You can work from home.":"You will have to come to the office"}</span></div>
                        </div>
                        <div className="offer-apply">
                            {this.state.msgBox?<MessageBox messages={this.messages} type="negative" />:null}
                            <button className="button" onClick={() => { this.handleApply(internship); }}><span>More Details</span></button>
                        </div>
                    </div>
                )
            })
        ):(
            <div>There are no internships to show.</div>
        )
        return(
            <main className="main">
            <div className="content offers">
                {this.state.loading?loadingList:inList}
                <Modal className="modal offer" isOpen={this.state.modal || bool} onRequestClose={() => { this.setState({ modal:false }); this.props.history.push('/internships'); }}>
                    <InDetails internship={this.internship} />
                </Modal>
            </div>
            </main>
        )
    }
}

export default InOffers;