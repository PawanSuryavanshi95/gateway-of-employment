var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userEmployeeSchema = new mongoose.Schema({
    firstName: { type:String, required:false },
    lastName: { type:String, required:false },
    gender: { type:String, required:false },
});

const userEmployerSchema = new mongoose.Schema({
    firm:{ type:Boolean, required:true},
    firstName: { type:String, required:false },
    lastName: { type:String, required:false },
    firmName: { type:String, required:false },
    gender: { type:String, required:false },
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
});

const userSchema = new mongoose.Schema({
    email: { type:String, required:false, unique:true },
    userName: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    created: { type:Date, default: Date.now },

    userEmployeeInfo:userEmployeeSchema,

    userEmployerInfo:userEmployerSchema,

    "category": { type:String, required:true }
});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;