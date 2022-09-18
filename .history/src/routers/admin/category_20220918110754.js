const exprees = require("express");
const router = exprees.Router();

const CategorycontrollersAdmin = require("../../app/controllers/admin/Categorycontrollers");
const { authenToken, authenTokenClient } = require("../../common/Mogdb/authenToken")


router.get("/", authenTokenClient, CategorycontrollersAdmin.getAll);
router.get("/:id", authenTokenClient, CategorycontrollersAdmin.getId);
router.post('/', authenToken, CategorycontrollersAdmin.upload);
router.patch('/:id', authenToken, CategorycontrollersAdmin.edit);
router.delete('/', authenToken, CategorycontrollersAdmin.delete);
module.exports = router;
