const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_app = new Schema({
    name: { type: String },
    url: { type: String },
    github: { type: String },
    category: { type: Array },
    image: { type: String },
    icon: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Admin_app', Admin_app);