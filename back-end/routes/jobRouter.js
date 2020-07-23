var express = require('express');
var cors = require('cors');

const controller = require('../controllers/job');

var jobRouter = express.Router();

jobRouter.use(cors());

jobRouter.post('/createjob', controller.createjob);

jobRouter.post('/apply', controller.apply);

jobRouter.get('/jobList', controller.jobList)

module.exports = jobRouter;