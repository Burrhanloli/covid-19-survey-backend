const Answer = require("../../models/answer");
const { errorName } = require("../../error/errors");
const Question = require("../../models/question");

module.exports = {
  // Queries
  getAnswerById: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { answerId } = args;
    const answer = await Answer.findById(answerId);
    if (!answer) {
      throw new Error(errorName.ANSWER_NOT_FOUND);
    }
    try {
      return answer;
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  getAllAnswers: async (_, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    try {
      const answers = await Answer.find();
      return answers;
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  //mutations
  createAnswer: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { answerInput } = args;
    const existingAnswer = await Answer.findOne({
      text: answerInput.text,
    });
    if (existingAnswer) {
      throw new Error(errorName.ANSWER_ALREADY_PRESENT);
    }
    const answer = new Answer({
      text: answerInput.text,
      risk_factor: answerInput.riskFactor,
    });
    try {
      return await answer.save();
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  deleteAnswer: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { answerId } = args;
    const existingAnswer = await Quiz.findById(answerId);
    if (!existingAnswer) {
      throw new Error(errorName.ANSWER_NOT_FOUND);
    }
    try {
      await Answer.findByIdAndDelete(answerId);
      return existingAnswer;
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  addQuestionIdToAnswer: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { questionId, answerId } = args;
    const existingAnswer = await Answer.findById(answerId);
    if (!existingAnswer) {
      throw new Error(errorName.ANSWER_NOT_FOUND);
    }
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error(errorName.QUESTION_NOT_FOUND);
    }
    if (question.answers.includes(answerId)) {
      throw new Error(errorName.QUESTION_ALREADY_PRESENT);
    }
    try {
      question.answers.push(answerId);
      await question.save();
      existingAnswer.question_id = questionId;
      return await existingAnswer.save();
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
};
