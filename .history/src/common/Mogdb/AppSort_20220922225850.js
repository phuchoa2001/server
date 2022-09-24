
async function GetSortOffer(Model, req, res) {
    const IdArr = req.body.ids.slice(0, 3);
    Model.find({ _id: { $in: IdArr } }, function (err, data) {
        Model.find({ _id: { $ne: IdArr } }, function (errNe, dataNe) {
            console.log("dataNe", dataNe)
            res.json({ message: dataNe });
        })
    })
}
module.exports = { GetSortOffer };