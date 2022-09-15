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
    console.log("req.body.ids", req.body.ids)
    Admin_icon.find({ _id: { "$in": req.body.ids } }, async function (err, data) {
      if (err) {
        res.json({ message: err })
      } else {
        data.map(async (item, index) => {
          cloudinary.uploader.destroy(item.public_id, async function (err, result) {
            Admin_icon.deleteOne({ public_id: item.public_id }).then(
              _i => {
                console.log(index + 1);
                if (index + 1 === data.length) {
                  res.json({ messger: `đã xóa ${data.length} ảnh Thành công` });
                }
              }
            );
          });
        })
      }
      res.json({ messger: data })
    })
  }
}
module.exports = new Imagecontrollers();