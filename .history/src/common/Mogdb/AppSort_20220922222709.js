
async function GetSortOffer(Model, req, res) {
    Model.find({ _id: { $in: req.body.ids } }, function (err, data) {
       console.log("data" , data);
       res.json({ message: req.body })
    })
}
module.exports = { GetSortOffer };