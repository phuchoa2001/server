const Admin_category = require("../models/admin/category");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action")

class Categorycontrollers {
  getAll(req, res) {
    GetList(Admin_category, res, req, "name", "name");
  }
  getId(req, res) {
    if(req.params.id) {
      GetId(Admin_category, res, req, { _id: req.params.id }); 
    }else {
      res.status(403);
    }
  }
  async upload(req, res) {
    Upload(Admin_category, res, req, req.body, {
      name: "Admin",
      desc: "Đã thêm một thể loại"
    });
  }
  async edit(req, res) {
    Edit(Admin_category, res, req, req.body, {
      name: "Admin",
      desc: "Đã sửa một thể loại"
    })
  }
  async delete(req, res) {
    Delete(Admin_category, res, req, {
      name: "Admin",
      desc: `đã xóa ${req.body.ids.length} thể loại`
    });
  }
}
module.exports = new Categorycontrollers();