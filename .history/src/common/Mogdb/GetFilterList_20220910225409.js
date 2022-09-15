


async function FilterList(data, filters, res) {

    let myPromise = new Promise(async function (myResolve, myReject) {
        const DataArr = [];
        await data.map(async (item, index) => {
            await filters.map((filter, indexfilter) => {
                if (filter.isArray) {
                    filter.Modal.find({ "_id": { "$in": item[filter.variable] } }, (err, data) => {
                        console.log("index", index, "indexfilter", indexfilter);
                        DataArr.push({
                            ...item,
                            [filter.variable]: data
                        })
                    })
                }
            })
        })
        myResolve(DataArr); // when successful
    });
    myPromise.then(res => {
        console.log("res", res)
    })

}

async function GetFilterList(Model, res, req, search1, search2, filters) {
    const page = +req.query.page || 1;
    const page_size = +req.query.page_size || 100;
    const search = req.query.search || null;
    const objectSearch = search ? {
        $or: [
            { [search1]: { $regex: search, $options: "i" } },
            { [search2]: { $regex: search, $options: "i" } },
        ],
    } : {}
    await Model.countDocuments().then(async (count_documents) => {
        await Model.find(objectSearch, function (err, data) {
            FilterList(data, filters, res)
            // res.json({
            //     data: data,
            //     meta: {
            //         current_page: page,
            //         last_page: Math.ceil(count_documents / page_size),
            //         total: count_documents
            //     },
            // });
        }).sort({ $natural: -1 }).limit(page_size).skip((page - 1) * page_size);
    })
}

async function GetFilterId(Model, res, req, condition) {
    await Model.findOne(condition, function (err, data) {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
}
module.exports = { GetFilterList, GetFilterId };