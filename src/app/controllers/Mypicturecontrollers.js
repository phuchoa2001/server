const Mypicture = require('./models/MyPicture');
class Mypicturecontrollers {
    async get(req, res) {
        await Mypicture.find({}, function (err, data) {
            res.json({ list: data.reverse().slice((req.query.page - 1) * 20, req.query.page * 20) });
        });
    }
    edit(req, res) {
        Mypicture.findOne({ _id: req.body._id }, function (err, data) {
            if (!err) {
                Mypicture.updateOne({ _id: req.body._id }, req.body).then(() => {
                    res.status(201).json({ message: "sửa thành công" });
                })
            }
        })
    }
    delete(req, res) {
        Mypicture.deleteOne({ _id: req.body.id }, function (err, data) {
            if (!err) {
                Mypicture.updateOne({ _id: req.body.id }, req.body).then(() => {
                    res.status(202).json({ message: "xóa thành công" });
                })
            }
        })
    }
    add(req, res) {
        const post = new Mypicture(req.body);
        post.save();
        res.json({ message: "Thêm thành công" })
    }
    async getimage(req, res) {
        await Mypicture.findOne({ _id: req.params.id }, function (err, data) {
            res.status(200).json({ image: data });
        })
    }
    async search(req, res) {
        await Mypicture.find({
            $or: [
                { name: { $regex: req.query.q, $options: "i" } },
                { tag: { $regex: req.query.q, $options: "i" } },
            ],
        }, function (err, data) {
            res.json({ list: data.reverse().slice((req.query.page - 1) * 20, req.query.page * 20) });
        });
    }

}
module.exports = new Mypicturecontrollers();