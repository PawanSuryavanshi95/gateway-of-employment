import React, { Component } from 'react';

class Stats extends Component{

    constructor(props){
        super(props);
        this.state = {}
    }
    
    render(){
        const {data} = this.props;
        var stats = <div> Nothing to show </div>, key = 0;
        if(data){
            stats = data.map(item => {
                ++key;
                return(
                    <div className="box" key={key}>
                        <div className="item">
                            <h3 className="name">{item.name}</h3>
                            <p className="value">{item.value}</p>
                        </div>
                    </div>
                )
            });
        }
        return(
            <div className="stats">
                {stats}
            </div>
        )
    }
}

export default Stats;