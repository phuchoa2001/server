const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Schools = new Schema({
    name: { type: String },
    url: { type: String },
    tag: { type: String },
    tagarray: { type: Array },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Schools', Schools);