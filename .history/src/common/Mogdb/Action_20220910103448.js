async function Upload(Model, res, req, module_obj) {
    const post = new Model(module_obj);
    await post.save();
    res.json({ payload: module_obj });
}
async function Upload(Model, res, req, module_obj) {
    Model.updateOne({ _id: req.body.id }, module_obj).then(_i => {
        res.json({ payload: module_obj })
    }).catch(err => {
        res.json(err)
    })
}

module.exports = { Upload };
