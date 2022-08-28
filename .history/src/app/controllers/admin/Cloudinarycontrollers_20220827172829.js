const path = require("path");
var cloudinary = require("cloudinary").v2;
const Upload = require("../models/Uploads");
cloudinary.config({
  cloud_name: "xoanen",
  api_key: "774386681112683",
  api_secret: "jZeifLqmfUItgPg_qEzyvn07W6Y",
});

class Cloudinarycontrollers {
  async index(req, res) {
    console.log("da chay")
    cloudinary.api.resources(function (error, result) {
      result.resources.map((image) => {
        image.id = image.public_id;
      });
      res.status(200).json(result.resources);
    });
  }
}
module.exports = new Cloudinarycontrollers();