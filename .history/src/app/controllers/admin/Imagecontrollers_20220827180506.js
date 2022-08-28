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
}
module.exports = new Imagecontrollers();