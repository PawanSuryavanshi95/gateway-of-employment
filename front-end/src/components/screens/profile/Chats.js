import React, { Component } from 'react';

class Chats extends Component{

    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return(
            <div className="tab">
                <div className="no-content">
                This service is unavailable right now,<br/> we are currently working on it.
                </div>
            </div>
        )
    }
}

export default Chats;