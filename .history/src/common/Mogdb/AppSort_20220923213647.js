
async function GetSortOffer(Model, req, res) {
    const IdArr = req.body.ids.slice(0, 3);
    Model.find({ _id: { $in: IdArr }, }, function (err, data) {
        Model.find({ _id: { $nin: IdArr } }, function (errNe, dataNe) {
            const ArrNew = [...dataNe, ...data];
            res.json({ message: ArrNew , length : ArrNew.length });
        }).sort({ viewTotal: -1 }).limit(3);
    })
}
module.exports = { GetSortOffer };