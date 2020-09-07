var express = require('express');
var cors = require('cors');

const controller = require('../controllers/user');

const userRouter = express.Router();

userRouter.use(cors());

userRouter.get('/profile', controller.profile);

userRouter.get('/notifications', controller.notifications);

userRouter.get('/userList', controller.userList);

userRouter.post('/details', controller.details);

userRouter.post('/select-user', controller.selectUser);

userRouter.post('/change-email', controller.changeEmail);

userRouter.post('/toggle-receive-mail', controller.toggleReceiveMail);

module.exports = userRouter;