const { buildSchema } = require("graphql");
module.exports = buildSchema(`
	input UserInput {
		userName: String!
		email: String!
		password: String!
	}

	input QuizInput {
		text: String!
	}

	input QuestionInput {
		text: String!
		priorityOrder: Int!
		questionType: String!
	}

	input AnswerInput {
		text: String!
		riskFactor: Int!
	}

	input ResponseAnswerInput {
		quizId: ID!
		question: ID!
		selectedAnswers: [ID!]
	}

	input UserContactLocationInput {
		mobile: String!
		location: String!
	}

	type AuthData {
		userId: ID!
		token: String!
		tokenExpiration: String!
	}

	type User {
		_id: ID!
		user_name: String!
		email: String!
		password: String!
		created_at: String!
	}

	type Quiz {
		_id: ID!
		text: String!
		questions: [Question!]
	}

	type Question {
		_id: ID!
		text: String!
		quiz_id: String
		priority_order: Int!
		question_type: String!
		answers: [Answer!]
	}

	type Answer {
		_id: ID!
		text: String!
		question_id: String
		risk_factor: Int!
	}

	type ResponseAnswer {
		_id: ID!
		user_id: String!
		quiz_id: String!
		question: Question!
		selected_answers: [Answer!]!
	}

	type UserContactLocation {
		_id: ID!
		user_id: String!
		mobile: String!
		location: String!
		date: String!
	}

	type Result {
		_id: ID!
		user_id: ID!
		is_high_risk: Boolean!
		date: String!
	}

	type RootQuery {
		me: User!
		userLogin(email: String!, password: String!): AuthData!

		getQuizById(quizId: ID!): Quiz!
		getAllQuiz: [Quiz!]

		getQuestionById(questionId: ID!): Question!
		getQuestionsByQuizId(quizId: ID!): [Question!]
		getAllQuestions: [Question!]

		getAnswerById(answerId: ID!): Answer!
		getAllAnswers: [Answer!]

		getResponseAnswersForUser: [ResponseAnswer!]

		getContactLocationsForUser: [UserContactLocation!]

		getResultsForUser: [Result!]

	}

	type RootMutation {

		createUser(userInput: UserInput!): User!

		createQuiz(quizInput: QuizInput!): Quiz!
		deleteQuiz(quizId: ID!): Quiz!
		addQuestionIdToQuiz(quizId: String!, questionId: String!): Quiz!

		createQuestion(questionInput: QuestionInput!): Question!
		deleteQuestion(questionId: ID!): Question!
		addQuizIdToQuestion(questionId: String!, quizId: String!): Question!
		addAnswerIdToQuestion(questionId: String!, answerId: String!): Answer!

		createAnswer(answerInput: AnswerInput!): Answer!
		deleteAnswer(answerId: ID!): Answer!
		addQuestionIdToAnswer(answerId: String!, questionId: String!): Answer!

		submitResponse(responseAnswerInput: ResponseAnswerInput!): ResponseAnswer!

		addUserContactLocation(userContactLocationInput: UserContactLocationInput!): UserContactLocation!

		addResult(quizId: ID!): Result!

	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);
