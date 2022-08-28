const exprees = require("express");
const router = exprees.Router();
const CloudinarycontrollersAdmin = require("../../app/controllers/admin/Cloudinarycontrollers");

console.log("CloudinarycontrollersAdmin" , CloudinarycontrollersAdmin)

router.get("/cloudinary", CloudinarycontrollersAdmin.index);
module.exports = router;
