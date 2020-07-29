import React, { Component } from 'react';
import EditDetails from './EditDetails';
import Modal from 'react-modal';

class Details extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            setModal:false,
        }
        this.editTitle = "";
    }
    
    displayContent(){
        var {details} = this.props;
        var pub = this.props.public;
        return(
        details ?
            <div className="details">
                <div className="field"><div className="field-name">Father's Name</div> : <span className="field-value">{details.fatherName}</span></div><br/>
                <div className="field"><div className="field-name">Mother's Name</div> : <span className="field-value">{details.motherName}</span></div><br/>
                {!pub?<div><div className="field"><div className="field-name">Date of Birth</div> : <span className="field-value">{details.dob}</span></div><br/>
                <div className="field"><div className="field-name">Aadhaar Number</div> : <span className="field-value">{details.aadhaar}</span></div><br/>
                <div className="field"><div className="field-name">Mobile Number</div> : <span className="field-value">{details.mobNum}</span></div><br/></div>:<div></div>}
                <div className="field"><div className="field-name">Experience</div> : <span className="field-value">{details.exp}</span></div><br/>
                <div className="field">{details.skilled?"I am a skilled worker":"I am a non skilled worker"}</div><br/>
                <div className="field">{details.permanent?"Looking for a permanent job.":"Looking for a temporary job."}</div><br/>
                {!pub?<button className="button" onClick={() => { this.setModal(true); this.editTitle = "Edit Profile"; }}>
                    <span>Edit Profile</span>
                </button>:<div></div>}
            </div> : !pub ?
            <div className="complete-profile">
                <button className="button" onClick={() => { this.setModal(true); this.editTitle = "Complete your profile"; }}>
                    <span>Complete Your Profile</span>
                </button>
            </div> : 
            <div> There is no data to show </div>
        )
    }

    setModal = (value) => {
        this.setState({
            setModal:value
        })
    }

    render(){
        return(
            <div className="user-details">
                {this.displayContent()}
                <Modal isOpen={this.state.setModal} onRequestClose={() => { this.setState({ setModal:false }) }}>
                    <EditDetails title={this.editTitle} setModal={this.setModal} />
                </Modal>
            </div>
        )
    }
}

export default Details;