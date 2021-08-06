import React from 'react';

import './Footer.css'

const Footer = function(props){

    return (
        <div className="footer">
        <footer id="myFooter">
        <div className="container">
            <ul>
                <li><a href="#">Company Information</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Reviews</a></li>
                <li><a href="#">Terms of service</a></li>
            </ul>
        <p className="footer-copyright">© 2016 Copyright Text</p>
        </div>
        <div className="footer-social">
            <a href="https://www.facebook.com/pawan.suryavanshi.5095" target="_blank" className="social-icons"><i className="fa fa-facebook"></i></a>
            <a href="#" className="social-icons"><i className="fa fa-google-plus"></i></a>
            <a href="https://twitter.com/iampawan___" target="_blank" className="social-icons"><i className="fa fa-twitter"></i></a>
        </div>
    </footer>
    </div>
    )
}

export default Footer;