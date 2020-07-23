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

exports.admin = async (req,res) => {
    const userName = req.body.userName, password = req.body.password;
    await User.findOne({userName:userName}).then(async user => {
        if(user){
            if(user.category.substr(0,5)==="Admin"){
                if(bcrypt.compareSync(password, user.password)){
                    var userList = await User.find({});
                    var jobList = await Job.find({});
                    const payLoad = {
                        _id: user._id,
                        userName: user.userName,
                    }
                    const token = jwt.sign(payLoad, authConfig.secret);
                    return res.send({ verified:true, token:token, userList:userList, jobList:jobList});
                }
                else{
                    return res.send({ verified:false, message:"The username or password is incorrect." });
                }
            }
            else{
                return res.send({ verified: false, message:"This user is not a registered admin."});
            }
        }
        else{
            return res.send({ verified:false, message:"The username or password is incorrect." });
        }
    });
}

exports.remove =  async (req,res)=>{
    const token = req.body.headers['x-access-token'];
    const query = req.body.query;
    jwt.verify(token, authConfig.secret, async(e,decoded) => {
        if(e){
            return res.send({error:e});
        }
        if(decoded){
            await User.findById(decoded._id).then(async user => {
                if(user.category.substr(0,5)==="Admin"){
                    if(query.type==="User"){
                        await User.findById(query.id).then(async user=>{
                            if(user.category==="Employer"){
                                await Job.deleteMany({ employer: user._id})
                            }
                            await User.deleteOne({_id:user._id});
                            return res.send({success:true}); 
                        });
                    }
                    else if(query.type==="Job"){
                        await Job.findById(query.id).then(async job=>{
                            await Job.deleteOne({_id:job._id});
                            return res.send({success:true}); 
                        });
                    }
                }
                else{
                     return res.send({success:false,message:"Invalid Request"})
                }
            });
        }
        else{
            return res.send({success:false,message:"Invalid Request"})
        }
    });
}