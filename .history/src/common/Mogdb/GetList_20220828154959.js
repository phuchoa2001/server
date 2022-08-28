
async function GetList(Model, page, page_size) {
    const page_list = page || 1;
    const page_size_list = page_size || 100;
    let result = {}
    await Model.countDocuments().then((count_documents) => {
        Model.find({}, function (err, data) {
            result = {
                meta: {
                    current_page: page,
                    last_page: Math.ceil(count_documents / page_size),
                    total: count_documents
                },
                data: data,
            }
        }).sort({ $natural: -1 }).limit(page_size_list).skip((page_list - 1) * page_size_list);
    })
    return result;
}
module.exports = GetList;