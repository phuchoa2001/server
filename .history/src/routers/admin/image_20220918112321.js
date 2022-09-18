const exprees = require("express");
const router = exprees.Router();
const upload = require("../../middleware-Multer/index");
const ImagecontrollersAdmin = require("../../app/controllers/admin/Imagecontrollers");

const { authenToken, authenTokenClient } = require("../../common/Mogdb/authenToken");

router.get("/", authenTokenClient, ImagecontrollersAdmin.getAll);
router.get("/:id", authenTokenClient, ImagecontrollersAdmin.getId);
router.post('/', authenToken, upload.single("image"), ImagecontrollersAdmin.upload);
router.delete('/', authenToken, ImagecontrollersAdmin.delete);
module.exports = router;
