const { Sequelize, Op } = require("sequelize");
const table = require("../models");

const Ratings = table.Ratings;
module.exports = {
  bulkCreateRating: async (
    teamPlay,
    attitude,
    technicalExpertise,
    codingSkills,
    overAllScore,
    userId
  ) => {
    const currentWeekNum = 32;
    const ratingsData = new Array(10).fill(0).map((item, index) => ({
      teamPlay: teamPlay,
      attitude: attitude,
      technicalExpertise: technicalExpertise,
      codingSkills: codingSkills,
      overAllScore: overAllScore,
      weekNum: currentWeekNum + index,
      year: new Date().getFullYear().toString(),
      userId: userId,
    }));

    const result = await Ratings.bulkCreate(ratingsData);
    return result;
  },
  createRating: async (
    teamPlay,
    attitude,
    technicalExpertise,
    codingSkills,
    overAllScore,
    weekNum,
    userId
  ) => {
    const result = await Ratings.create({
      teamPlay: teamPlay,
      attitude: attitude,
      technicalExpertise: technicalExpertise,
      codingSkills: codingSkills,
      overAllScore: overAllScore,
      weekNum: weekNum,
      userId: userId,
      year: 2024,
    });
    return result;
  },

  getRatingByUserIdAndWeekNum: async (userId, weekNum) => {
    const result = await Ratings.findOne({
      where: { userId: userId, weekNum: weekNum },
    });
    return result;
  },
  getRatingByUserId: async (userId) => {
    const result = await Ratings.findAll({
      attributes: [
        "teamPlay",
        "attitude",
        "technicalExpertise",
        "codingSkills",
        "overAllScore",
        "weekNum",
      ],
      limit: 4,
      where: { userId: userId, year: new Date().getFullYear() },
      order: [["weekNum", "DESC"]],
    });
    return result;
  },

  getMonthlyRatingByUserId: async (userId, month) => {
    const result = await Ratings.findAll({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("teamPlay")), "teamPlay"],
        [Sequelize.fn("AVG", Sequelize.col("attitude")), "attitude"],
        [
          Sequelize.fn("AVG", Sequelize.col("technicalExpertise")),
          "technicalExpertise",
        ],
        [Sequelize.fn("AVG", Sequelize.col("codingSkills")), "codingSkills"],
        [Sequelize.fn("AVG", Sequelize.col("overAllScore")), "overAllScore"],
      ],
      where: {
        [Op.and]: [
          { userId: userId, year: new Date().getFullYear() },
          Sequelize.where(Sequelize.literal("MONTH(createdAt)"), month),
        ],
      },
    });
    return result;
  },
  getYearlyRatingByUserId: async (userId) => {
    const result = await Ratings.findAll({
      attributes: [
        "year",
        [Sequelize.fn("AVG", Sequelize.col("teamPlay")), "teamPlay"],
        [Sequelize.fn("AVG", Sequelize.col("attitude")), "attitude"],
        [
          Sequelize.fn("AVG", Sequelize.col("technicalExpertise")),
          "technicalExpertise",
        ],
        [Sequelize.fn("AVG", Sequelize.col("codingSkills")), "codingSkills"],
        [Sequelize.fn("AVG", Sequelize.col("overAllScore")), "overAllScore"],
      ],
      group: ["year"],
      where: { userId: userId },
      raw: true,
    });
    return result;
  },
  getYears: async () => {
    const result = await Ratings.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("year")), "year"]],
    });
    return result;
  },
  updateRating: async (
    teamPlay,
    attitude,
    technicalExpertise,
    codingSkills,
    overAllScore,
    userId,
    weekNum
  ) => {
    const result = await Ratings.update(
      {
        teamPlay: teamPlay,
        attitude: attitude,
        technicalExpertise: technicalExpertise,
        codingSkills: codingSkills,
        overAllScore: overAllScore,
      },
      { where: { userId: userId, weekNum: weekNum } }
    );
    return result;
  },
};
