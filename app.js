const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schemas/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/isAuth");
// const getErrorCode = require("./error/getErrorCode");

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true,
    rootValue: graphqlResolvers,
    // customFormatErrorFn: (err) => {
    //   const error = getErrorCode(err.message);
    //   return { message: error.message, statusCode: error.statusCode };
    // },
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.sl6lb.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to user database");
    app.listen(4000, () => {
      console.log("Listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
