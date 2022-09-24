
async function GetSortOffer(Model, req, res) {
    res.json({ message: req.body })
    Model.find()
}
module.exports = { GetSortOffer };