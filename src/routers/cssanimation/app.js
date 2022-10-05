const exprees = require("express");
const router = exprees.Router();
const CssApp = require("../../app/controllers/cssanimation/Appcontrollers");

const { authenToken, authenTokenClient } = require("../../common/Mogdb/authenToken");

router.get("/", authenTokenClient, CssApp.getAll);
router.get("/:id", authenTokenClient, CssApp.getId);
router.post('/', authenToken, CssApp.upload);
router.patch('/:id', authenToken, CssApp.edit);
router.delete('/', authenToken, CssApp.delete);
module.exports = router;
