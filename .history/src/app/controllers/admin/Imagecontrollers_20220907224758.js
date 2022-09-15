const path = require("path");
var cloudinary = require("cloudinary").v2;

const Admin_image = require("../models/admin/image");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class Imagecontrollers {
  getAll(req, res) {
    GetList(Admin_image, res, req);
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
          res.json({ payload: module_obj });
        }
      }
    );
  }
  async delete(req, res) {
    req.body.ids.map(item => {
      console.log(item)
    })
    res.json({message : req.body})
    // cloudinary.uploader.destroy(req.params.id, function (err, result) {
    //   Admin_image.deleteOne({ public_id: req.params.id }).then();
    //   res.json({ messger: `đã xóa ảnh ${req.params.id}` });
    // });

  }
}
module.exports = new Imagecontrollers();