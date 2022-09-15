const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_category = new Schema({
    name: { type: String, required: true }
});
module.exports = mongoose.model('Admin_category', Admin_category);