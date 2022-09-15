const Admin_categoryCssAnimation = require("../models/admin/categoryCssAnimation ");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action");


class Categorycontrollers {
  getAll(req, res) {
    GetList(Admin_categoryCssAnimation, res, req, "name", "name");
  }
  getId(req, res) {
    GetId(Admin_categoryCssAnimation, res, req, { _id: req.params.id });
  }
  async upload(req, res) {
    Upload(Admin_categoryCssAnimation, res, req, req.body);
  }
  async edit(req, res) {
    Edit(Admin_categoryCssAnimation, res, req, req.body)
  }
  async delete(req, res) {
    Delete(Admin_categoryCssAnimation, res, req);
  }
}
module.exports = new Categorycontrollers();