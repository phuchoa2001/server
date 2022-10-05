const exprees = require("express");
const router = exprees.Router();

const PublicControllersCss = require("../../app/controllers/cssanimation/PublicControllers");
const CategoryControllerCss = require("../../app/controllers/cssanimation/Categorycontrollers");
const AppControllerCss = require("../../app/controllers/cssanimation/Appcontrollers");

router.get("/total", PublicControllersCss.total);
router.get("/app", AppControllerCss.getAll);
router.get("/category", CategoryControllerCss.getAll);
module.exports = router;
