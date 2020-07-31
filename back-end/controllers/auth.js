const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');

const database = require('../models/model');

const User = database.User;
const Job = database.Job;

exports.register = (req,res) => {
    var newUser = {
        userName: req.body.info.userName,
        email: req.body.info.email,
        password: req.body.info.password,
        category: req.body.info.category,
    }

    User.findOne({
        $or:[{email: req.body.info.email}, {userName: req.body.info.userName}]        
    }).then( user => {
        if(!user){
            if(req.body.create==="USER_EMPLOYEE"){
                newUser.userEmployeeInfo = {
                    firstName: req.body.info.firstName,
                    lastName: req.body.info.lastName,
                    gender: req.body.info.gender,
                }
            }
            else if(req.body.create==="USER_EMPLOYER_INDIVIDUAL"){
                newUser.userEmployerInfo = {
                    firm: false,
                    firstName: req.body.info.firstName,
                    lastName: req.body.info.lastName,
                    gender: req.body.info.gender,
                }
            }
            else if(req.body.create==="USER_EMPLOYER_FIRM"){
                newUser.userEmployerInfo = {
                    firm: true,
                    firmName: req.body.info.firmName,
                }
            }

            bcrypt.hash(req.body.info.password, 10, (error, hash) => {
                newUser.password = hash;
                User.create(newUser).then(user => {
                    res.json({status: `${user.email} has been registered.`});
                }).catch(error => {
                    res.send(`error : ${error}`);
                });
            });
        }
        else{
            res.json({status: 'This email or username has been already registered.'});
        }
    }).catch(error => {
        res.send(`error : ${error}`);
    });
}

exports.signin = (req, res) => {
    User.findOne({
        $or: [
            { userName: req.body.id },
            { email: req.body.id },
        ]
    }).then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                var payLoad = {
                    _id: user._id,
                    userName: user.userName,
                };
                var token = jwt.sign(payLoad, authConfig.secret, {
                    expiresIn: 60*60*24
                });
                res.send(token);
            }
            else{
                res.json({error: 'Passwords did not matched.'});
            }
        }
        else{
            res.json({error: 'User not found'});
        }
    }).catch(error => {
        res.send(`error : ${error}`);
    });
}