const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');

const database = require('../models/model');

const User = database.User;

exports.profile = (req,res) => {
    const token = req.headers['x-access-token'];
    const query = req.query;
    if(query.public==="true"){
        User.findOne({ userName: query.userName }).then(user => {
            var userData = createPublicProfile(user);
            return res.send({ userData: userData, public: true});
        });
    }
    else{
        if(token){
            jwt.verify(token, authConfig.secret, (e,decoded)=>{
                if(e){
                    return res.status(403).send({error:e})
                }
                if(decoded){
                    User.findById(decoded._id).then(user => {
                        if(user.userName===query.userName){
                            return res.send({ userData: user, public: false });
                        }
                        else{
                            User.findOne({ userName: query.userName }).then(user => {
                                var userData = createPublicProfile(user);
                                return res.send({ userData: userData, public: true});
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
        jwt.verify(token, authConfig.secret, (e,decoded) => {
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

exports.details = (req,res) => {
    const token = req.body.headers['X-access-token'];
    jwt.verify(token, authConfig.secret, (e,decoded) => {
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

const createPublicProfile = function(user){
    var userData = {};
    userData = {
        userName: user.userName,
        category: user.category,
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