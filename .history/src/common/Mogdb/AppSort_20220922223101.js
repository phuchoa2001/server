
async function GetSortOffer(Model, req, res) {
    console.log(req.body.ids.slice(0, 3).length);
    Model.find({ _id: { $in: req.body.ids } }, function (err, data) {
        res.json({ message: data })
    })
}
module.exports = { GetSortOffer };