const ResponseAnswers = require("../../models/responseAnswers");
const utils = require("./utils");
const { errorName } = require("../../error/errors");

module.exports = {
  //query
  getResponseAnswersForUser: async (_, req) => {
    const { isAuthorized, userId } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    try {
      const responseAnswers = await ResponseAnswers.find(
        { user_id: userId },
        null,
        {
          date: "desc",
        }
      );
      return responseAnswers.map((responseAnswer) =>
        utils.transformResponseAnswer(responseAnswer)
      );
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },

  //mutations
  submitResponse: async (args, req) => {
    const { isAuthorized, userId } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { responseAnswerInput } = args;
    const responseAnswer = new ResponseAnswers({
      user_id: userId,
      quiz_id: responseAnswerInput.quizId,
      question: responseAnswerInput.question,
      selected_answers: responseAnswerInput.selectedAnswers,
      date: Date.now(),
    });
    try {
      await responseAnswer.save();
      return utils.transformResponseAnswer(responseAnswer);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
};
