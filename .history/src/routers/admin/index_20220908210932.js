const ImageAdminRouter = require("./image");
const AppAdminRouter = require("./app");
const IconAdminRouter = require("./icon");



function AdminRouter(app) {
    app.use("/admin/image", ImageAdminRouter);
    pp.use("/admin/icon", IconAdminRouter);
    app.use("/admin/app", AppAdminRouter);
}

module.exports = AdminRouter;