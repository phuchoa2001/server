const path = require("path");
var cloudinary = require("cloudinary").v2;

const Admin_image = require("../models/admin/image");
const { GetList, GetId } = require("../../../common/Mogdb/GetList")

cloudinary.config({
  cloud_name: "xoanen1202",
  api_key: "946299658741956",
  api_secret: "viUU_7QS_9qRa9rIf9k9Ap70j8M",
});

class Imagecontrollers {
  getAll(req, res) {
    GetList(Admin_image, res, req);
  }
  getId(req, res) {
    console.log(req.params.id)
    // GetId(Admin_image, res, req , {});
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
}
module.exports = new Imagecontrollers();