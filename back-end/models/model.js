const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const database = {};

database.mongoose = mongoose;

database.User = require('./userModel');

database.Job = require('./jobModel');

database.Internship = require('./internshipModel');

module.exports = database;