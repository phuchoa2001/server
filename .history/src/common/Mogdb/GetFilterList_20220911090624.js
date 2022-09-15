


async function FilterList(data, filters, res) {
    const DataArr = [];
    function CombackHell(data, filters, index, indexfilter, DataArr, item) {
        console.log('item', item);
        DataArr.push(item);
        if (index === data.length - 1 && indexfilter === filters.length - 1) {
            res.json(DataArr)
        }
    }
    data.map(async (item, index) => {
        console.log("filters" , filters);
        filters.map((filter, indexfilter) => {
            if (filter.isArray) {
                filter.Modal.find({ "_id": { "$in": item[filter.variable] } }, (err, data) => {
                    CombackHell(data, filters, index, indexfilter, DataArr, {
                        ...item._doc,
                        [filter.variable]: data
                    })
                })
            } else {
                filter.Modal.find({ "_id": item[filter.variable] }, (err, data) => {
                    CombackHell(data, filters, index, indexfilter, DataArr, {
                        ...item._doc,
                        [filter.variable]: data
                    })
                })
            }
        })
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