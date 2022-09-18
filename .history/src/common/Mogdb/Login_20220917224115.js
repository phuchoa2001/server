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
    let myPromise = new Promise(async function (myResolve, myReject) {
        const post = new Admin_token({ token: accessToken });
        await post.save().then(_ => {
            myResolve();
        });
    });
    return myPromise;
}
function DeleteToken(token) {
    let myPromise = new Promise(async function (myResolve, myReject) {
        Admin_token.deleteOne({ token }).then(_ => {
            myResolve();
        })
    });
    return myPromise;
}

module.exports = { CheckLogin, AddToken , DeleteToken };