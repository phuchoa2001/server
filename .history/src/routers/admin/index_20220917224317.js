const jwt = require('jsonwebtoken');

const ImageAdminRouter = require("./image");
const AppAdminRouter = require("./app");
const IconAdminRouter = require("./icon");
const CategoryRouter = require("./category");
const NotificationRouter = require("./notification");
const PublicRouter = require("./public");

const { CheckLogin, AddToken, DeleteToken } = require("../../common/Mogdb/Login");

let refreshTokens = [];


function AdminRouter(app) {
    app.use("/admin/image", ImageAdminRouter);
    app.use("/admin/icon", IconAdminRouter);
    app.use("/admin/app", AppAdminRouter);
    app.use("/admin/category", CategoryRouter);
    app.use("/admin/notification", NotificationRouter);
    app.use("/public", PublicRouter);
    app.post('/admin/login', CheckLogin, (req, res) => {
        const data = req.body;
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
        AddToken(accessToken).then(_ => {
            res.json({ accessToken });
        })
    });
    app.post('/admin/logout', (req, res) => {
        const refreshToken = req.body.token;
        DeleteToken(refreshToken).then(_ => {
            res.sendStatus(200);
        })
    });
}

module.exports = AdminRouter;