const Cssanimation_Category = require("../models/cssanimation/category");
const Cssanimation_App = require("../models/cssanimation/app");

class PublicControllers {
  async total(req, res) {
    await Cssanimation_App.countDocuments().then(async (count_documents_App) => {
      await Cssanimation_Category.countDocuments().then(async (count_documents_Category) => {
        res.json(
          [
            {
              name: "app",
              total: count_documents_App
            },
            {
              name: "app",
              total: count_documents_App
            },
            {
              name: "category",
              total: count_documents_Category
            },
          ])
      })
    })
  }
}
module.exports = new PublicControllers();