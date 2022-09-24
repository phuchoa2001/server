
async function GetSortOffer(Model, res, req, condition) {
    res.json({ message: req.query + "sort" })
}
module.exports = { GetSortOffer };