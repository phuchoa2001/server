const exprees = require("express");
const router = exprees.Router();
const Csscontrollers = require("../../app/controllers/cssanimation/Categorycontrollers");

router.get("/", Csscontrollers.getAll);
router.get("/:id", Csscontrollers.getId);
router.post('/', Csscontrollers.upload);
router.patch('/:id', Csscontrollers.edit);
router.delete('/', Csscontrollers.delete);
module.exports = router;
