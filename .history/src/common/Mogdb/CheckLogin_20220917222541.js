const Admin_login = require("../../app/controllers/models/admin/login")

function CheckLogin(req, res, next) {
    const { username, password } = req.body;
    Admin_login.findOne({ username, password }, function (err, data) {
        console.log("data", data);
        if (data) {
            next()
        } else {
            res.sendStatus(401).json({ message: "Mất khẩu hoặc tài khoản không chính xác" })
        }
    })
}

module.exports = { CheckLogin };