const exprees = require("express");
const router = exprees.Router();
const CategorycontrollersAdmin = require("../../app/controllers/admin/Categorycontrollers");

router.get("/", CategorycontrollersAdmin.getAll);
router.get("/:id", CategorycontrollersAdmin.getId);
router.post('/', CategorycontrollersAdmin.upload);
router.patch('/:id', CategorycontrollersAdmin.upload);
router.delete('/', CategorycontrollersAdmin.delete);
module.exports = router;
