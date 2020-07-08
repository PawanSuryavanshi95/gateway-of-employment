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
    });
})

userRouter.get('/userList', (req,res) => {
  User.find({}).then(users => {
        res.json({"users":users})
  });
});

userRouter.post('/apply', (req,res) => {
    const token = req.body.headers['X-access-token'];
    const employer = req.body.employer;
    const jobTitle = req.body.jobTitle;
    const proposal = req.body.proposal;
    if(token){
        jwt.verify(token, authConfig.secret, (e,decoded) => {
            if(e){
                return res.status(403).send({error:e});
            }
            if(decoded){
                User.findById(employer).then(user => {
                    user.notifications.push({msg: `${decoded.userName} has applied for ${jobTitle}.`, proposal: proposal});
                    user.save();
                    return res.send("Success");
                });
            }
        });
    }
});

userRouter.get('/notifications', (req,res) => {
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
});

userRouter.post('/details', (req,res) => {
    const token = req.body.headers['x-access-token'];
    jwt.verify(token, authConfig.secret, (e,decoded) => {
        if(e){
            return res.status(403).send({error:e});
        }
        if(decoded){
            User.findById(decoded._id).then(user => {
                if(user.category==="Employee"){
                    user.userEmployeeInfo.details = req.body.details
                    user.save();
                }
            });
        }
    });
});

userRouter.post('/admin', async (req,res) => {
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
});

userRouter.post('/create-admin', async (req,res)=>{
    adminUser = {
        userName:res.body.info.userName,
        category:"Admin",
        email:"#NOEMAIL",
        password:req.body.info.password,
    }

    await bcrypt.hash(adminUser.password,10, async (e,hash)=>{
        adminUser.password = hash;
        await User.create(adminUser).then(user=>{
            return res.json(user);
        });
    })
});

userRouter.post('/remove', async (req,res)=>{
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
});

module.exports = userRouter;