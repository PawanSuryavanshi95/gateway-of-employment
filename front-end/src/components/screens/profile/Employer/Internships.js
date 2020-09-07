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
        var bool = internships!=null ? internships.length>0 ? true : false : false ;
        internships = bool ? internships.map(internship => {
            ++key;
            return(
                <div key={key}>
                    <div className="title">{internship.title}</div>
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