const { errorType } = require("./errors");

const getErrorCode = (errorName) => {
  return errorType[errorName];
};

module.exports = getErrorCode;
