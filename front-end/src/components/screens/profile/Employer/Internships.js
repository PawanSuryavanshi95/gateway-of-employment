import React, { Component } from 'react';

class Internships extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        var key = 0;
        var internships = this.props.internships;
        console.log(internships);
        internships = internships!=null && internships.length>0 ? internships.map(internship => {
            ++key;
            return(
                <div key={key}>
                    <div className="title">{internship.title}</div>
                </div>
            )
        }) : <div>Nothing to show</div>;
        return(
            <div className="user-tab">
                {internships}
            </div>
        )
    }
}

export default Internships;