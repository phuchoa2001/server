async function Upload(Model, res, req, module_obj) {
    const post = new Model(module_obj);
    await post.save();
    res.json({ payload: module_obj });
}

module.exports = { Upload };
