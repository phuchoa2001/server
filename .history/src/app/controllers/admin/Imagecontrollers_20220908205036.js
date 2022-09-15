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
    Admin_image.find({_id : { "$in" : req.body.ids} } , function(err , data){
      console.log("err" , err , "data" , data)
      res.json({messger : "age"})
    })
    // req.body.ids.map(async (item , index) => {
    //   await cloudinary.uploader.destroy(item, async function (err, result) {
    //     await Admin_image.deleteOne({ public_id: item }).then();
    //     if (index  + 1 === req.body.ids.length) {
    //       res.json({ messger: `đã xóa ${req.body.ids.length} ảnh Thành công` });
    //     }
    //   });
    // })
  }
}
module.exports = new Imagecontrollers();