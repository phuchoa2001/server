async function Upload(Model, res, req, module_obj) {
    const post = new Model(module_obj);
    await post.save();
    res.json({ payload: module_obj });
}
async function Edit(Model, res, req, module_obj) {
    try {
        Model.updateOne({ _id: req.params.id }, module_obj).then(_i => {
            res.json({ payload: module_obj })
        })
    } catch (err) {
        res.json(err)
    }
}
async function Delete(Model, res, req) {
    Model.deleteMany({ public_id: { "$in": req.body.ids } }).then(_i => {
        res.json({ messger: `đã xóa ${req.body.ids.length} phần tử thành công` });
    }).catch(err => {
        res.json(err)
    })
}

module.exports = { Upload, Edit, Delete };
