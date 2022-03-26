const Schools = require('./models/schools');
class Mypicturecontrollers {
    async get(req, res) {
        await Schools.find({}, function (err, data) {
            res.json({ list: data.slice((req.query.page - 1) * 20, req.query.page * 20) });
        });
    }
    edit(req, res) {
        Schools.findOne({ _id: req.body._id }, function (err, data) {
            if (!err) {
                Schools.updateOne({ _id: req.body._id }, req.body).then(() => {
                    res.status(201).json({ message: "sửa thành công" });
                })
            }
        })
    }
    delete(req, res) {
        Schools.deleteOne({ _id: req.body.id }, function (err, data) {
            if (!err) {
                Schools.updateOne({ _id: req.body.id }, req.body).then(() => {
                    res.status(202).json({ message: "xóa thành công" });
                })
            }
        })
    }
    add(req, res) {
        const post = new Schools(req.body);
        post.save();
        res.json({ message: "Thêm thành công" })
    }
    async getimage(req, res) {
        await Schools.findOne({ _id: req.params.id }, function (err, data) {
            console.log(data)
            res.status(200).json({ image: data });
        })
    }
    async search(req, res) {
        await Schools.find({
            $or: [
                { name: { $regex: req.query.q, $options: "i" } },
                { tag: { $regex: req.query.q, $options: "i" } },
            ],
        }, function (err, data) {
            res.json({ list: data.slice((req.query.page - 1) * 20, req.query.page * 20) });
        });
    }

}
module.exports = new Mypicturecontrollers();