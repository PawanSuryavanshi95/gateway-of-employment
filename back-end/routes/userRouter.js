var express = require('express');
var cors = require('cors');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = require('../models/userModel');
var Job = require('../models/jobModel');
const authConfig = require('../configs/auth');
const { decode } = require('punycode');

var userRouter = express.Router();
var newUser ={}

userRouter.use(cors());
userRouter.post('/register',(req, res) => {
    newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
    }

    User.findOne({
        $or:[{email: req.body.email}, {userName: req.body.userName}]        
    }).then( user => {
        if(!user){
            if(req.body.create==="USER_EMPLOYEE"){
                newUser.userEmployeeInfo = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    gender: req.body.gender,
                }
            }
            else if(req.body.create==="USER_EMPLOYER_INDIVIDUAL"){
                newUser.userEmployerInfo = {
                    firm: false,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    gender: req.body.gender,
                }
            }
            else if(req.body.create==="USER_EMPLOYER_FIRM"){
                newUser.userEmployerInfo = {
                    firm: true,
                    firmName: req.body.firmName,
                }
            }

            bcrypt.hash(req.body.password, 10, (error, hash) => {
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
});

userRouter.post('/signin', (req, res) => {
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
});

userRouter.get('/profile', (req,res) => {
    const token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token, authConfig.secret, (e,decoded)=>{
            if(e){
                return res.status(403).send({error:e})
            }
            if(decoded){
                User.findById(decoded._id).then(user => {
                    return res.send({ userData: user });
                });
            }
        });
    }
});

userRouter.post('/createjob', (req, res) => {
    newJob = {
      employer: req.body.employer,
      title: req.body.title,
      desc: req.body.desc,
      reqs: req.body.reqs,
      reason: req.body.reason,
      fullTime: req.body.fullTime,
      fromHome: req.body.fromHome,
    }
  
    Job.create(newJob).then(async (job) => {
      res.json({status : `${job.title} is created.`})
      var user = await User1.findById(ereq.body.employer);
      user.userEmployerInfo.jobs.push(job._id).then(user => {
        res.json({status:`Job Offer titled ${job.title} is Created and added to the employer ${user.userName}'s list of jobs.`});
      }).catch(error => {
        res.send(`Job Offer is created but could not add it to the employer's list of jobs, Error : ${error}`)
      });
    }).catch(error => {
      res.send(`error : ${error}`);
    });
  });

userRouter.get('/jobList', (req,res)=> {
    Job.find({}).then(jobs => {
        res.json({"jobs": jobs});
        console.log(req.headers);
    });
})

userRouter.get('/userList', (req,res) => {
  User.find({}).then(users => {
        res.json({"users":users})
  });
});

module.exports = userRouter;