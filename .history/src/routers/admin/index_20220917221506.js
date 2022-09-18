const jwt = require('jsonwebtoken');

const ImageAdminRouter = require("./image");
const AppAdminRouter = require("./app");
const IconAdminRouter = require("./icon");
const CategoryRouter = require("./category");
const NotificationRouter = require("./notification");
const PublicRouter = require("./public");

const Admin_login = require("../../app/controllers/models/admin/login")

let refreshTokens = [];


function AdminRouter(app) {
    app.use("/admin/image", ImageAdminRouter);
    app.use("/admin/icon", IconAdminRouter);
    app.use("/admin/app", AppAdminRouter);
    app.use("/admin/category", CategoryRouter);
    app.use("/admin/notification", NotificationRouter);
    app.use("/public", PublicRouter);
    app.post('/admin/refreshToken', (req, res) => {
        const refreshToken = req.body.token;
        if (!refreshToken) res.sendStatus(401);
        if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) res.sendStatus(403);
            const accessToken = jwt.sign(
                { username: data.username },
                process.env.ACCESS_TOKEN_SECRET,
            );
            res.json({ accessToken });
        });
    });
    app.post('/admin/account', async (req, res) => {
        const module_obj = {
            username: "client",
            password: "client",
            permission: "CLIENT"
        }
        const post = new Admin_login(module_obj);
        await post.save();
    });
    app.post('/admin/login', (req, res) => {
        const data = req.body;
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
        refreshTokens.push(accessToken);
        res.json({ accessToken });
    });
    app.post('/admin/logout', (req, res) => {
        const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
        res.sendStatus(200);
    });
}

module.exports = AdminRouter;