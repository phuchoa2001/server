const Admin_App = require("../models/admin/App");
const Admin_Image = require("../models/admin/image");
const Admin_Category = require("../models/admin/category");

class PublicControllers {
  async total(req, res) {
    await Admin_App.countDocuments().then(async (count_documents_App) => {
      await Admin_Image.countDocuments().then(async (count_documents_Image) => {
        await Admin_Category.countDocuments().then(async (count_documents_Category) => {
          res.json(
            [
              {
                name: "app",
                total: count_documents_App
              },
              {
                name: "image",
                total: count_documents_Image
              },
              {
                name: "category",
                total: count_documents_Category
              },
            ])
        }
    }
  }
}
module.exports = new PublicControllers();