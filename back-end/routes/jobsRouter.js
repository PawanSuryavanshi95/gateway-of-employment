var express = require('express');
var cors = require('cors');

var Job = require('../models/jobModel')
var User1 = require('../models/UserModel')

var jobsRouter = express.Router();
var newJob={};

jobsRouter.use(cors());

jobsRouter.post('/createjob', (req, res) => {
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

jobsRouter.get('/jobList', (req,res)=>{
  Job.find({}).then(job => {
    res.json(job);
  });
});



module.exports = jobsRouter;