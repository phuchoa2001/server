const exprees = require("express");
const router = exprees.Router();
const Mypicture = require("../app/controllers/Mypicturecontrollers");
router.get("/", Mypicture.get);
router.post("/", Mypicture.add);
router.put("/", Mypicture.edit);
router.delete("/", Mypicture.delete);
router.get("/search", Mypicture.search);
router.get("/image/:id", Mypicture.getimage);
module.exports = router;
