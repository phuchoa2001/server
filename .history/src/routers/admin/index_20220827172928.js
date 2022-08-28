const ImageAdminRouter = require("./image");



function AdminRouter(app) {
    app.use("/admin/image", ImageAdminRouter);
}

module.exports = AdminRouter;