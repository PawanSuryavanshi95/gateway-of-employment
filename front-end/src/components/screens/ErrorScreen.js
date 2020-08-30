import React, { Component } from 'react';

class ErrorScreen extends Component{
    constructor(props){
        super(props);
        this.state ={};
    }

    render(){
        return(
            <main>{this.props.match.params.error_code}</main>
        )
    }
}

export default ErrorScreen;