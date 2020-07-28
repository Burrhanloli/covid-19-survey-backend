const authResolver = require("./authResolver");
const userResolver = require("./userResolver");
const questionResolver = require("./questionResolver");
const quizResolver = require("./quizResolver");
const answerResolver = require("./answerResolver");
const responseAnswersResolver = require("./responseAnswersResolver");
const resultResolver = require("./resultResolver");
const userContactLocationResolver = require("./userContactLocationResolver");

const rootResolver = {
  ...authResolver,
  ...userResolver,
  ...questionResolver,
  ...quizResolver,
  ...answerResolver,
  ...responseAnswersResolver,
  ...resultResolver,
  ...userContactLocationResolver,
};
module.exports = rootResolver;
