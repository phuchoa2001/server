const path = require("path");
var cloudinary = require("cloudinary").v2;

const Admin_image = require("../models/admin/image");
const { AddNotification } = require("../../../common/Mogdb/Notification");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class Imagecontrollers {
  getAll(req, res) {
    GetList(Admin_image, res, req, "public_id", "format");
  }
  getId(req, res) {
    GetId(Admin_image, res, req, { _id: req.params.id });
  }
  async upload(req, res) {
    const { name, url } = req.body;
    await cloudinary.uploader.upload(url, { public_id: name },
      async function (error, result) {
        if (result) {
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
          const post = new Admin_image(module_obj);
          await post.save();
          AddNotification(
             "Admin",
            "Đã thêm một 1 hình ảnh"
          )
          res.json({ payload: module_obj });
        } else {
          res.json({ payload: "error" });
        }
      }
    );
  }
  async delete(req, res) {
    Admin_image.find({ _id: { "$in": req.body.ids } }, async function (err, data) {
      const DeleteArr = data.reduce((initialValue, currentValue) => {
        return [...initialValue, currentValue.public_id]
      }, []);
      if (err) {
        res.json({ message: err })
      } else {
        Admin_image.deleteMany({ public_id: { "$in": DeleteArr } }).then(_i => {
          DeleteArr.map(async (item, index) => {
            cloudinary.uploader.destroy(item, async function (err, result) { });
          })
          AddNotification(
            "Admin",
            `đã xóa ${DeleteArr.length} hình ảnh`
          )
          res.json({ messger: `đã xóa ${DeleteArr.length} ảnh Thành công` });
        })
      }
    })
  }
}
module.exports = new Imagecontrollers();