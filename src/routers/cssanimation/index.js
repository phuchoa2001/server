
const CategoryRouter = require("./category");
const AppRouter = require("./app");

const PublicRouter = require("./public");



function CssAnimationRouter(app) {
    app.use("/css/category", CategoryRouter);
    app.use("/css/app", AppRouter);
    app.use("/public/css", PublicRouter);
}

module.exports = CssAnimationRouter;