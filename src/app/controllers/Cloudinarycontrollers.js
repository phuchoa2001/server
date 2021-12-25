const path = require("path");
var cloudinary = require("cloudinary").v2;
const Upload = require("./models/Uploads");
cloudinary.config({
  cloud_name: "xoanen",
  api_key: "774386681112683",
  api_secret: "jZeifLqmfUItgPg_qEzyvn07W6Y",
});
class Postcontrollers {
  async index(req, res) {
    console.log("get data");
    cloudinary.api.resources(function (error, result) {
      result.resources.map((image) => {
        image.id = image.public_id;
      });
      res.status(200).json(result.resources);
    });
  }
  async upload(req, res) {
    let object = null;
    await cloudinary.uploader.upload(
      `${path.join(__dirname, `../../public/upload`)}${
        "\\" + req.file.filename
      }`,
      { public_id: req.file.filename },
      function (error, result) {
        object = result;
      }
    );
    const module_obj = {
      public_id: object.public_id,
      width: object.width,
      height: object.height,
      format: object.format,
      url: object.url,
    };
    res.json({ payload: module_obj });
  }
  delete(req, res) {
    cloudinary.uploader.destroy(req.body.id, function (err, result) {
      res.json({ messger: `đã xóa ảnh ${req.body.id}` });
    });
  }
}
module.exports = new Postcontrollers();