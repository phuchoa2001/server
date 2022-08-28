const exprees = require("express");
const router = exprees.Router();
const upload = require("../../middleware-Multer/index");
const ImagecontrollersAdmin = require("../../app/controllers/admin/Imagecontrollers");

router.get("/", ImagecontrollersAdmin.index);
router.post('/', upload.single("image"), ImagecontrollersAdmin.upload);
module.exports = router;
