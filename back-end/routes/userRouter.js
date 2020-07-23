var express = require('express');
var cors = require('cors');

const controller = require('../controllers/user');

const userRouter = express.Router();

userRouter.use(cors());

userRouter.get('/profile', controller.profile);

userRouter.get('/notifications', controller.notifications);

userRouter.post('/details', controller.details);

module.exports = userRouter;