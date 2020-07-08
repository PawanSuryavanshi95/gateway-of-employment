var mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, unique:true},
    desc: { type: String, required: true },
    reqs: { type: String, required: true },
    reason: { type: String, required: true },
    fullTime: { type: Boolean, required:true },
    fromHome: { type: Boolean, required:true },
});

const jobModel = mongoose.model('Job',jobSchema);

module.exports = jobModel;