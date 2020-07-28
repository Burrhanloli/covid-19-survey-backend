const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserContactLocationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  mobile: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model(
  "UserContactLocation",
  UserContactLocationSchema
);
