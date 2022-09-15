const exprees = require("express");
const router = exprees.Router();
const upload = require("../../middleware-Multer/index");
const IconcontrollersAdmin = require("../../app/controllers/admin/Iconcontrollers");

router.get("/", IconcontrollersAdmin.getAll);
router.get("/:id", IconcontrollersAdmin.getId);
router.post('/', upload.single("image"), IconcontrollersAdmin.upload);
router.delete('/', IconcontrollersAdmin.delete);
module.exports = router;
