const ImageAdminRouter = require("./image");
const AppAdminRouter = require("./app");



function AdminRouter(app) {
    app.use("/admin/image", AppAdminRouter);
}

module.exports = AdminRouter;