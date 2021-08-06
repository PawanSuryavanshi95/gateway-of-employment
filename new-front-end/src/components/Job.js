import React, {Component} from 'react';
import {Card, Button, CardText, CardTitle} from 'reactstrap';

import offerAPI from '../api/Offer';

class Job extends Component{
    constructor(props){
        super(props);

        this.state ={
            
        }
    }

    render(){
        const data = this.props.data;

        return (
            <div id="job-card">
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle tag="h5">{data.title} <CardText>By {data.employerName}</CardText> </CardTitle>
                <CardText>{data.desc}</CardText>
                <CardText>Salary : {data.salary}</CardText>
                <Button>Apply</Button>
            </Card>
            <br/>
            </div>
        )
    }
}

export default Job;