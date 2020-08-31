const nodemailer = require('nodemailer');

exports.sendMail = async (to,subject,text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'goe.cohest@gmail.com',
            pass: 'R*U#V22$@',
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