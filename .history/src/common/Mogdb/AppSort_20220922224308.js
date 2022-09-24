
async function GetSortOffer(Model, req, res) {
    Model.find({ _id: { $in: req.body.ids.slice(0, 3) } }, function (err, data) {
        Model.find({ _id: { $ne: req.body.ids.slice(0, 3) } }, function (errNe, dataNe) {
            res.json({ message: dataNe });
        })
    })
}
module.exports = { GetSortOffer };