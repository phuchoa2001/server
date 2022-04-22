const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Blog = new Schema({
  title: { type: String },
  img: { type: String },
  array: { type: Array },
  html: { type: String },
  tag: { type: Array },
  description: { type: String },
  time: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Blogs', Blog);