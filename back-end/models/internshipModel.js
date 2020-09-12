var mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employerName: { type: String, required: true},
    title: { type: String, required: true, unique:true},
    desc: { type: String, required: true },
    reqs: { type: String, required: true },
    reason: { type: String, required: true },
    fromHome: { type: Boolean, required:true },
    address: { type:String, required:false },
    stipend: {
        available: { type: Boolean, required:true },
        amount: { type: String, default:0 },
    },
    duration: { type:String, required:true },
    otherDetails: { type:String, required:false },
});

const internshipModel = mongoose.model('Internship',internshipSchema);

module.exports = internshipModel;