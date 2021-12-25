const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Upload = new Schema({
  public_id: { type: String },
  width: { type: Number },
  height: { type: Number },
  description: { type: String },
  format: { type: String },
  url: { type: String },
});
module.exports = mongoose.model("Uploads", Upload);
