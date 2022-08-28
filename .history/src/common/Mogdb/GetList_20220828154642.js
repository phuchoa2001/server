
async function GetList(Model, page, page_size) {
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 100;
    let result = {}
    await Model.countDocuments().then((count_documents) => {
        await Model.find({}, function (err, data) {
            result = {
                meta: {
                    current_page: page,
                    last_page: Math.ceil(count_documents / page_size),
                    total: count_documents
                },
                data: data,
            }
        }).sort({ $natural: -1 }).limit(page_size).skip((page - 1) * page_size);
    })
    return result;
}
module.exports = GetList;