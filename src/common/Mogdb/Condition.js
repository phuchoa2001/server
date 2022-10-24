function ConditionApp(search, filter, { search1, search2 }) {
    const filterObj = filter ? { [filter]: true } : {};
    return search ? {
        ...filterObj,
        $or: [
            { [search1]: { $regex: search, $options: "i" } },
            { [search2]: { $regex: search, $options: "i" } },
        ],
    } : { ...filterObj};
}

module.exports = { ConditionApp };