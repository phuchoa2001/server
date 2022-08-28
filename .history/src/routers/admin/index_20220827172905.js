const cloudinaryAdminRouter = require("./cloudinary");



function AdminRouter(app) {
    app.use("/admin/image", cloudinaryAdminRouter);
}

module.exports = AdminRouter;