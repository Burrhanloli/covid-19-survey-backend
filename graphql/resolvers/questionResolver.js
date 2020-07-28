const Question = require("../../models/question");
const Quiz = require("../../models/quiz");
const Answer = require("../../models/answer");
const utils = require("./utils");
const { errorName } = require("../../error/errors");

module.exports = {
  // Queries
  getQuestionsByQuizId: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { quizId } = args;
    try {
      const questions = await Question.find({ quiz_id: quizId });
      return questions.map((question) => utils.transformQuestion(question));
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  getQuestionById: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { questionId } = args;
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error(errorName.QUESTION_NOT_FOUND);
    }
    try {
      return utils.transformQuestion(question);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  getAllQuestions: async (_, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    try {
      const questions = await Question.find();
      return questions.map((question) => utils.transformQuestion(question));
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  //mutations
  createQuestion: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { questionInput } = args;
    const existingQuestion = await Question.findOne({
      text: questionInput.text,
    });
    if (existingQuestion) {
      throw new Error(errorName.QUESTION_ALREADY_PRESENT);
    }
    const question = new Question({
      text: questionInput.text,
      priority_order: questionInput.priorityOrder,
      question_type: questionInput.questionType,
    });
    try {
      await question.save();
      return utils.transformQuestion(question);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },

  deleteQuestion: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { questionId } = args;
    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      throw new Error(errorName.QUESTION_NOT_FOUND);
    }

    try {
      await Question.findByIdAndDelete(questionId);
      return utils.transformQuestion(existingQuestion);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },

  addQuizIdToQuestion: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { questionId, quizId } = args;
    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      throw new Error(errorName.QUESTION_NOT_FOUND);
    }
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new Error(errorName.QUIZ_NOT_FOUND);
    }
    if (existingQuestion.quiz_id == quizId) {
      throw new Error(errorName.QUIZ_ALREADY_PRESENT);
    }
    if (quiz.questions.includes(questionId)) {
      throw new Error(errorName.QUESTION_ALREADY_PRESENT);
    }
    try {
      quiz.questions.push(questionId);
      await quiz.save();
      existingQuestion.quiz_id = quizId;
      await existingQuestion.save();
      return utils.transformQuestion(existingQuestion);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },

  addAnswerIdToQuestion: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { questionId, answerId } = args;
    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      throw new Error(errorName.QUESTION_NOT_FOUND);
    }
    const answer = await Answer.findById(answerId);
    if (!answer) {
      throw new Error(errorName.ANSWER_NOT_FOUND);
    }
    if (answer.question_id == questionId) {
      throw new Error(errorName.QUESTION_ALREADY_PRESENT);
    }
    if (existingQuestion.answers.includes(questionId)) {
      throw new Error(errorName.ANSWER_ALREADY_PRESENT);
    }
    try {
      answer.question_id = questionId;
      await answer.save();
      existingQuestion.answers.push(answerId);
      await existingQuestion.save();
      return utils.transformQuestion(existingQuestion);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
};
