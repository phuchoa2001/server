const Admin_App = require("../models/admin/App");
const Admin_Image = require("../models/admin/image");
const Admin_Category = require("../models/admin/category");
const GetSortOffer = require("../../../common/Mogdb/AppSort");

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
        })
      })
    })
  }
  async Getapp(req, res) {
    if (req.query.sort === "offer") {
      GetSortOffer(Admin_App, req, res);
    }
  }
}
module.exports = new PublicControllers();