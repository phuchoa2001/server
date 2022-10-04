const Admin_cv = require("../models/admin/cv");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action")

class Cvcontrollers {
    getAll(req, res) {
        GetList(Admin_cv, res, req, "name", "name");
    }
    getId(req, res) {
        GetId(Admin_cv, res, req, { _id: req.params.id });
    }
    async upload(req, res) {
        Upload(Admin_cv, res, req, req.body, {
            name: "Admin",
            desc: "Đã thêm một cv"
        });
    }
    async edit(req, res) {
        Edit(Admin_cv, res, req, req.body, {
            name: "Admin",
            desc: "Đã sửa một cv"
        })
    }
    async delete(req, res) {
        Delete(Admin_cv, res, req, {
            name: "Admin",
            desc: `đã xóa ${req.body.ids.length} cv`
        });
    }
}
module.exports = new Cvcontrollers();