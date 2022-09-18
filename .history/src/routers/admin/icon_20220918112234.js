const exprees = require("express");
const router = exprees.Router();
const upload = require("../../middleware-Multer/index");
const IconcontrollersAdmin = require("../../app/controllers/admin/Iconcontrollers");
const { authenToken, authenTokenClient } = require("../../common/Mogdb/authenToken");

router.get("/", authenTokenClient, IconcontrollersAdmin.getAll);
router.get("/:id", authenTokenClient, IconcontrollersAdmin.getId);
router.post('/', authenToken, upload.single("image"), IconcontrollersAdmin.upload);
router.delete('/', authenToken, IconcontrollersAdmin.delete);
module.exports = router;
