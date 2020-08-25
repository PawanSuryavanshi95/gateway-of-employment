var express = require('express');
var cors = require('cors');
var bcrypt = require('bcrypt');

const controller = require('../controllers/auth');

// -------  To be removed Later  --------
const database = require('../models/model');
const { isMaster } = require('cluster');
const User = database.User;
// ---------------------------------------

var authRouter = express.Router();

authRouter.use(cors());
authRouter.post('/register', controller.register);

authRouter.post('/signin', controller.signin);

authRouter.get('/confirmation/:token', controller.confirmMail);

authRouter.post('/send-link', controller.sendLink);

authRouter.get('/create-admin', async (req,res)=>{
    /*adminUser = {
        userName:res.body.info.userName,
        category:"Admin",
        email:"#NOEMAIL",
        password:req.body.info.password,
    }*/

    var adminUser = {
        userName: "GOE-Master",
        password: "1#2#46347c#nd6xbg44$5$xfzd&4zf3te*#t",
        email:"pawansuryavanshi95@gmail.com",
        confirmed:true,
        category:"Admin-Master",
    }

    await bcrypt.hash(adminUser.password,10, async (e,hash)=>{
        adminUser.password = hash;
        await User.create(adminUser).then(user=>{
            return res.json(user);
        });
    })
});

authRouter.get("/test", (req,res)=>{
    res.send("Working !");
});

module.exports = authRouter;