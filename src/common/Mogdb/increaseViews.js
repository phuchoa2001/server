

async function increaseViews(Model, key, id, req, res) {
    Model.findOneAndUpdate({ _id: id }, { $inc: { [key]: 1 } }).then(_ => {
        res.json({ message: "Đã tăng thành công" })
    });
}

module.exports = { increaseViews };