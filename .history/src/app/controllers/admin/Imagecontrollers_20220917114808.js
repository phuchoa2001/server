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
    await cloudinary.uploader.upload(
      `${path.join(__dirname, `../../../public/upload`)}${"\\" + req.file.filename
      }`,
      { public_id: req.file.filename },
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
          const post = new Admin_image(module_obj);
          await post.save();
          AddNotification({
            name: "Admin",
            desc: "Đã thêm một 1 hình ảnh"
          })
          res.json({ payload: module_obj });
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
          AddNotification({
            name: "Admin",
            desc: `đã xóa ${DeleteArr.length} hình ảnh`
          })
          res.json({ messger: `đã xóa ${DeleteArr.length} ảnh Thành công` });
        })
      }
    })
  }
}
module.exports = new Imagecontrollers();