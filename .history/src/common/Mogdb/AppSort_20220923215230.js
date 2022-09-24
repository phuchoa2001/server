
async function GetSortOffer(Model, req, res) {
    const page = +req.query.page || 1;
    const page_size = +req.query.page_size || 100;
    const search = req.query.search || null;
    const IdArr = req.body.ids.slice(0, 3);
    console.log("IdArr" , IdArr.length)
    const objectSearch = search ? {
        $or: [
            { [search1]: { $regex: search, $options: "i" } },
            { [search2]: { $regex: search, $options: "i" } },
            { _id: { $in: IdArr }, }
        ],
    } : {};
    const objectSearchFilter = search ? {
        $or: [
            { [search1]: { $regex: search, $options: "i" } },
            { [search2]: { $regex: search, $options: "i" } },
            { _id: { $nin: IdArr }, }
        ],
    } : {};
    await Model.countDocuments().then(async (count_documents) => {
        Model.find(objectSearch, function (err, data) {
            console.log("data" , data);
            Model.find(objectSearchFilter, function (errNe, dataNe) {
                const ArrNew = [...dataNe, ...data];
                res.json({ message: ArrNew, length: ArrNew.length });
            }).sort({ viewTotal: -1 }).limit(page_size - 3).skip((page - 1) * (page_size - 3));
        })
    })
}
module.exports = { GetSortOffer };