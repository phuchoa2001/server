const cloudinaryAdminRouter = require("./cloudinary");



function AdminRouter(app) {
    app.use("/admin/cloudinary", cloudinaryAdminRouter);
}
export default AdminRouter;