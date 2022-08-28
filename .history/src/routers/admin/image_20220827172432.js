const exprees = require("express");
const router = exprees.Router();
const CloudinarycontrollersAdmin = require("../../app/controllers/admin/Cloudinarycontrollers");

router.get("/", CloudinarycontrollersAdmin.index);
module.exports = router;
