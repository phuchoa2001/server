const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_login = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    permission: { type: String, required: true },
});
module.exports = mongoose.model('Admin_login', Admin_login);