var express = require('express');
var cors = require('cors');

const controller = require('../controllers/auth');

// -------  To be removed Later  --------
const database = require('../models/model');
const User = database.User;
// ---------------------------------------

var authRouter = express.Router();

authRouter.use(cors());
authRouter.post('/register', controller.register);

authRouter.post('/signin', controller.signin);

authRouter.get('/confirmation/:token', controller.confirmMail);

authRouter.post('/send-link', controller.sendLink);

authRouter.post('/create-admin', async (req,res)=>{
    adminUser = {
        userName:res.body.info.userName,
        category:"Admin",
        email:"#NOEMAIL",
        password:req.body.info.password,
    }

    await bcrypt.hash(adminUser.password,10, async (e,hash)=>{
        adminUser.password = hash;
        await User.create(adminUser).then(user=>{
            return res.json(user);
        });
    })
});

module.exports = authRouter;