const Admin_notification = require("../models/admin/notification");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")
const { Upload, Edit, Delete } = require("../../../common/Mogdb/Action")

class Notificationcontrollers {
    getAll(req, res) {
        GetList(Admin_notification, res, req, "name", "desc");
    }
    getId(req, res) {
        GetId(Admin_notification, res, req, { _id: req.params.id });
    }
    async upload(req, res) {
        Upload(Admin_notification, res, req, req.body);
    }
    async edit(req, res) {
        Edit(Admin_notification, res, req, req.body)
    }
    async delete(req, res) {
        Delete(Admin_notification, res, req);
    }
}
module.exports = new Notificationcontrollers();