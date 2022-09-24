
async function GetSortOffer(Model, req, res) {
    Model.find({ _id: { $in: req.body.ids.slice(0, 3)}}, function (err, data) {
        res.json({ message: data })
    })
}
module.exports = { GetSortOffer };