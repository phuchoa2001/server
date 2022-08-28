const LoginRouter = require("./login");
const ProfileRouter = require("./profile");
const PostRouter = require("./post");
const XoaNenRouter = require("./xoanen");
const BlogRouter = require("./blog");
const cloudinaryRouter = require("./cloudinary");
const MypictureRouter = require('./mypicture');
const SchoolRouter = require('./schools');
const AdminRouter = require("./admin")

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
  app.use("/schools", SchoolRouter);
  app.use("/login", LoginRouter);
  app.use("/blog", BlogRouter);
  app.use("/profile", ProfileRouter);
  app.use("/post", PostRouter);
  app.use("/xoanen", XoaNenRouter);
  app.use("/cloudinary", cloudinaryRouter);
  AdminRouter(app);
}

module.exports = route;
