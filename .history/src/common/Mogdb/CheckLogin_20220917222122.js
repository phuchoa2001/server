const Admin_login = require("../../app/controllers/models/admin/login")

function CheckLogin(req, res, next) {
    const { username, password } = req.body.data;
    Admin_login.findOne({username , password} , function(err , data) {
        console.log("data" , DataTransferItem);
    })
}

module.exports = { CheckLogin };