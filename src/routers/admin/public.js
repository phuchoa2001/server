const exprees = require("express");
const router = exprees.Router();

const PublicControllersAdmin = require("../../app/controllers/admin/PublicControllers");
const CategoryControllerAdmin = require("../../app/controllers/admin/Categorycontrollers")

router.get("/total", PublicControllersAdmin.total);
router.post("/app", PublicControllersAdmin.Getapp);
router.get("/category", CategoryControllerAdmin.getAll);
module.exports = router;
