const ImageAdminRouter = require("./image");
const AppAdminRouter = require("./app");



function AdminRouter(app) {
    app.use("/admin/image", ImageAdminRouter);
    app.use("/admin/app", AppAdminRouter);
}

module.exports = AdminRouter;