const exprees = require("express");
const router = exprees.Router();
const AppcontrollersAdmin = require("../../app/controllers/admin/Appcontrollers");

const { authenToken, authenTokenClient } = require("../../common/Mogdb/authenToken");

router.get("/", authenTokenClient, AppcontrollersAdmin.getAll);
router.get("/:id", authenTokenClient, AppcontrollersAdmin.getId);
router.post('/', authenToken, AppcontrollersAdmin.upload);
router.patch('/:id', authenToken, AppcontrollersAdmin.edit);
router.delete('/', authenToken, AppcontrollersAdmin.delete);
module.exports = router;
