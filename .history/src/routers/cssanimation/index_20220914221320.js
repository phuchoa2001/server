
const CategoryRouter = require("./category");



function CssAnimationRouter(app) {
    app.use("/css/category", CategoryRouter);
    app.use("/css/app", CategoryRouter);
}

module.exports = CssAnimationRouter;