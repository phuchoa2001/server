const LoginRouter = require("./login");
const ProfileRouter = require("./profile");
const PostRouter = require("./post");
const XoaNenRouter = require("./xoanen");
const BlogRouter = require("./blog");
const cloudinaryRouter = require("./cloudinary");
const MypictureRouter = require('./mypicture');
const AdminRouter = require("./admin/index");
const SchoolRouter = require('./schools');
console.log("LoginRouter" , LoginRouter);
console.log("AdminRouter" , AdminRouter);
function route(app) {
  app.get("/", (req, res) => {
    req.query.app ? res.redirect(`app/${req.query.app}`) : res.render("home");
  });
  app.get("/app/baothuc", (req, res) => {
    res.render("congviec");
  });
  app.get("/app/quayvideoonline", (req, res) => {
    res.render("quayvideo");
  });
  app.use("/mypicture", MypictureRouter);
  app.use("/admin", AdminRouter);
  app.use("/schools", SchoolRouter);
  app.use("/login", LoginRouter);
  app.use("/blog", BlogRouter);
  app.use("/profile", ProfileRouter);
  app.use("/post", PostRouter);
  app.use("/xoanen", XoaNenRouter);
  app.use("/cloudinary", cloudinaryRouter);
}
console.log("route" , route)
module.exports = route;
