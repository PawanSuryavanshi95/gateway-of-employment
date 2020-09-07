import React, { Component } from 'react';
import EditDetails from './EditDetails';
import Modal from 'react-modal';

class Details extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            modal:"",
        };
    }

    setModal = (value) => {
        this.setState({
            modal: value,
        });
    }
    
    displayContent(){
        var {details,pub} = this.props;
        return ( details ? <div className="details">
                <div className="field"><div className="field-name">Father's Name</div> : <span className="field-value">{details.fatherName}</span></div><br/>
                <div className="field"><div className="field-name">Mother's Name</div> : <span className="field-value">{details.motherName}</span></div><br/>
                {!pub?<div><div className="field"><div className="field-name">Date of Birth</div> : <span className="field-value">{details.dob}</span></div><br/>
                <div className="field"><div className="field-name">Aadhaar Number</div> : <span className="field-value">{details.aadhaar}</span></div><br/>
                <div className="field"><div className="field-name">Mobile Number</div> : <span className="field-value">{details.mobNum}</span></div><br/></div>:<div></div>}
                <div className="field"><div className="field-name">Experience</div> : <span className="field-value">{details.exp}</span></div><br/>
                <div className="field">{details.skilled?"I am a skilled worker":"I am a non skilled worker"}</div><br/>
                <div className="field">{details.permanent?"Looking for a permanent job.":"Looking for a temporary job."}</div><br/>
            </div> : !pub ? <div className="complete-profile">
                <p>Your profile provides your information to the recruiter which builds their trust and confidence in you. Having a great profile will definitely help your proposal get accepted.</p>
                <button className="button" onClick={()=>{ this.setState({ modal:"CP" }) }}><span>Complete your Profile</span></button>
            </div> : <div> There is no data to show </div> )
    }

    render(){
        return(
            <div className="user-tab details">
                {this.displayContent()}
                <Modal className="modal settings" isOpen={this.state.modal==="CP"} onRequestClose={() => {this.setState({ modal:"" }) }}>
                    <EditDetails title="Complete Your Profile" setModal={this.setModal} />
                </Modal>
            </div>
        )
    }
}

export default Details;