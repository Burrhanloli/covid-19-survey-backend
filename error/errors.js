exports.errorName = {
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  SERVER_ERROR: "SERVER_ERROR",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INCORRECT_EMAIL_PASSWORD: "INCORRECT_EMAIL_PASSWORD",
  QUESTION_NOT_FOUND: "QUESTION_NOT_FOUND",
  QUIZ_NOT_FOUND: "QUIZ_NOT_FOUND",
  QUESTION_ALREADY_PRESENT: "QUESTION_ALREADY_PRESENT",
  QUIZ_ALREADY_PRESENT: "QUIZ_ALREADY_PRESENT",
  ANSWER_NOT_FOUND: "ANSWER_NOT_FOUND",
  ANSWER_ALREADY_PRESENT: "ANSWER_ALREADY_PRESENT",
};

exports.errorType = { 
  SERVER_ERROR: {
    message: "Server error.",
    statusCode: 500,
  },
  UNAUTHENTICATED: {
    message: "Unauthenticated",
    statusCode: 401,
  },
  INCORRECT_EMAIL_PASSWORD: {
    message: "Email or Password is incorrect!",
    statusCode: 401,
  },
  USER_ALREADY_EXISTS: {
    message: "User is already exists.",
    statusCode: 403,
  },
  USER_NOT_FOUND: {
    message: "User not found",
    statusCode: 404,
  },
  QUESTION_NOT_FOUND: {
    message: "Question not found",
    statusCode: 404,
  },
  QUESTION_ALREADY_PRESENT: {
    message: "Question is already present",
    statusCode: 403,
  },
  QUIZ_NOT_FOUND: {
    message: "Quiz not found",
    statusCode: 404,
  },
  QUIZ_ALREADY_PRESENT: {
    message: "Quiz is already present",
    statusCode: 403,
  },
  ANSWER_NOT_FOUND: {
    message: "Answer not found",
    statusCode: 404,
  },
  ANSWER_ALREADY_PRESENT: {
    message: "Answer is already present",
    statusCode: 403,
  },
};
