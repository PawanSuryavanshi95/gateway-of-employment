import React, { Component } from 'react';
import Modal from 'react-modal';
import EditIn from './EditIn';
import api from '../../../../api/index';

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
        api.get('/offer/internship-list', { params: { employer: this.props.employer ? this.props.employer : null } }).then(res =>{
            this.setState({
                internships:res.data.internships,
            });
        });
    }

    remove = (_id) => {
        const headers = {
            'X-access-token': localStorage.getItem("userToken"),
        }
        api.post("/offer/remove-in", {headers:headers, _id:_id }).then(res => {
            if(res.body.success){
                console.log("Removed");
                var updatedIns = this.state.internships.map(internship => { return internship._id!==_id });
                this.setState({ internships: updatedIns });
            }
            else{
                console.log(res.body.message);
            }
        }).catch(e => {
            console.log(e.message);
        })
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