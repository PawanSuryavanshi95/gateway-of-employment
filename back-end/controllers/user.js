const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');

const sendMail = require('../utility/sendMail');
const database = require('../models/model');

const User = database.User;

exports.profile = (req,res) => {
    const token = req.headers['x-access-token'];
    const query = req.query;
    if(query.public==="true"){
        User.findOne({ userName: query.userName }).then(user => {
            var userData = createPublicProfile(user);
            const stats = getStats(user);
            return res.send({ userData: userData, public: true, stats:stats });
        });
    }
    else{
        if(token){
            jwt.verify(token, authConfig.user_secret, (e,decoded)=>{
                if(e){
                    return res.status(403).send({error:e})
                }
                if(decoded){
                    User.findById(decoded._id).then(user => {
                        if(user.userName===query.userName){
                            const stats = getStats(user);
                            return res.send({ userData: user, public: false, stats:stats });
                        }
                        else{
                            User.findOne({ userName: query.userName }).then(user => {
                                var userData = createPublicProfile(user);
                                const stats = getStats(user);
                                return res.send({ userData: userData, public: true, stats:stats });
                            });
                        }
                    });
                }
            });
        }
    }
}

exports.notifications = (req,res) => {
    const token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token, authConfig.user_secret, (e,decoded) => {
            if(e){
                return res.status(403).send({error:e});
            }
            if(decoded){
                User.findById(decoded._id).then(user => {
                    if(user){
                        res.send({ notifications : user.notifications });
                    }
                    else{
                        res.send({message:'User not found'})
                    }
                });
            }
        })
    }
}

exports.userList = (req,res) => {
    User.find({}).then(users => {
        res.json({"users":users})
    });
}

exports.details = (req,res) => {
    const token = req.body.headers['X-access-token'];
    jwt.verify(token, authConfig.user_secret, (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, error:e});
        }
        if(decoded){
            User.findById(decoded._id).then(user => {
                if(user.category==="Employee"){
                    user.userEmployeeInfo.details = req.body.details
                    user.save();
                    return res.send({success:true});
                }
            });
        }
    });
}

exports.selectUser = (req,res) => {
    const token = req.body.headers['X-access-token'];
    var success = true, message;
    jwt.verify(token, authConfig.user_secret, (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, message:e});
        }
        if(decoded){
            User.findById(decoded._id).then(user => {
                if(user.category==="Employer"){
                    var ntfData = req.body.ntfData;
                    var type = ntfData.category ? ntfData.category.substr(12) : "Nil";
                    var notification = {
                        msg: `You have been selected for the ${type} ${ntfData.workName} by ${decoded.userName}`,
                        category: "SELECTION",
                    };
                    User.updateOne({ userName: ntfData.candidate }, { $push: { 'notifications' : notification } }).then(object => {
                        message = `Notification Sent to ${ntfData.candidate} by ${decoded.userName}`;
                        User.findOne({userName:ntfData.candidate}).then(async employee=>{
                            var text1 = `You have been selected for the ${type} ${ntfData.workName} posted by ${user.userName}.\nWe advise you to get in touch with them and get started with your work.`;
                            var to1 = employee.email;
                            var subject1 = `You have been selected for ${type==="JOB"?"a":"an"} ${type}`;
                            const mailResult1 = await sendMail.sendMail(to1, subject1, text1);
                            
                            var text2 = `You have selected a recruit ${employee.userName} for the ${type} ${ntfData.workName}.\nWe advice that you start communicating with the recruit and start your work as soon as possible.`;
                            to2 = user.email;
                            subject2 = `You selected a recruit for ${type==="JOB"?"a":"an"} ${type}`;
                            const mailResult2 = await sendMail.sendMail(to2, subject2, text2);

                            return res.send({success:true, message:{ntf: message, mail:{ recruit: mailResult1, employer:mailResult2}}});
                        }).catch(e =>{
                            res.send({success:false, message:e.message});
                        });
                    }).catch(e => {
                        console.log(e);
                        return res.send({success:false, message:e.message});
                    })
                }
            });
        }
    });
}

exports.changeEmail = (req,res) => {
    const token = req.body.headers['X-access-token'];
    jwt.verify(token, authConfig.user_secret, (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, message:e.message});
        }
        if(decoded){
            User.findById(decoded._id).then(user1 => {
                User.findOne({email:req.body.email}).then(user2 => {
                    if(!user2){
                        user1.email = req.body.email;
                        user1.save();
                        res.send({success:true, message:"Email has been changed.", _id:user1._id});
                    }
                    else{
                        res.send({success:false, message:"This email has already been registered."});
                    }
                });
            });
        }
        else{
            res.send({success:false, message:"Something went wrong"});
        }
    });
}

exports.toggleReceiveMail = (req,res) => {
    const token = req.body.headers['X-access-token'];
    jwt.verify(token, authConfig.user_secret, (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, message:e.message});
        }
        if(decoded){
            User.findById(decoded._id).then(user => {
                user.receiveMail = req.body.receiveMail;
                user.save();
                res.send({success:true, message:!req.body.receiveMail?"You won't receive emails from us.":"You will now receive emails from us"});
            });
        }
        else{
            res.send({success:false, message:"Something went wrong"});
        }
    });
}

const createPublicProfile = function(user){
    var userData = {};
    userData = {
        userName: user.userName,
        category: user.category,
        confirmed: user.confirmed,
    }
    if(user.category==="Employer"){ userData.userEmployerInfo = user.userEmployerInfo }
    else if(user.category==="Employee"){
        userData.userEmployeeInfo = {details:{}};
        userData.userEmployeeInfo.firstName = user.userEmployeeInfo.firstName;
        userData.userEmployeeInfo.lastName = user.userEmployeeInfo.lastName;
        userData.userEmployeeInfo.gender = user.userEmployeeInfo.gender;
        userData.userEmployeeInfo.details.fatherName = user.userEmployeeInfo.details.fatherName;
        userData.userEmployeeInfo.details.motherName = user.userEmployeeInfo.details.motherName;
        userData.userEmployeeInfo.details.exp = user.userEmployeeInfo.details.exp;
        userData.userEmployeeInfo.details.skilled = user.userEmployeeInfo.details.skilled;
        userData.userEmployeeInfo.details.permanent = user.userEmployeeInfo.details.permanent;
    }
    return userData;
}

const getStats = (user) => {
    var stats = {};
    if(user.category==="Employer"){
        stats = [{ name: "Jobs", value: user.userEmployerInfo.jobs.length },
        { name: "Internships", value: user.userEmployerInfo.internships.length }];
    }
    else if(user.category==="Employee"){
        stats = [{ name: "Total Applications", value: user.userEmployeeInfo.stats.applied },
        { name: "Successfull Applications", value: user.userEmployeeInfo.stats.selected }];
    }
    return stats;
}