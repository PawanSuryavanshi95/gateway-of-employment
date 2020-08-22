var mongoose = require('mongoose');

const info = new mongoose.Schema({
    name: { type:String, required:true, unique:true },
    address: { type:String, required:true },
    sessionID: { type:String, required:false },
    
});

const instituteSchema = new mongoose.Schema({
    email: { type:String, required:false, unique:true },
    userName: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    created: { type:Date, default: Date.now },
    reported: [reportSchema],

    instituteInfo: info,
});

const instituteModel = mongoose.model('Institute',instituteSchema);

module.exports = instituteModel;