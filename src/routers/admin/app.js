const exprees = require("express");
const router = exprees.Router();
const AppcontrollersAdmin = require("../../app/controllers/admin/Appcontrollers");

router.get("/", AppcontrollersAdmin.getAll);
module.exports = router;
