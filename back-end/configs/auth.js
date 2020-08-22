const serverConfig = require("./server");

module.exports = {
    user_secret: "#_AatmaNirbhar_India_Secret_483_#",
    email_secret: "#_Aatma_Email_Nirbhar_363_#",
    confirmLink: `http://localhost:${serverConfig.port}/api/auth/confirmation/`
}