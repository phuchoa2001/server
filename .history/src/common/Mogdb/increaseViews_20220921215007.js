

async function increaseViews(Model, key, id) {
    Model.findOneAndUpdate({ _id: id }, { $inc: { key: 1 } }).then(res);
}

module.exports = { increaseViews };