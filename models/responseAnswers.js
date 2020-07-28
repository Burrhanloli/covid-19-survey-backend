const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResponseAnswersSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  quiz_id: { type: Schema.Types.ObjectId, required: true, ref: "Quiz" },
  question: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
  selected_answers: [
    { type: Schema.Types.ObjectId, required: true, ref: "Answer" },
  ],
  date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("ResponseAnswers", ResponseAnswersSchema);
