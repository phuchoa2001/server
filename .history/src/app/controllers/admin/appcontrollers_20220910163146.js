const Admin_App = require("../models/admin/app");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action")

class Appcontrollers {
  getAll(req, res) {
    GetList(Admin_App, res, req, "name", "name");
  }
  getId(req, res) {
    GetId(Admin_App, res, req, { _id: req.params.id });
  }
  async upload(req, res) {
    Upload(Admin_App, res, req, req.body);
  }
  async edit(req, res) {
    Edit(Admin_App, res, req, req.body)
  }
  async delete(req, res) {
    Delete(Admin_App, res, req);
  }
}
module.exports = new Appcontrollers();