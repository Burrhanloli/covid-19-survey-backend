const User = require("../../models/user");
const { errorName } = require("../../error/errors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  userLogin: async ({ mobile, password }) => {
    const user = await User.findOne({ mobile: mobile });
    if (!user) {
      throw new Error(errorName.USER_NOT_FOUND);
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error(errorName.INCORRECT_EMAIL_PASSWORD);
    }
    const expiresIn = process.env.EXPIRES_IN;
    const id = user.id;
    const token = jwt.sign(
      { userId: id, mobile: user.email },
      process.env.SECRET,
      {
        expiresIn: expiresIn,
      }
    );
    return { userId: id, token, tokenExpiration: expiresIn };
  },
  getToken: async ({ mobile }) => {
    console.log(Date.now());
    const user = await User.findOne({ mobile: mobile });
    if (!user) {
      throw new Error(errorName.USER_NOT_FOUND);
    }
    const expiresIn = process.env.EXPIRES_IN;
    const id = user.id;
    const token = jwt.sign(
      { userId: id, mobile: user.mobile },
      process.env.SECRET,
      {
        expiresIn: expiresIn,
      }
    );
    return { userId: id, token, tokenExpiration: expiresIn };
  },
};
