const Quiz = require("../../models/quiz");
const Question = require("../../models/question");
const { errorName } = require("../../error/errors");
const utils = require("./utils");

module.exports = {
  // Queries
  getQuizById: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { quizId } = args;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new Error(errorName.QUIZ_NOT_FOUND);
    }
    try {
      return utils.transformQuiz(quiz);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  getAllQuiz: async (_, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    try {
      const quizzes = await Quiz.find();
      return quizzes.map((quiz) => utils.transformQuiz(quiz));
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  //mutations
  createQuiz: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { quizInput } = args;
    const existingQuestion = await Quiz.findOne({
      text: quizInput.text,
    });
    if (existingQuestion) {
      throw new Error(errorName.QUIZ_ALREADY_PRESENT);
    }
    const quiz = new Quiz({
      text: quizInput.text,
    });
    try {
      await quiz.save();
      return utils.transformQuiz(quiz);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  deleteQuiz: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { quizId } = args;

    const existingQuiz = await Quiz.findById(quizId);
    if (!existingQuiz) {
      throw new Error(errorName.QUIZ_NOT_FOUND);
    }

    try {
      await Quiz.findByIdAndDelete(quizId);
      return utils.transformQuiz(existingQuiz);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  addQuestionIdToQuiz: async (args, req) => {
    const { isAuthorized } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { questionId, quizId } = args;
    const existingQuiz = await Quiz.findById(quizId);
    if (!existingQuiz) {
      throw new Error(errorName.QUIZ_NOT_FOUND);
    }
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error(errorName.QUESTION_NOT_FOUND);
    }
    if (question.quiz_id == quizId) {
      throw new Error(errorName.QUIZ_ALREADY_PRESENT);
    }
    if (existingQuiz.questions.includes(questionId)) {
      throw new Error(errorName.QUESTION_ALREADY_PRESENT);
    }
    try {
      question.quiz_id = quizId;
      await question.save();
      existingQuiz.questions.push(questionId);
      await existingQuiz.save();
      return utils.transformQuiz(existingQuiz);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
};
