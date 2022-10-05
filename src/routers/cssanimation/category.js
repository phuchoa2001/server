const exprees = require("express");
const router = exprees.Router();
const CssCategory = require("../../app/controllers/cssanimation/Categorycontrollers");

const { authenToken, authenTokenClient } = require("../../common/Mogdb/authenToken");

router.get("/", authenTokenClient, CssCategory.getAll);
router.get("/:id", authenTokenClient, CssCategory.getId);
router.post('/', authenToken, CssCategory.upload);
router.patch('/:id', authenToken, CssCategory.edit);
router.delete('/', authenToken, CssCategory.delete);
module.exports = router;
