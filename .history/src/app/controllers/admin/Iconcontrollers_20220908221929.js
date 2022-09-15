const path = require("path");
var cloudinary = require("cloudinary").v2;

const Admin_icon = require("../models/admin/icon");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class Imagecontrollers {
  getAll(req, res) {
    GetList(Admin_icon, res, req);
  }
  getId(req, res) {
    GetId(Admin_icon, res, req, { _id: req.params.id });
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
          const post = new Admin_icon(module_obj);
          await post.save();
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
          res.json({ messger: `đã xóa ${DeleteArr.length} ảnh Thành công` });
        })
      }
    }
module.exports = new Imagecontrollers();