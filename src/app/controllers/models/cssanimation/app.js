const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Cssanimation_App = new Schema({
    title: { type: String, required: true },
    html: { type: String },
    css: { type: String },
    categoryString: { type: String, require: true },
    category: [{ type: Schema.Types.ObjectId, required: true, ref: "Cssanimation_category" }],
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Cssanimation_app', Cssanimation_App);