const ImageAdminRouter = require("./image");
const AppAdminRouter = require("./app");
const IconAdminRouter = require("./icon");
const CategoryRouter = require("./category");
const NotificationRouter = require("./notification");



function AdminRouter(app) {
    app.use("/admin/image", ImageAdminRouter);
    app.use("/admin/icon", IconAdminRouter);
    app.use("/admin/app", AppAdminRouter);
    app.use("/admin/category", CategoryRouter);
    app.use("/admin/category", NotificationRouter);
}

module.exports = AdminRouter;