const exprees = require("express");
const router = exprees.Router();
const NotificationcontrollercAdmin = require("../../app/controllers/admin/Notificationcontrollers");

router.get("/", NotificationcontrollercAdmin.getAll);
router.get("/:id", NotificationcontrollercAdmin.getId);
router.post('/', NotificationcontrollercAdmin.upload);
router.patch('/:id', NotificationcontrollercAdmin.edit);
router.delete('/', NotificationcontrollercAdmin.delete);
module.exports = router;
