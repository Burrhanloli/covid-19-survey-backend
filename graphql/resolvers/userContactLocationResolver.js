const User = require("../../models/user");
const UserContactLocation = require("../../models/userContactLocation");
const utils = require("./utils");
const { errorName } = require("../../error/errors");

module.exports = {
  //query
  getContactLocationsForUser: async (_, req) => {
    const { isAuthorized, userId } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    try {
      const userContactLocations = await UserContactLocation.find(
        {
          user_id: userId,
        },
        null,
        { sort: "-date" }
      );
      return userContactLocations.map((userContactLocation) =>
        utils.transformUserContactLocation(userContactLocation)
      );
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },

  // mutation
  addUserContactLocation: async (args, req) => {
    const { isAuthorized, userId } = req;
    if (!isAuthorized) {
      throw new Error(errorName.UNAUTHENTICATED);
    }
    const { userContactLocationInput } = args;
    const userContactLocation = new UserContactLocation({
      user_id: userId,
      mobile: userContactLocationInput.mobile,
      location: userContactLocationInput.location,
      date: Date.now(),
    });
    try {
      await userContactLocation.save();
      return utils.transformUserContactLocation(userContactLocation);
    } catch (err) {
      console.log(err);
      throw new Error(errorName.SERVER_ERROR);
    }
  },
};
