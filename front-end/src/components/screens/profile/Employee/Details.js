import React, { Component } from 'react';

class Details extends Component{
    
    constructor(props){
        super(props);
        this.state = {};
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
            </div> : 
            <div> There is no data to show </div>
        )
    }

    render(){
        return(
            <div className="user-details">
                {this.displayContent()}
            </div>
        )
    }
}

export default Details;