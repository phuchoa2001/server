const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_image = new Schema({
    public_id: { type: String },
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    url: { type: Array },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Admin_image', Admin_image);