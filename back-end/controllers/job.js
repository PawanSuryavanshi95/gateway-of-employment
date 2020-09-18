const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');
const sendMail = require('../utility/sendMail');

const database = require('../models/model');

const User = database.User;
const Job = database.Job;

exports.createJob = async (req, res) => {
    const token = req.body.headers['X-access-token'];
    var newJob = req.body.info;
    var success=false,message;
    jwt.verify(token, authConfig.user_secret, async (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, error:e})
        }
        if(decoded){
            User.findById(decoded._id).then(async user => {
                if(user.category==="Employer"){
                    newJob.employer = decoded._id;
                    newJob.employerName = user.userName;
                    Job.create(newJob).then(async (job) => {
                        User.updateOne({ _id:decoded._id }, { $push: { 'userEmployerInfo.jobs' : job._id } }).then(user=>{
                            success = true;
                            message = `${job.title} has been created by ${decoded._id}.`;

                            /*const to = user.email;
                            const subject = "You have created a job";
                            const text = "You have created a job " + job.title + "at gateway of employment, you have made an effort in eradicating unemployment in India.";
                            const res = sendMail.sendMail(to,subject,text);*/
                            
                            return res.send({ success:true,message:message })
                        }).catch(e =>{
                            return res.send({ success:false,message:e.message })
                        });
                      }).catch(error => {
                            return res.send({ success:false, message:`${newJob.title} could not be created.`, error:error});
                      });
                }
            })
        }
    })
}

exports.applyJob = (req,res) => {
    const token = req.body.headers['X-access-token'];
    const employer = req.body.employer;
    const jobTitle = req.body.jobTitle;
    const proposal = req.body.proposal;
    console.log(token)
    if(token){
        jwt.verify(token, authConfig.user_secret, (e,decoded) => {
            if(e){
                return res.status(403).send({error:e});
            }
            if(decoded){
                User.findById(employer).then(user => {
                    user.notifications.push({msg: `${decoded.userName} has applied for the job ${jobTitle}.`, category:"APPLICATION_JOB",
                    proposal: proposal, candidate:decoded.userName, workName: jobTitle, selected:false });
                    user.save();
                    return res.send("Success");
                });
            }
        });
    }
    else{
        return res.send("No token was sent");
    }
}

exports.editJob = (req,res) => {
    const token = req.body.headers['X-access-token'];
    var job = req.body.info;
    jwt.verify(token, authConfig.user_secret, async (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, message:e.message})
        }
        if(decoded){
            User.findById(decoded._id).then(async user => {
                if(user.category==="Employer"){
                    var query = { title:job.title };
                    Job.updateOne(query, job).then(_res=>{
                        return res.send({success:true, message:"Edited !"});
                    })
                }
                else{
                    return res.send({success:false, message:"You are not an employer"});
                }
            })
        }
    })
}

exports.remove = (req, res) => {
    const token = req.body.headers['X-access-token'];
    jwt.verify(token, authConfig.user_secret, async (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, message:e.message})
        }
        if(decoded){
            await Job.deleteOne({_id:req.body._id});
            return res.send({ success:true, message:"Job Removed" })
        }
    })
}

exports.jobList = (req,res) => {
    if(req.query.employer!==null && req.query.employer!==undefined){
        Job.find({ employer:req.query.employer }).then(jobs => {
            res.json({"jobs":jobs})
        });
    }
    else{
        Job.find({}).then(jobs => {
            res.json({"jobs":jobs})
        });
    }
}