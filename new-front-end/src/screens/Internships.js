import React, { Component } from 'react';

import InternshipCard from '../components/Internship';
import offerAPI from '../api/Offer';

class Internships extends Component{
    constructor(props){
        super(props);

        this.state ={
            internships:[],
            retrieved:false,
        }
    }

    async componentDidMount(){
        if(this.state.retrieved===false){
            const data = await offerAPI.getInternships();
            this.setState({internships : data.internships, retrieved:true});
        }
    }

    render(){

        var {internships} = this.state;
        console.log(this.state);
        if(internships) internships = internships.map(internship=>{
            return <InternshipCard data={internship} />
        });

        return (
            <div>
                {internships}
            </div>
        )
    }
}

export default Internships;