const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: { type: String, required: true, unique: true },
  quiz_id: { type: Schema.Types.ObjectId, ref: "Quiz" },
  priority_order: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: (props) => `${props.value} is not a valid number!`,
    },
  },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  question_type: { type: String, required: true },
});

module.exports = mongoose.model("Question", QuestionSchema);
