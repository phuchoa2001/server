const exprees = require("express");
const router = exprees.Router();
const CvcontrollersAdmin = require("../../app/controllers/admin/Cvcontrollers");
const { authenToken, authenTokenClient } = require("../../common/Mogdb/authenToken");

router.get("/", authenTokenClient, CvcontrollersAdmin.getAll);
router.get("/:id", authenTokenClient, CvcontrollersAdmin.getId);
router.post('/', authenToken,  CvcontrollersAdmin.upload);
router.patch('/:id', authenToken,  CvcontrollersAdmin.edit);
router.delete('/', authenToken, CvcontrollersAdmin.delete);
module.exports = router;
