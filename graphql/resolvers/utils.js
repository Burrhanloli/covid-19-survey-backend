const Question = require("../../models/question");
const Answer = require("../../models/answer");
const { errorName } = require("../../error/errors");

const dateToString = (date) => new Date(date).toISOString();

const questions = async (questionIds) => {
  try {
    const questions = await Question.find({ _id: { $in: questionIds } });
    return questions
      .map((ques) => {
        return transformQuestion(ques);
      })
      .sort((a, b) => a.priority_order - b.priority_order);
  } catch (err) {
    throw new Error(errorName.SERVER_ERROR);
  }
};

const answers = async (answerIds) => {
  try {
    const answers = await Answer.find({ _id: { $in: answerIds } });
    return answers;
  } catch (err) {
    throw new Error(errorName.SERVER_ERROR);
  }
};

const singleQuestion = async (questionId) => {
  try {
    const question = await Question.findById(questionId);
    return transformQuestion(question);
  } catch (err) {
    throw new Error(errorName.SERVER_ERROR);
  }
};

const transformQuestion = (question) => {
  return {
    ...question._doc,
    id: question.id,
    answers: answers.bind(this, question.answers),
  };
};

const transformResponseAnswer = (responseAnswer) => {
  return {
    ...responseAnswer._doc,
    id: responseAnswer.id,
    date: dateToString(responseAnswer.date),
    question: singleQuestion.bind(this, responseAnswer.question),
    selected_answers: answers.bind(this, responseAnswer.selected_answers),
  };
};

const transformQuiz = (quiz) => {
  return {
    ...quiz._doc,
    id: quiz.id,
    questions: questions.bind(this, quiz.questions),
  };
};

const transformResult = (result) => {
  return {
    ...result._doc,
    id: result.id,
    date: dateToString(result.date),
  };
};

const transformUser = (user) => {
  return {
    ...user._doc,
    id: user.id,
    created_at: dateToString(user.created_at),
  };
};

const transformUserContactLocation = (userContactLocation) => {
  return {
    ...userContactLocation._doc,
    id: userContactLocation.id,
    date: dateToString(userContactLocation.date),
  };
};

module.exports = {
  transformResponseAnswer,
  transformQuestion,
  transformQuiz,
  transformResult,
  transformUser,
  transformUserContactLocation,
};
