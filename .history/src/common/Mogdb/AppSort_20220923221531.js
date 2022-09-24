
async function GetSortOffer(Model, req, res, search1, search2) {
    const page = +req.query.page || 1;
    const page_size = +req.query.page_size || 100;
    const search = req.query.search || null;
    const IdArr = req.body.ids.slice(0, 3);
    const objectSearch = search ? {
        _id: { $in: IdArr },
    } : {
        _id: { $in: IdArr },
    };
    const objectSearchFilter = search ? {
        _id: { $nin: IdArr },
        $or: [
            { [search1]: { $regex: search, $options: "i" } },
            { [search2]: { $regex: search, $options: "i" } }
        ],
    } : {
        _id: { $nin: IdArr },
    };
    await Model.countDocuments().then(async (count_documents) => {
        Model.find(objectSearch, function (err, data) {
            Model.find(objectSearchFilter, function (errNe, dataNe) {
                const ArrNew = [...data, ...dataNe];
                res.json({
                    data: ArrNew,
                    meta: {
                        current_page: page,
                        last_page: Math.ceil(count_documents / page_size),
                        total: count_documents
                    },
                });
            }).populate(['image', 'icon', "category"]).sort({ viewTotal: -1 }).limit(page_size - 3).skip((page - 1) * (page_size - 3));
        }).limit(3);
    })
}
async function GetSortClick(Model, req, res, search1, search2) {

}
module.exports = { GetSortOffer, GetSortClick };