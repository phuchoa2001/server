const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_app = new Schema({
    name: { type: String },
    url: { type: String },
    github: { type: String },
    category: [{ type: Schema.Types.ObjectId, ref: "Admin_category" }],
    image: { type: String, ref: "Admin_image" },
    icon: { type: String, ref: "Admin_Icon" },
    Goverment: { type: Boolean },
    viewTotal: { type: Number },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Admin_app', Admin_app);