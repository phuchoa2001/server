const path = require("path");
var cloudinary = require("cloudinary").v2;
const Upload = require("./models/Uploads");
cloudinary.config({
  cloud_name2: process.env.CLOUD_NAME,
  api_key2: process.env.API_KEY,
  api_secret2: process.env.API_SECRET,
});
class Postcontrollers {
  async index(req, res) {
    cloudinary.api.resources(function (error, result) {
      result.resources.map((image) => {
        image.id = image.public_id;
      });
      res.status(200).json(result.resources);
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
          console.log(module_obj);
          res.json({ payload: module_obj });
        } else {
          console.log("dit me t upload !");
        }
      }
    );
  }
  delete(req, res) {
    cloudinary.uploader.destroy(req.body.id, function (err, result) {
      res.json({ messger: `đã xóa ảnh ${req.body.id}` });
    });
  }
}
module.exports = new Postcontrollers();
