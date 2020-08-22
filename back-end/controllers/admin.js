const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');

const database = require('../models/model');

const User = database.User;
const Job = database.Job;
const Internship = database.Internship;

exports.login = async (req,res) => {
    const userName = req.body.userName, password = req.body.password;
    await User.findOne({userName:userName}).then(async user => {
        if(user){
            if(user.category.substr(0,5)==="Admin"){
                if(bcrypt.compareSync(password, user.password)){
                    var userList = await User.find({});
                    var jobList = await Job.find({});
                    var inList = await Internship.find({});
                    const payLoad = {
                        _id: user._id,
                        userName: user.userName,
                    }
                    const token = jwt.sign(payLoad, authConfig.user_secret);
                    return res.send({ verified:true, token:token, userList:userList, jobList:jobList, inList:inList});
                }
                else{
                    return res.send({ verified:false, message:"The username or password is incorrect." });
                }
            }
            else{
                return res.send({ verified: false, message:"This user is not a registered admin."});
            }
        }
        else{
            return res.send({ verified:false, message:"The username or password is incorrect." });
        }
    });
}

exports.remove =  async (req,res)=>{
    const token = req.body.headers['x-access-token'];
    const query = req.body.query;
    jwt.verify(token, authConfig.user_secret, async(e,decoded) => {
        if(e){
            return res.send({error:e});
        }
        if(decoded){
            await User.findById(decoded._id).then(async user => {
                if(user.category.substr(0,5)==="Admin"){
                    if(query.type==="User"){
                        await User.findById(query.id).then(async user=>{
                            if(user.category==="Employer"){
                                await Job.deleteMany({ employer: user._id})
                            }
                            await User.deleteOne({_id:user._id});
                            return res.send({success:true}); 
                        });
                    }
                    else if(query.type==="Job"){
                        await Job.findById(query.id).then(async job=>{
                            await Job.deleteOne({_id:job._id});
                            return res.send({success:true}); 
                        });
                    }
                    else if(query.type==="Internship"){
                        await Internship.findById(query.id).then(async internhsip=>{
                            await Internship.deleteOne({_id:internhsip._id});
                            return res.send({success:true}); 
                        });
                    }
                    else{
                        return res.send("Invalid type was given.");
                    }
                }
                else{
                     return res.send({success:false,message:"Invalid Request"})
                }
            });
        }
        else{
            return res.send({success:false,message:"Invalid Request"})
        }
    });
}