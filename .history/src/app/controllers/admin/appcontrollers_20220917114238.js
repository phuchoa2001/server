const Admin_App = require("../models/admin/App");
const { GetFilterList, GetFilterId } = require("../../../common/Mogdb/GetFilterList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action");

class Appcontrollers {
  getAll(req, res) {
    GetFilterList(Admin_App, res, req, "name", "name", ['image', 'icon', "category"]);
  }
  getId(req, res) {
    GetFilterId(Admin_App, res, req, { _id: req.params.id }, ['image', 'icon', "category"]);
  }
  async upload(req, res) {
    Upload(Admin_App, res, req, req.body, {
      name: "Admin",
      desc: "Đã thêm một ứng dụng"
    });
  }
  async edit(req, res) {
    Edit(Admin_App, res, req, req.body, {
      name: "Admin",
      desc: "Đã sửa một thể loại"
    })
  }
  async delete(req, res) {
    Delete(Admin_App, res, req, {
      name: "Admin",
      desc: `đã xóa ${req.body.ids.length} thể loại`
    });
  }
}
module.exports = new Appcontrollers();