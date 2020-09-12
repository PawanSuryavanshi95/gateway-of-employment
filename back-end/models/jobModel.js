var mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employerName: { type: String, required: true},
    title: { type: String, required: true, unique:true},
    desc: { type: String, required: true },
    reqs: { type: String, required: true },
    reason: { type: String, required: true },
    fullTime: { type: Boolean, required:true },
    fromHome: { type: Boolean, required:true },
    permanent: { type:Boolean, required:true },
    duration: { type:String, required:false },
    address: { type:String, required:false },
    otherDetails: { type:String, required:false },
    salary: { type:Number, required:true },
});

const jobModel = mongoose.model('Job',jobSchema);

module.exports = jobModel;