const cloudinaryAdminRouter = require("./cloudinary");



function AdminRouter(app) {
    app.use("/admin/cloudinary", cloudinaryAdminRouter);
}

module.exports = AdminRouter;