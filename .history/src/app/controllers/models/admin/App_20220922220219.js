const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_app = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    github: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Admin_category" }],
    image: { type: String, ref: "Admin_image", required: true },
    icon: { type: String, ref: "Admin_Icon", required: true },
    goverment: { type: Boolean, required: true },
    viewTotal: { type: Number, required: true },
    createAt: { type: Date, default: Date.now, required: true },
    updateAt: { type: Date, default: Date.now, required: true }
});
module.exports = mongoose.model('Admin_app', Admin_app);