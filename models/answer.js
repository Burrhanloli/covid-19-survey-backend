const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  text: { type: String, required: true, unique: true },
  question_id: { type: Schema.Types.ObjectId, ref: "Question" },
  risk_factor: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: (props) => `${props.value} is not a valid number!`,
    },
  },
});

module.exports = mongoose.model("Answer", AnswerSchema);
