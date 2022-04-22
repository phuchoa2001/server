let Arrays = [];
let resultArray = [];
function createData(item, id) {
    if (item._id != id) {
        if (Arrays.length !== 0) {
            Arrays.map((Array, index) => {
                Array._id === item._id && resultArray[index].sort++;
            })
            if (Arrays.findIndex((element) => element._id === item._id) === -1) {
                resultArray.push({ ...item, sort: 1 })
                Arrays.push(item)
            };
        } else {
            resultArray.push({ ...item, sort: 1 })
            Arrays.push(item);
        }
    }
}
function SortTag(tags, data, id) {
    resultArray = [];
    Arrays = [];
    tags.map(tag => {
        data.map((item) => {
            if (item.tag.findIndex((element) => element === tag) !== -1) {
                createData(item, id);
            }
        })
    })
    resultArray.sort(function (a, b) {
        return b.sort - a.sort;
    })
    return resultArray.slice(0, 4);
}

module.exports = SortTag;