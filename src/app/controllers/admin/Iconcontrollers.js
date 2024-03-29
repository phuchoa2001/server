const path = require("path");
var cloudinary = require("cloudinary").v2;

const Admin_icon = require("../models/admin/icon");
const { AddNotification } = require("../../../common/Mogdb/Notification");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class Imagecontrollers {
  getAll(req, res) {
    GetList(Admin_icon, res, req, "public_id", "format");
  }
  getId(req, res) {
    if(req.params.id){
      GetId(Admin_icon, res, req, { _id: req.params.id });
    }
  }
  async upload(req, res) {
    const { name, url } = req.body;
    await cloudinary.uploader.upload(url,
      { public_id: name },
      async function (error, result) {
        if (error) {
          res.json({ payload: error });
        } else {
          const module_obj = {
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            url: result.url,
          };

          req.body = {
            ...req.body,
            ...module_obj
          }

          const post = new Admin_icon(module_obj);
          await post.save();
          AddNotification(
            "Admin",
            "Đã thêm một 1 biểu tượng"
          )
          res.json({ payload: module_obj });
        }
      }
    );
  }
  async delete(req, res) {
    Admin_icon.find({ _id: { "$in": req.body.ids } }, async function (err, data) {
      const DeleteArr = data.reduce((initialValue, currentValue) => {
        return [...initialValue, currentValue.public_id]
      }, []);
      if (err) {
        res.json({ message: err })
      } else {
        Admin_icon.deleteMany({ public_id: { "$in": DeleteArr } }).then(_i => {
          DeleteArr.map(async (item, index) => {
            cloudinary.uploader.destroy(item, async function (err, result) { });
          })
          AddNotification(
            "Admin",
            `đã xóa ${DeleteArr.length} biểu tượng`
          )
          res.json({ messger: `đã xóa ${DeleteArr.length} biểu tượng Thành công` });
        })
      }
    })
  }
}
module.exports = new Imagecontrollers();