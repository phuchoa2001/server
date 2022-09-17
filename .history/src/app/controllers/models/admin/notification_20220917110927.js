const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_notification = new Schema({
    name: { type: String },
    desc: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Admin_notification', Admin_notification);