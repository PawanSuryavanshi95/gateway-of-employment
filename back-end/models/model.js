const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const database = {};

database.mongoose = mongoose;

database.User = require('./userModel');

database.Job = require('./jobModel');

module.exports = database;