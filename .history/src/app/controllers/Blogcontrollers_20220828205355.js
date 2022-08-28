const Blog = require("./models/Blogs");
const SortTag = require("../../common/Sorttag");
var cloudinary = require("cloudinary").v2;
const path = require("path");
cloudinary.config({
  cloud_name2: process.env.CLOUD_NAME,
  api_key2: process.env.API_KEY,
  api_secret2: process.env.API_SECRET,
});
class Postcontrollers {
  async list(req, res) {
    Blog.find({}, function (err, data) {
      const payload = {
        newpost: data.slice(4, 8),
        Slide: data.slice(0, 5),
        List: data.slice((req.query.page - 1) * 8, req.query.page * 8),
      };
      res.status(200).json(payload);
    }).sort({ $natural: -1 }).limit(8).skip((req.query.page - 1) * 8);
    //
  }
  async add(req, res) {
    const payload = JSON.parse(req.body.payload);
    await cloudinary.uploader.upload(
      `${path.join(__dirname, `../../public/upload`)}${"\\" + req.file.filename
      }`,
      { public_id: req.file.filename },
      function (error, result) {
        payload.img = result.url;
        const post = new Blog(payload);
        post.save();
        res.status(200).json({ payload: payload });
      }
    );
  }
  async gettag(req, res) {
    const { tag } = req.query;
    const id = tag;
    Blog.findOne({ _id: tag }, { tag: 1 }, async function (err, data) {
      const { tag } = data;
      await Blog.find({},
        async function (err, data) {
          const result = await SortTag(tag, data, id);
          res.json(result);
        }
      ).sort({ $natural: -1 }).limit(100);
    });
  }
  async edit(req, res) {
    const payload = JSON.parse(req.body.payload);
    if (req.file) {
      await cloudinary.uploader.upload(
        `${path.join(__dirname, `../../public/upload`)}${"\\" + req.file.filename
        }`,
        { public_id: req.file.filename },
        function (error, result) {
          payload.img = result.url;
        }
      );
    }
    Blog.updateOne({ _id: payload._id }, payload).then((request) => {
      res.status(200).json({ payload: payload });
    });
  }
  delete(req, res) {
    Blog.deleteOne({ _id: req.body.payload.id }).then((request) => {
      res.status(201).json({ messger: "Xóa thành công" });
    });
  }
  getpost(req, res) {
    Blog.findOne({ _id: req.query.id }, function (err, data) {
      res.status(200).json({ payload: data });
    });
  }
  search(req, res) {
    Blog.find(
      {
        $or: [
          { title: { $regex: req.query.key, $options: "i" } },
          { description: { $regex: req.query.key, $options: "i" } },
        ],
      },
      function (err, data) {
        res.status(200).json({ payload: data });
      }
    );
  }
}
module.exports = new Postcontrollers();
