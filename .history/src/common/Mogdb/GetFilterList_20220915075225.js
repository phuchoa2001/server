



async function GetFilterList(Model, res, req, search1, search2, filters,) {
    const page = +req.query.page || 1;
    const page_size = +req.query.page_size || 100;
    const search = req.query.search || null;
    const objectSearch = search ? {
        $or: [
            { [search1]: { $regex: search, $options: "i" } },
            { [search2]: { $regex: search, $options: "i" } },
            { category: { $elemMatch: { name: search } } }
        ],
    } : {}
    await Model.countDocuments().then(async (count_documents) => {
        await Model.find(objectSearch, function (err, data) {
            res.json({
                data: data,
                meta: {
                    current_page: page,
                    last_page: Math.ceil(count_documents / page_size),
                    total: count_documents
                },
            });
        }).populate(filters).sort({ $natural: -1 }).limit(page_size).skip((page - 1) * page_size);
    })
}

async function GetFilterId(Model, res, req, condition, filters) {
    await Model.findOne(condition, function (err, data) {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    }).populate(filters)
}
module.exports = { GetFilterList, GetFilterId };