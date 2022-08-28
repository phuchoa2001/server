const exprees = require("express");
const router = exprees.Router();
const ImagecontrollersAdmin = require("../../app/controllers/admin/Imagecontrollers");

router.get("/", ImagecontrollersAdmin.index);
router.post('/', upload.single("image"), ImagecontrollersAdmin.upload);
module.exports = router;
