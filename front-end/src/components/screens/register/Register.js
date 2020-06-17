import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const Register = (props) => {
        return(
            <main className="main">
            <div className="content">
            <div className="center">
                <p><h1>What is your purpose ?</h1>
                    <h4>I want to ...</h4>
                
                <Link to="/register/1"><button className="button"><span>Hire</span></button></Link>
                <Link to="/register/2"><button className="button"><span>Get Hired</span></button></Link>
                </p>
            </div>
                
            </div>
            </main>
        )
}

export default withRouter(Register);