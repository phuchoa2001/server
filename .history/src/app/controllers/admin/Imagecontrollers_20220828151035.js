const path = require("path");
var cloudinary = require("cloudinary").v2;
const Upload = require("../models/Uploads");
cloudinary.config({
  cloud_name: "xoanen1202",
  api_key: "946299658741956",
  api_secret: "viUU_7QS_9qRa9rIf9k9Ap70j8M",
});

class Imagecontrollers {
  async index(req, res) {
    cloudinary.api.sub_folders("images", function (error, result) {
      res.status(200).json(result);
    });
  }
  async upload(req, res) {
    await cloudinary.uploader.upload(
      `${path.join(__dirname, `../../public/upload`)}${"\\" + req.file.filename
      }`,
      { public_id: req.file.filename },
      function (error, result) {
        if (error) {
          const module_obj = {
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            url: result.url,
          };
          res.json({ payload: module_obj });
        }
      }
    );
  }
}
module.exports = new Imagecontrollers();