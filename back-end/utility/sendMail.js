const nodemailer = require('nodemailer');

exports.sendMail = (to,subject,text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pawansuryavanshi95@gmail.com',
            pass: 'blackfish95',
        }
    });
    
    let mailOptions = {
        from: 'pawansuryavanshi95@gmail.com',
        to: 'suryavanshi.1@iitj.ac.in',
        subject: subject,
        text: text,
    }
    
    transporter.sendMail(mailOptions, (e, data)=>{
        if(e){
            return {"Error": e};
        }
        return "Mail Sent Successfuly";
    });
}