
async function GetList(Model, page, page_size) {
    let result = {}
    await Model.countDocuments().then(async (count_documents) => {
        await Model.find({}, function (err, data) {
            result = {
                data: data,
                meta: {
                    current_page: page,
                    last_page: Math.ceil(count_documents / page_size),
                    total: count_documents
                },
            }
        }).sort({ $natural: -1 }).limit(page_size).skip((page - 1) * page_size);
    })
    console.log("result" , result);
    return result;
}
module.exports = GetList;