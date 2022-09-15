


async function FilterList(data, filters, res) {
    const DataArr = [];
    let index = 0;
    const Item = data[Index];
    function CombackHell(item) {
        DataArr.push(item);

        res.json(DataArr)
    }
    function dequy() {
        console.log("index", index)
        if (index === data.length - 1) {
            CombackHell({
                ...item._doc,
                [filter.variable]: data
            })
        }
        filters.map(async (filter, indexfilter) => {
            if (filter.isArray) {
                await filter.Modal.find({ "_id": { "$in": item[filter.variable] } }, (err, data) => {
                    if (indexfilter === filter.length - 1) {
                        index++;
                        dequy();
                    }
                })
            } else {
                await filter.Modal.find({ "_id": item[filter.variable] }, (err, data) => {
                    if (indexfilter === filter.length - 1) {
                        index++;
                        dequy();
                    }
                })
            }
        })
    }
    dequy();
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