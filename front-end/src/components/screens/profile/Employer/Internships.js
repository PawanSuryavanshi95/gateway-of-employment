import React, { Component } from 'react';
import Modal from 'react-modal';
import EditIn from './EditIn';

class Internships extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            inTitle:"",
        }
    }

    render(){
        var key = 0;
        var internships = this.props.internships;
        console.log(internships);
        var bool = internships!=null ? internships.length>0 ? true : false : false ;
        internships = bool ? internships.map(internship => {
            ++key;
            return(
                <div key={key}>
                    <div className="title">{internship.title}
                    <input type="button" value="Edit" onClick={()=>{ this.setState({ modal:true,inTitle:internship.title }) }} /></div>
                    <Modal className="modal" isOpen={this.state.modal && this.state.inTitle===internship.title} onRequestClose={() => {this.setState({ modal:false,inTitle:"" }) }}>
                        {this.state.modal? <EditIn internship = {internship} /> : "Wrong Modal"}
                    </Modal>
                </div>
            )
        }) : <div className="no-content">Nothing to show</div>;
        return(
            <div className="user-tab offers">
                {internships}
            </div>
        )
    }
}

export default Internships;