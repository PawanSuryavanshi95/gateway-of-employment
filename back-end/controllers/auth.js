const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');
const sendMail = require('../utility/sendMail');

const database = require('../models/model');

const User = database.User;

exports.register = async (req,res) => {
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
                    res.json({success:true, message: `${user.email} has been registered.`, _id:user._id});
                }).catch(error => {
                    res.send({success:false, error:`${error}`});
                });
            });
        }
        else{
            res.json({status: 'This email or username has been already registered.'});
        }
    }).catch(error => {
        res.send({success:false, error:`${error}`});
    });
}

exports.signin = (req, res) => {
    console.log(req.body.id);
    User.findOne({
        $or: [
            { userName: req.body.id },
            { email: req.body.id },
        ]
    }).then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                if(user.confirmed===true){
                    var payLoad = {
                        _id: user._id,
                        userName: user.userName,
                    };
                    var token = jwt.sign(payLoad, authConfig.user_secret, {
                        expiresIn: 60*60*24
                    });
                    res.send({success:true, token:token, userName:user.userName});
                }
                else{
                    res.send({success:false, message:'Id is not confirmed', _id:user._id});
                }
            }
            else{
                res.json({success:false, error: 'Passwords did not matched.'});
            }
        }
        else{
            res.json({success:false, error: 'User not found'});
        }
    }).catch(error => {
        res.send({success:false, error : error});
    });
}

exports.confirmMail = async (req,res) => {
    try {
        const { _id } = jwt.verify(req.params.token, authConfig.email_secret);
        await User.updateOne({_id:_id}, {confirmed:true});
        await User.findById(_id).then(user=>{
            return res.redirect(`https://www.findpathway.com/signin`)
        })
    } catch (e) {
        res.send('error');
    }
}

exports.sendLink = async (req,res)=>{
    const emailToken = jwt.sign({ _id: req.body._id }, authConfig.email_secret, { expiresIn:'1d' });
    const confirmLink = authConfig.confirmLink + emailToken;
    const text = "Click this link to confirm your email and activate your Gateway of Employment ID " + confirmLink;
    var email="";
    User.findById(req.body._id).then(async user=>{
        email = user.email;
    });
    sendMail.sendMail(email, "Confirm Email", text);
    return res.send({message:"Link Sent"});
}