
const CategoryRouter = require("./category");
const AppRouter = require("./app");



function CssAnimationRouter(app) {
    app.use("/css/category", CategoryRouter);
    app.use("/css/app", AppRouter);
}

module.exports = CssAnimationRouter;