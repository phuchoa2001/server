const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_category_cssanimation = new Schema({
    name: { type: String, required: true }
});
module.exports = mongoose.model('Admin_categoryCssAnimation', Admin_category_cssanimation);