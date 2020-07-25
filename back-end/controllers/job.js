const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');

const database = require('../models/model');

const User = database.User;
const Job = database.Job;

exports.createjob = (req, res) => {
    const token = req.body.headers['X-access-token'];
    const newJob = {
      title: req.body.info.title,
      desc: req.body.info.desc,
      reqs: req.body.info.reqs,
      reason: req.body.info.reason,
      fullTime: req.body.info.fullTime,
      fromHome: req.body.info.fromHome,
    }
    var success=false,message;
    jwt.verify(token, authConfig.secret, (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, error:e})
        }
        if(decoded){
            User.findById(decoded._id).then(user => {
                if(user.category==="Employer"){
                    newJob.employer = decoded._id;
                    Job.create(newJob).then(async (job) => {
                        var user = await User.findById(decoded._id);
                        user.userEmployerInfo.jobs.push(job._id).then(() => {
                            success = true;
                            message = `${job.title} has been created by ${decoded._id}.`;
                        });
                      }).catch(error => {
                        if(Object.keys({}).length){
                            return res.send({ success:success, message:`${newJob.title} could not be created.`, error:error});
                        }
                      });
                }
            })
        }
    })
    return res.send({ success:success,message:message })
}

exports.apply = (req,res) => {
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
                    user.notifications.push({msg: `${decoded.userName} has applied for ${jobTitle}.`, proposal: proposal, candidate:decoded.userName});
                    user.save();
                    return res.send("Success");
                });
            }
        });
    }
}

exports.jobList = (req,res)=> {
    Job.find({}).then(jobs => {
        res.json({"jobs": jobs});
    });
}