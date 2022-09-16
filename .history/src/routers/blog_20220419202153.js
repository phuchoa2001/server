const exprees = require("express");
const router = exprees.Router();
const upload = require("../middleware-Multer/index");
const Blog = require("../app/controllers/Blogcontrollers");
router.get("/list", Blog.list);
router.get("/gettag", Blog.gettag);
router.post("/add", upload.single("avatar"), Blog.add);
router.put("/edit", upload.single("avatar"), Blog.edit);
router.delete("/delete", Blog.delete);
router.get("/getpost", Blog.getpost);
router.get("/search", Blog.search);
module.exports = router;