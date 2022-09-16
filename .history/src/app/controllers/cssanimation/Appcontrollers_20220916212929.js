const Cssanimation_App = require("../models/cssanimation/app");
const { GetFilterList, GetFilterId } = require("../../../common/Mogdb/GetFilterList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action");

class Appcontrollers {
  getAll(req, res) {
    GetFilterList(Cssanimation_App, res, req, "title", "title", "category");
  }
  getId(req, res) {
    GetFilterId(Cssanimation_App, res, req, { _id: req.params.id }, "category");
  }
  async upload(req, res) {
    Upload(Cssanimation_App, res, req, req.body);
  }
  async edit(req, res) {
    Edit(Cssanimation_App, res, req, req.body)
  }
  async delete(req, res) {
    Delete(Cssanimation_App, res, req);
  }
}
module.exports = new Appcontrollers();