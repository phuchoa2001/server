const Admin_App = require("../models/admin/App");
const Admin_Image = require("../models/admin/image");
const Admin_Category = require("../models/admin/category");
const { GetSortOffer, GetSortClick, GetSortHot, GetSortNormal } = require("../../../common/Mogdb/AppSort");

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
    console.log("req.body" , req.body);
    if (req.body.sort === "sort") {
      console.log("ss1")
      GetSortOffer(Admin_App, req, res, "name", "name");
      return;
    }
    if (req.body.sort === "click") {
      console.log("ss2")
      GetSortClick(Admin_App, req, res, "name", "name");
      return;
    }
    if (req.body.sort === "hot") {
      console.log("ss3")
      GetSortHot(Admin_App, req, res, "name", "name");
      return;
    } else {
      console.log("ss")
      GetSortNormal(Admin_App, req, res, "name", "name");
    }
  }
}
module.exports = new PublicControllers();