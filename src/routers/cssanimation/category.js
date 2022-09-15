const exprees = require("express");
const router = exprees.Router();
const CssCategory = require("../../app/controllers/cssanimation/Categorycontrollers");

router.get("/", CssCategory.getAll);
router.get("/:id", CssCategory.getId);
router.post('/', CssCategory.upload);
router.patch('/:id', CssCategory.edit);
router.delete('/', CssCategory.delete);
module.exports = router;
