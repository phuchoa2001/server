const exprees = require("express");
const router = exprees.Router();

const PublicControllersAdmin = require("../../app/controllers/admin/PublicControllers")

router.get("/total", PublicControllersAdmin.total);
router.get("/public/app", PublicControllersAdmin.Getapp);
module.exports = router;
