const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_token = new Schema({
    token: { type: String, required: true },
});
module.exports = mongoose.model('Admin_token', Admin_token);