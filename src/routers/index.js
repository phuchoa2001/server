const LoginRouter = require("./login");
const ProfileRouter = require("./profile");
const PostRouter = require("./post");
const XoaNenRouter = require("./xoanen");
const BlogRouter = require("./blog");
const cloudinaryRouter = require("./cloudinary");
function route(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });
  app.get("/callback/app", (req, res) => {
      res.render("callback" , {app : req.query.app} )
  });
  app.get("/app/baothuc", (req, res) => {
    res.render("congviec");
  });
  app.get("/app/quayvideoonline", (req, res) => {
    res.render("quayvideo");
  });
  app.use("/login", LoginRouter);
  app.use("/blog", BlogRouter);
  app.use("/profile", ProfileRouter);
  app.use("/post", PostRouter);
  app.use("/xoanen", XoaNenRouter);
  app.use("/cloudinary", cloudinaryRouter);
}
module.exports = route;
