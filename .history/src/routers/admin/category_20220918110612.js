const exprees = require("express");
const router = exprees.Router();

const CategorycontrollersAdmin = require("../../app/controllers/admin/Categorycontrollers");
const { authenToken } = require("../../common/Mogdb/authenToken")


router.get("/", authenToken, CategorycontrollersAdmin.getAll);
router.get("/:id", CategorycontrollersAdmin.getId);
router.post('/', CategorycontrollersAdmin.upload);
router.patch('/:id', CategorycontrollersAdmin.edit);
router.delete('/', CategorycontrollersAdmin.delete);
module.exports = router;
