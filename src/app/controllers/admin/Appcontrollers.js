const Admin_App = require("../models/admin/App");
const Category_App = require("../models/admin/category");
const { GetFilterList, GetFilterId } = require("../../../common/Mogdb/GetFilterList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action");

const { increaseViews } = require("../../../common/Mogdb/increaseViews");

class Appcontrollers {
  getAll(req, res) {
    GetFilterList(Admin_App, res, req, "name", "name", ['image', 'icon', "category"]);
  }
  getId(req, res) {
    GetFilterId(Admin_App, res, req, { _id: req.params.id }, ['image', 'icon', "category"]);
  }
  async upload(req, res) {

    req.body.viewTotal = 0;
    Category_App.find({ _id: { $in: req.body.category } }, function (err, data) {
      if (!err) {
        const categoryString = data.reduce((currentIndex, currentValue) => currentIndex + "," + currentValue.name, "");
        req.body.categoryString = categoryString.slice(1, categoryString.length)
        Upload(Admin_App, res, req, req.body, {
          name: "Admin",
          desc: "Đã thêm một ứng dụng"
        });
      }
    })
  }
  async edit(req, res) {
    Category_App.find({ _id: { $in: req.body.category } }, function (err, data) {
      if (!err) {
        const categoryString = data.reduce((currentIndex, currentValue) => currentIndex + "," + currentValue.name, "");
        req.body.categoryString = categoryString.slice(1, categoryString.length)
        Edit(Admin_App, res, req, req.body, {
          name: "Admin",
          desc: "Đã sửa một ứng dụng"
        })
      }
    })
  }
  async delete(req, res) {
    Delete(Admin_App, res, req, {
      name: "Admin",
      desc: `đã xóa ${req.body.ids.length} ứng dụng`
    });
  }
  async UpView(req, res) {
    increaseViews(Admin_App, "viewTotal", req.params.id, req, res)
  }
  async random(req, res) {
    Admin_App.count().exec(function (err, count) {
      // Get a random entry
      var random = Math.floor(Math.random() * count)
      // Again query all users but only fetch one offset by our random #
      Admin_App.findOne().skip(random).exec(
        async function (err, result) {
          // Tada! random user
          await increaseViews(Admin_App, "viewTotal", result["_id"], req, res)
        })
    })
  }
}
module.exports = new Appcontrollers();