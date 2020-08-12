import React,{ Component } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import InDetails from './InDetails';

Modal.setAppElement("#root");

class InOffers extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            internships:"",
            modal:false,
        }
        this.internship = {};
    }

    componentDidMount(){
        Axios.get('/api/offer/internship-list').then(res=>{
            this.setState({
                internships:res.data.internships
            })
        }).catch(e=>{
            console.log(e);
        });
    }

    handleApply = (internship) => {
        this.props.history.push(`/internships/${internship.title}`);
        this.setState({ modal:true });
        this.internship = internship;
    }

    render(){
        var bool = false;
        const path = this.props.history.location.pathname;
        if(path.length>13){
            if(path.substr(0,13)==="/internships/"){
                bool=true;
            }
        }
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
                            <button className="button" onClick={() => { this.internship = internship; this.setState({ modal:true }); }}><span>Apply</span></button>
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
                {inList}
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