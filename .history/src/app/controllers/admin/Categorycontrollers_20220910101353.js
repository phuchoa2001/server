const Admin_category = require("../models/admin/category");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")
const { Upload } = require("../../../common/Mogdb/Action")

class Categorycontrollers {
  getAll(req, res) {
    GetList(Admin_category, res, req, "name", "name");
  }
  getId(req, res) {
    GetId(Admin_category, res, req, { _id: req.params.id });
  }
  async upload(req, res) {
    Upload(Admin_category, req, res, req.body);
  }
}
module.exports = new Categorycontrollers();