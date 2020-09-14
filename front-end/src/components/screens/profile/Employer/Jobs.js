import React, { Component } from 'react';
import Modal from 'react-modal';
import EditJob from './EditJob';

class Jobs extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            jobTitle:"",
        }
    }

    render(){
        var key = 0;
        var jobs = this.props.jobs;
        var bool = jobs!=null ? jobs.length>0 ? true : false : false ;
        jobs = bool ? jobs.map(job => {
            ++key;
            return(
                <div className={key%2===1?"wbg":""} key={key}>
                    <div className="title">{job.title};
                    <input type="button" value="Edit" onClick={()=>{ this.setState({ modal:true,jobTitle:job.title }) }} /></div>
                    <Modal className="modal" isOpen={this.state.modal && this.state.jobTitle===job.title} onRequestClose={() => {this.setState({ modal:false,jobTitle:"" }) }}>
                        {this.state.modal? <EditJob job = {job} /> : "Wrong Modal"}
                    </Modal>
                </div>
            )
        }) : <div className="no-content">Nothing to show</div>;
        return(
            <div className="user-tab offers">
                {jobs}
            </div>
        )
    }
}

export default Jobs;