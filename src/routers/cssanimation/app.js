const exprees = require("express");
const router = exprees.Router();
const CssApp = require("../../app/controllers/cssanimation/Appcontrollers");

router.get("/", CssApp.getAll);
router.get("/:id", CssApp.getId);
router.post('/', CssApp.upload);
router.patch('/:id', CssApp.edit);
router.delete('/', CssApp.delete);
module.exports = router;
