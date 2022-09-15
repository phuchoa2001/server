const Admin_App = require("../models/admin/app");
const { GetFilterList, GetFilterId } = require("../../../common/Mogdb/GetFilterList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action");
const Admin_Category = require("../models/admin/category");
const Admin_Image = require("../models/admin/image");
const Admin_Icon = require("../models/admin/icon");

class Appcontrollers {
  getAll(req, res) {
    GetFilterList(Admin_App, res, req, "name", "name");
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