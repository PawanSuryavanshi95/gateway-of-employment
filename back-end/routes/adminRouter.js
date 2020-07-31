var express = require('express');
var cors = require('cors');

const controller = require('../controllers/admin');

var adminRouter = express.Router();
adminRouter.use(cors());

adminRouter.post('/login', controller.login);

adminRouter.post('/remove', controller.remove);

module.exports = adminRouter;