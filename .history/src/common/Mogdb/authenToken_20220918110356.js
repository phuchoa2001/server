const Admin_login = require("../../app/controllers/models/admin/login");
const Admin_Token = require("../../app/controllers/models/admin/token");

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // 'Beaer [token]'
    if (!authorizationHeader) {
        res.sendStatus(401)
        return;
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(403);
        Admin_login.findOne({ username, password }, function (err, data) {
            if (err) {
                res.sendStatus(403)
            } else {
                Admin_Token.find({ token }, function (errToken, dataToken) {
                    if (data.permission === "ADMIN") {
                        next();
                    } else {
                        res.sendStatus(403)
                    }
                })
            }
        })
    });
}

module.exports = { authenToken };