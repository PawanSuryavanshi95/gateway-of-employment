import React from 'react';
import {withRouter, Link} from 'react-router-dom';

const Employer = (props) => {
    return(
        <main className="main">
        <div className="content">
            <div className="center">
                <p><h2>Who are you ?</h2><br/></p>
                <Link to="/register/1/person"><button className="button"><span>Individual</span></button></Link>
                <Link to="/register/1/firm"><button className="button"><span>Firm</span></button></Link>
            </div>
        </div>
        </main>
    )
}

export default withRouter(Employer);