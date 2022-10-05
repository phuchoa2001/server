const Cssanimation_App = require("../models/cssanimation/app");
const Cssanimation_category = require("../models/cssanimation/category");
const { GetFilterList, GetFilterId } = require("../../../common/Mogdb/GetFilterList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action");

class Appcontrollers {
  getAll(req, res) {
    GetFilterList(Cssanimation_App, res, req, "title", "categoryString", "category");
  }
  getId(req, res) {
    GetFilterId(Cssanimation_App, res, req, { _id: req.params.id }, "category");
  }
  async upload(req, res) {
    Cssanimation_category.find({ _id: { $in: req.body.category } }, function (err, data) {
      if (!err) {
        const categoryString = data.reduce((currentIndex, currentValue) => currentIndex + "," + currentValue.name, "");
        req.body.categoryString = categoryString.slice(1, categoryString.length)
        Upload(Cssanimation_App, res, req, req.body);
      }
    })
  }
  async edit(req, res) {
    Cssanimation_category.find({ _id: { $in: req.body.category } }, function (err, data) {
      if (!err) {
        const categoryString = data.reduce((currentIndex, currentValue) => currentIndex + "," + currentValue.name, "");
        req.body.categoryString = categoryString.slice(1, categoryString.length)
        Edit(Cssanimation_App, res, req, req.body)
      }
    })
  }
  async delete(req, res) {
    Delete(Cssanimation_App, res, req);
  }
}
module.exports = new Appcontrollers();