const exprees = require("express");
const router = exprees.Router();
const upload = require("../../middleware-Multer/index");
const IIconcontrollersAdmin = require("../../app/controllers/admin/Iconcontrollers");

router.get("/", IIconcontrollersAdmin.getAll);
router.get("/:id", IIconcontrollersAdmin.getId);
router.post('/', upload.single("image"), IIconcontrollersAdmin.upload);
router.delete('/', IIconcontrollersAdmin.delete);
module.exports = router;
