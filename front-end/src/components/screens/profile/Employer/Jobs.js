import React, { Component } from 'react';
import Modal from 'react-modal';
import EditJob from './EditJob';
import api from '../../../../api/index';

class Jobs extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            jobTitle:"",
            jobs:null,
        }
    }

    componentDidMount(){
        api.get('/offer/job-list', { params: { employer: this.props.employer ? this.props.employer : null } }).then(res =>{
            this.setState({
                jobs:res.data.jobs,
            })
        });
    }

    remove = (_id) => {
        const headers = {
            'X-access-token': localStorage.getItem("userToken"),
        }
        api.post("/offer/remove-job", {headers:headers, _id:_id }).then(res => {
            if(res.body.success){
                console.log("Removed");
                var updatedJobs = this.state.jobs.map(job => { return job._id!==_id });
                this.setState({ jobs: updatedJobs });
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
        var jobs = this.state.jobs;
        var bool = jobs!=null ? jobs.length>0 ? true : false : false ;
        jobs = bool ? jobs.map(job => {
            ++key;
            return(
                <div className={key%2===1?"wbg":""} key={key}>
                    <div className="title">{job.title};
                    <input type="button" value="Edit" onClick={()=>{ this.setState({ modal:true,jobTitle:job.title }) }} />
                    <input type="button" value="Remove" onClick={()=>{this.remove(job._id)}} /></div>
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