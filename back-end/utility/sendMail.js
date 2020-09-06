const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

exports.sendMail = async (to,subject,text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'goe.cohest@gmail.com',
            clientId: '60558016495-ja64jp4vo5tch3hcf5o8bcd6nf29l66u.apps.googleusercontent.com',
            clientSecret: 'v6sa-hLJOASmpi7Glbetos67',
            refreshToken: '1//0feIVCQJR9fWnCgYIARAAGA8SNwF-L9IrRXTKCtZzZ3pcalp4ay57sVX4dYB2fvhp3I2z2e_BWCCMjgdQvV35PPWmbyGR18shFiw',
        }
    });
    
    let mailOptions = {
        from: 'goe.cohest@gmail.com',
        to: to,
        subject: subject,
        text: text,
    }
    transporter.sendMail(mailOptions, (e, data)=>{
        if(e){
            return {error:e};
        }
        return "Sent !";
    });
}