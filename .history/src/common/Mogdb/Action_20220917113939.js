const { AddNotification } = require('../../common/Mogdb/Notification')

async function Upload(Model, res, req, module_obj, notification) {
    console.log("notification", notification);
    const post = new Model(module_obj);
    await post.save();
    if (notification) {
        AddNotification(notification.name, notification.desc)
    }
    res.json({ payload: module_obj });
}
async function Edit(Model, res, req, module_obj , notification) {
    Model.updateOne({ _id: req.params.id }, module_obj).then(_i => {
        res.json({ payload: module_obj })
    }).catch(err => {
        res.json(err)
    })
    if (notification) {
        AddNotification(notification.name, notification.desc)
    }
}
async function Delete(Model, res, req , notification) {
    Model.deleteMany({ _id: { "$in": req.body.ids } }).then(_i => {
        res.json({ messger: `đã xóa ${req.body.ids.length} phần tử thành công` });
    }).catch(err => {
        res.json(err)
    })
    if (notification) {
        AddNotification(notification.name, notification.desc)
    }
}

module.exports = { Upload, Edit, Delete };
