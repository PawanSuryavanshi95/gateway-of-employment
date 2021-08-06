import React, {Component} from 'react';
import {Card, Button, CardText, CardTitle} from 'reactstrap';

import offerAPI from '../api/Offer';

class Internship extends Component{
    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    render(){

        const data = this.props.data;

        return (
            <div id="internship-card">
            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle tag="h5">{data.title} <CardText>By {data.employerName}</CardText> </CardTitle>
                <CardText>{data.desc}</CardText>
                <CardText>Stipend : {data.stipend.available?data.stipend.amount:'none'}</CardText>
                <Button>Apply</Button>
            </Card>
            <br/>
            </div>
        )
    }
}

export default Internship;