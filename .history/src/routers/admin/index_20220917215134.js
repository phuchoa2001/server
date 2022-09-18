import jwt from 'jsonwebtoken';

const ImageAdminRouter = require("./image");
const AppAdminRouter = require("./app");
const IconAdminRouter = require("./icon");
const CategoryRouter = require("./category");
const NotificationRouter = require("./notification");
const PublicRouter = require("./public");



function AdminRouter(app) {
    app.use("/admin/image", ImageAdminRouter);
    app.use("/admin/icon", IconAdminRouter);
    app.use("/admin/app", AppAdminRouter);
    app.use("/admin/category", CategoryRouter);
    app.use("/admin/notification", NotificationRouter);
    app.use("/public", PublicRouter);
    app.post('/admin/login', (req, res) => {
        const data = req.body;
        console.log({ data });
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s',
        });
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({ accessToken, refreshToken });
    });

    app.post('/admin/logout', (req, res) => {
        const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
        res.sendStatus(200);
    });
}

module.exports = AdminRouter;