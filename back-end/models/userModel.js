var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const detailSchema = new mongoose.Schema({
    fatherName: { type:String, required:false },
    motherName: { type:String, required:false },
    dob: { type:Date, required:false },
    aadhaar: { type:Number, required:false },
    mobNum: { type:Number, required:false },
    exp: { type:Number, required:false },
    skilled: { type:Boolean, required:false },
    permanent: { type:Boolean, required:false },
});

const userEmployeeSchema = new mongoose.Schema({
    firstName: { type:String, required:false },
    lastName: { type:String, required:false },
    gender: { type:String, required:false },
    details: detailSchema,
});

const userEmployerSchema = new mongoose.Schema({
    firm:{ type:Boolean, required:true},
    firstName: { type:String, required:false },
    lastName: { type:String, required:false },
    firmName: { type:String, required:false },
    gender: { type:String, required:false },
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
});

const notificationSchema = new mongoose.Schema({
    created: { type:Date, default: Date.now },
    msg: { type:String, required:true},
    proposal: { type:String, required:false},
    new: { type:Boolean, default:true },
});

const userSchema = new mongoose.Schema({
    email: { type:String, required:false, unique:true },
    userName: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    created: { type:Date, default: Date.now },

    userEmployeeInfo: userEmployeeSchema,

    userEmployerInfo: userEmployerSchema,

    notifications: [notificationSchema],

    "category": { type:String, required:true }
});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;