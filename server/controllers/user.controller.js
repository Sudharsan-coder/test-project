const table = require("../models");

const Users = table.Users;
const Ratings = table.Ratings;
module.exports = {
  getUserByName: async (userName) => {
    const result = await Users.findOne({
      where: { userName: userName },
    });
    return result;
  },
  getUserById: async (userId) => {
    const result = await Users.findOne({
      where: { id: userId },
    });
    return result;
  },
  getAllUsers: async () => {
    const result = await Users.findAll();
    return result;
  },

  getUserView: async (weekNum, rowsPerPage, page, year) => {
    const result = await Users.findAll({
      include: [
        {
          model: table.Ratings,
          as: "ratings",
          where: { weekNum: weekNum, year: year },
          required: false,
        },
        {
          model: table.Skills,
          as: "skills",
          where: { weekNum: weekNum, year: year },
        },
      ],
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    });
    return result;
  },
};