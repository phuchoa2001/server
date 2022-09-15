const Cssanimation_category = require("../models/cssanimation/category");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action")

class Categorycontrollers {
  getAll(req, res) {
    GetList(Cssanimation_category, res, req, "title", "title");
  }
  getId(req, res) {
    GetId(Cssanimation_category, res, req, { _id: req.params.id });
  }
  async upload(req, res) {
    Upload(Cssanimation_category, res, req, req.body);
  }
  async edit(req, res) {
    Edit(Cssanimation_category, res, req, req.body)
  }
  async delete(req, res) {
    Delete(Cssanimation_category, res, req);
  }
}
module.exports = new Categorycontrollers();