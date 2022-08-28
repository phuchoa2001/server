
async function GetList(Model, res, req) {
    const page = +req.query.page || 1;
    const page_size = +req.query.page_size || 100;
    await Model.countDocuments().then(async (count_documents) => {
        await Model.find({}, function (err, data) {
            res.json({
                data: data,
                meta: {
                    current_page: page,
                    last_page: Math.ceil(count_documents / page_size),
                    total: count_documents
                },
            });
        }).sort({ $natural: -1 }).limit(page_size).skip((page - 1) * page_size);
    })
}

async function GetId(Model, res, req, condition) {
    console.log("condition" , condition);
    await Model.find(condition, function (err, data) {

    })
}
module.exports = { GetList, GetId };