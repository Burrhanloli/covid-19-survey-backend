const ResponseAnswers = require("../../models/responseAnswers");
const Quiz = require("../../models/quiz");
const Result = require("../../models/result");
const Answer = require("../../models/answer");
const utils = require("./utils");
const { errorName } = require("../../error/errors");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = {
  getResultsForUser: async (_, req) => {
    const { isAuthorized, userId } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    try {
      const results = await Result.find({ user_id: userId }, null, {
        sort: "-date",
      });
      return results.map((result) => utils.transformResult(result));
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  //mutatation
  addResult: async (args, req) => {
    const { isAuthorized, userId } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { quizId } = args;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      throw new Error(errorName.QUIZ_NOT_FOUND);
    }
    let resultObj;
    let selectedAnswers = [];
    await asyncForEach(quiz.questions, async (question) => {
      await ResponseAnswers.findOne(
        {
          user_id: userId,
          quiz_id: quizId,
          question: question,
        },
        null,
        { sort: "-date" },
        (err, answerResponse) => {
          if (err) {
            throw new Error(errorName.SERVER_ERROR);
          }
          selectedAnswers.push(...answerResponse.selected_answers);
        }
      );
    });
    let result = 0;
    await asyncForEach(selectedAnswers, async (answerId) => {
      const answer = await Answer.findById(answerId);
      result += answer.risk_factor;
    });

    if (result >= process.env.HIGH_RISK_THRESHOLD) {
      resultObj = new Result({
        user_id: userId,
        is_high_risk: true,
        date: Date.now(),
      });
    } else {
      resultObj = new Result({
        user_id: userId,
        is_high_risk: false,
        date: Date.now(),
      });
    }
    try {
      return await resultObj.save();
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
};
