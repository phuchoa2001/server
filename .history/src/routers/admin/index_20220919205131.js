const jwt = require('jsonwebtoken');

const ImageAdminRouter = require("./image");
const AppAdminRouter = require("./app");
const IconAdminRouter = require("./icon");
const CategoryRouter = require("./category");
const NotificationRouter = require("./notification");
const PublicRouter = require("./public");

const { CheckLogin, AddToken, DeleteToken } = require("../../common/Mogdb/Login");
const { authenToken } = require("../../common/Mogdb/authenToken")
const Admin_login = require("../../app/controllers/models/admin/login");




function AdminRouter(app) {
    app.use("/admin/image", ImageAdminRouter);
    app.use("/admin/icon", IconAdminRouter);
    app.use("/admin/app", AppAdminRouter);
    app.use("/admin/category", CategoryRouter);
    app.use("/admin/notification", NotificationRouter);
    app.use("/public", PublicRouter);
    app.post('/admin/profile', (req, res) => {
        const authorizationHeader = req.headers['authorization'];
        // 'Beaer [token]'
        const token = authorizationHeader.split(' ')[1];
        if (!token) res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            const { username, password } = data;
            if (err) res.sendStatus(403);
            Admin_login.findOne({ username, password }, function (err, data) {
                if (err) {
                    res.sendStatus(403)
                } else {
                    res.json(data)
                }
            })
        });
    });
    app.post('/admin/login', CheckLogin, (req, res) => {
        const data = req.body;
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
        AddToken(accessToken).then(_ => {
            res.json({ accessToken });
        })
    });
    app.post('/admin/verify_token', (req, res) => {
        const token = req.body.token;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                res.sendStatus(403)
                return;
            } else {
                const { username, password } = data;
                if (err) res.sendStatus(403);
                Admin_login.findOne({ username, password }, function (err, data) {
                    if (err) {
                        res.sendStatus(403)
                    } else {
                        res.json(data)
                    }
                })
            }
        })
    });
    app.post('/admin/logout', (req, res) => {
        const token = req.body.token;
        DeleteToken(token).then(_ => {
            res.sendStatus(200);
        })
    });
}

module.exports = AdminRouter;