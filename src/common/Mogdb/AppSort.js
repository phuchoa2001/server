
async function GetSortOffer(Model, req, res, search1, search2) {
    const page = +req.body.page || 1;
    const page_size = +req.body.page_size || 100;
    const search = req.body.search || null;
    const IdArr = req.body?.ids?.slice(0, 3) || [];
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
            }).populate(['image', 'icon', "category"]).sort({ viewTotal: -1 }).limit(page_size - IdArr.length).skip((page - 1) * (page_size - IdArr.length));
        }).limit(3).populate(['image', 'icon', "category"]);
    })
}
async function GetSortHot(Model, req, res, search1, search2) {
    const page = +req.body.page || 1;
    const page_size = +req.body.page_size || 100;
    const search = req.body.search || null;
    const objectSearch = search ? {
        $or: [
            { [search1]: { $regex: search, $options: "i" } },
            { [search2]: { $regex: search, $options: "i" } }
        ]
    } : {
    };
    await Model.countDocuments().then(async (count_documents) => {
        Model.find(objectSearch, function (err, data) {
            res.json({
                data: data,
                meta: {
                    current_page: page,
                    last_page: Math.ceil(count_documents / page_size),
                    total: count_documents
                },
            });
        }).populate(['image', 'icon', "category"]).sort({ viewTotal: -1 }).limit(page_size).skip((page - 1) * (page_size));
    })
}
async function GetSortNormal(Model, req, res, search1, search2) {
    const page = +req.body.page || 1;
    const page_size = +req.body.page_size || 100;
    const search = req.body.search || null;
    const objectSearch = search ? {
        $or: [
            { [search1]: { $regex: search, $options: "i" } },
            { [search2]: { $regex: search, $options: "i" } },
        ],
    } : {};
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
        }).populate(['image', 'icon', "category"]).sort({ $natural: -1 }).limit(page_size).skip((page - 1) * page_size);
    })
}

async function GetSortClick(Model, req, res, search1, search2) {
    const page = +req.body.page || 1;
    const page_size = +req.body.page_size || 100;
    const search = req.body.search || null;
    const IdArr = req.body.ids;
    const objectSearch = search ? {
        _id: { $in: IdArr },
        $or: [
            { [search1]: { $regex: search, $options: "i" } },
            { [search2]: { $regex: search, $options: "i" } }
        ],
    } : {
        _id: { $in: IdArr },
    };
    await Model.countDocuments().then(async (count_documents) => {
        Model.find(objectSearch, function (err, data) {
            res.json({
                data: data,
                meta: {
                    current_page: page,
                    last_page: Math.ceil(count_documents / page_size),
                    total: count_documents
                },
            });
        }).populate(['image', 'icon', "category"]).limit(page_size).skip((page - 1) * (page_size));
    })
}
module.exports = { GetSortOffer, GetSortClick, GetSortHot, GetSortNormal };