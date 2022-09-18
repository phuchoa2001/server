const Admin_login = require("../../app/controllers/models/admin/login")
const Admin_token = require("../../app/controllers/models/admin/token")

function CheckLogin(req, res, next) {
    const { username, password } = req.body;
    Admin_login.findOne({ username, password }, function (err, data) {
        if (data) {
            next()
        } else {
            res.sendStatus(401);
        }
    })
}
function AddToken(accessToken) {
    let myPromise = new Promise(function (myResolve, myReject) {
        const post = new Model({ token: accessToken });
        await post.save().then(_ => {
            myResolve();
        });
    });
    return myPromise;
}

module.exports = { CheckLogin };