const exprees = require('express');
const router = exprees.Router();
const upload = require("../middleware-Multer/index");
const Cloudinarycontrollers = require("../../src/app/controllers/Cloudinarycontrollers")
router.post('/'  , Cloudinarycontrollers.index)
router.post('/upload' , upload.single("image") , Cloudinarycontrollers.upload)
router.delete('/delete' , Cloudinarycontrollers.delete)
module.exports = router;