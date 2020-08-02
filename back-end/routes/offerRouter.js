var express = require('express');
var cors = require('cors');

const controllerJob = require('../controllers/job');
const controllerIn = require('../controllers/internship');

var db = require('../models/model');
var User = db.User;

var offerRouter = express.Router();

offerRouter.use(cors());

offerRouter.post('/create-job', controllerJob.createJob);

offerRouter.post('/apply-job', controllerJob.applyJob);

offerRouter.get('/job-list', controllerJob.jobList);

offerRouter.post('/create-internship', controllerIn.createIn);

offerRouter.post('/apply-internship', controllerIn.applyIn);

offerRouter.get('/internship-list', controllerIn.inList);

module.exports = offerRouter;