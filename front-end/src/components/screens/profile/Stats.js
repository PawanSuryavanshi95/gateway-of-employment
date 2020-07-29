import React, { Component } from 'react';

class Stats extends Component{

    constructor(props){
        super(props);
        this.state = {}
    }

    employer = (data) => {
        return(
            <div className="stats">
                <div className="item">
                    <h3>No. of Jobs :</h3>
                    <span>{data.jobs}</span>
                </div>
                <div className="item">
                    <h3>No. of Internships :</h3>
                    <span>{data.internships}</span>
                </div>
            </div>
        )
    }
    
    employee = (data) =>{
        return(
            <div className="stats">
                <div className="item">
                    <h3>No. of Applications :</h3>
                    <span>{data.applied}</span>
                </div>
                <div className="item">
                    <h3>No. of times selected :</h3>
                    <span>{data.selected}</span>
                </div>
            </div>
        )
    }

    render(){
        const {data,type} = this.props;
        if(type==="Employer"){
            return this.employer(data);
        }
        else if(type==="Employee"){
            return this.employee(data);
        }
        else{
            return <div>
                Nothing to show.
            </div>
        }
    }
}

export default Stats;