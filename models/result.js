const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  is_high_risk: { type: Boolean, required: true },
  date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Result", ResultSchema);
