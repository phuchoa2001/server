const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Cssanimation_App = new Schema({
    title: { type: String },
    html: { type: String },
    css: { type: String },
    category: { type: Array, ref: "Cssanimation_category" },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Cssanimation_app', Cssanimation_App);