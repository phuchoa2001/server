const exprees = require("express");
const router = exprees.Router();

const PublicControllersAdmin = require("../../app/controllers/admin/PublicControllers")

router.get("/total", PublicControllersAdmin.total);
router.post("/app", PublicControllersAdmin.Getapp);
module.exports = router;
