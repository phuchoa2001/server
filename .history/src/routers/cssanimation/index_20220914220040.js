
const CategoryRouter = require("./category");



function CssAnimationRouter(app) {
    app.use("/css/category", CategoryRouter);
}

module.exports = CssAnimationRouter;