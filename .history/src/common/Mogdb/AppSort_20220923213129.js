
async function GetSortOffer(Model, req, res) {
    const IdArr = req.body.ids.slice(0, 3);
    Model.find({ _id: { $in: IdArr } , }, function (err, data) {
        Model.find({ _id: { $nin: IdArr } }, function (errNe, dataNe) {
            console.log("dataNe", dataNe)
            res.json({ message: dataNe });
        }).sort("viewTotal").limit(3);
    })
}
module.exports = { GetSortOffer };