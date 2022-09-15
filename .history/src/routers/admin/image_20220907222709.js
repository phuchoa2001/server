const exprees = require("express");
const router = exprees.Router();
const upload = require("../../middleware-Multer/index");
const ImagecontrollersAdmin = require("../../app/controllers/admin/Imagecontrollers");

router.get("/", ImagecontrollersAdmin.getAll);
router.get("/:id", ImagecontrollersAdmin.getId);
router.post('/', upload.single("image"), ImagecontrollersAdmin.upload);
router.delete('/:id', ImagecontrollersAdmin.delete);
module.exports = router;
