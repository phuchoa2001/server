const exprees = require("express");
const router = exprees.Router();
const AppcontrollersAdmin = require("../../app/controllers/admin/Appcontrollers");

router.get("/", AppcontrollersAdmin.getAll);
router.get("/:id", AppcontrollersAdmin.getId);
router.post('/', AppcontrollersAdmin.upload);
router.patch('/:id', AppcontrollersAdmin.edit);
router.delete('/', AppcontrollersAdmin.delete);
module.exports = router;
