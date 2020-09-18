const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');
const sendMail = require('../utility/sendMail');

const database = require('../models/model');

const User = database.User;
const Internship = database.Internship;

exports.createIn = async (req, res) => {
    const token = req.body.headers['X-access-token'];
    var newIn = req.body.info;
    var success=false,message;
    jwt.verify(token, authConfig.user_secret, async (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, error:e})
        }
        if(decoded){
            User.findById(decoded._id).then(async user => {
                if(user.category==="Employer"){
                    newIn.employer = decoded._id;
                    newIn.employerName = user.userName;
                    Internship.create(newIn).then(async (internship) => {
                        User.updateOne({ _id:decoded._id }, { $push: { 'userEmployerInfo.internships' : internship._id } }).then(user=>{
                            success = true;
                            message = `${internship.title} internship has been created by ${decoded._id}.`;

                            /*const to = user.email;
                            const subject = "You have created an internship";
                            const text = "You have created an internship " + internship.title + "at gateway of employment, you have made an effort in eradicating unemployment in India.";
                            const res = sendMail.sendMail(to,subject,text);*/

                            return res.send({ success:success,message:message })
                        }).catch(e =>{
                            message = e;
                        });
                      }).catch(error => {
                            return res.send({ success:false, message:`${newIn.title} internship could not be created.`, error:error});
                      });
                }
            })
        }
    })
}

exports.applyIn = (req,res) => {
    const token = req.body.headers['X-access-token'];
    const employer = req.body.employer;
    const inTitle = req.body.inTitle;
    const proposal = req.body.proposal;
    if(token){
        jwt.verify(token, authConfig.user_secret, (e,decoded) => {
            if(e){
                return res.status(403).send({error:e});
            }
            if(decoded){
                User.findById(employer).then(user => {
                    user.notifications.push({msg: `${decoded.userName} has applied for the internship ${inTitle}.`, category: "APPLICATION_INTERNSHIP",
                    proposal: proposal, candidate:decoded.userName, workName: inTitle, selected:false });
                    user.save();
                    return res.send("Success");
                });
            }
        });
    }
    else{
        return res.send("No token was sent.");
    }
}

exports.inList = (req,res) => {
    if(req.query.employer!==null && req.query.employer!==undefined){
        Internship.find({ employer:req.query.employer }).then(internships => {
            res.json({"internships":internships})
        });
    }
    else{
        Internship.find({}).then(internships => {
            res.json({"internships":internships})
        });
    }
}

exports.editInternship = (req,res) => {
    const token = req.body.headers['X-access-token'];
    var internship = req.body.info;
    jwt.verify(token, authConfig.user_secret, async (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, message:e.message})
        }
        if(decoded){
            User.findById(decoded._id).then(async user => {
                if(user.category==="Employer"){
                    var query = { title:internship.title };
                    Internship.updateOne(query, internship).then(_res=>{
                        return res.send({success:true, message:"Edited !"});
                    })
                }
                else{
                    return res.send({success:false, message:"You are not an employer"});
                }
            })
        }
    })
}

exports.remove = (req, res) => {
    const token = req.body.headers['X-access-token'];
    jwt.verify(token, authConfig.user_secret, async (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, message:e.message})
        }
        if(decoded){
            await Internship.deleteOne({_id:req.body._id});
            return res.send({ success:true, message:"Internship Removed" })
        }
    })
}