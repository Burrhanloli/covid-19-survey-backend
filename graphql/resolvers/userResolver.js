const User = require("../../models/user");
const utils = require("./utils");
const { errorName } = require("../../error/errors");

const bcrypt = require("bcryptjs");

module.exports = {
  //query
  me: async (_, req) => {
    const { isAuthorized, userId } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    try {
      const user = await User.findById(userId);
      return utils.transformUser(user);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
  //mutation
  createUser: async (args) => {
    const { userInput } = args;
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      throw new Error(errorName.USER_ALREADY_EXISTS);
    }
    const hash = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      user_name: userInput.userName,
      email: userInput.email,
      password: hash,
      created_at: Date.now(),
    });
    try {
      await user.save();
      return utils.transformUser(user);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
};
