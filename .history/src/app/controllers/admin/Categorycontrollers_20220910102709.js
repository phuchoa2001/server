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
  async edit(req, res) {
    res.json({ message: "Method patch" })
  }
  async delete(req, res) {
    res.json({ message: "Method Delete" })
  }
}
module.exports = new Categorycontrollers();