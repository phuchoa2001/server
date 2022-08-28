const cloudinaryAdminRouter = require("./cloudinary");



export default function AdminRouter(app) {
    app.use("/admin/cloudinary", cloudinaryAdminRouter);
}