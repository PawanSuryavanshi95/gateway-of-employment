import React, { Component } from 'react';
import Modal from 'react-modal';
import EditIn from './EditIn';
import { getIn, removeIn } from '../../../../api/Offer';

class Internships extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            inTitle:"",
            internships:"",
        }
    }

    componentDidMount(){
        this.fetchIn();
    }

    fetchIn = async () => {
        const result = await getIn(this.props.employer);
        this.setState({ internships:result.internships, });
    }

    remove = (_id) => {
        const result = removeIn(_id);
        if(result.success){
            var updatedIns = this.state.internships.map(internship => { return internship._id!==_id });
            this.setState({ internships: updatedIns });
        }
        else{
            console.log(result.message);
        }
    }

    render(){
        var key = 0;
        var internships = this.state.internships;
        var bool = internships!=null ? internships.length>0 ? true : false : false ;
        internships = bool ? internships.map(internship => {
            ++key;
            return(
                <div key={key}>
                    <div className="title">{internship.title}
                    <input type="button" value="Edit" onClick={()=>{ this.setState({ modal:true,inTitle:internship.title }) }} />
                    <input type="button" value="Remove" onClick={()=>{this.remove(internship._id)}} /></div>
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