const table = require("../models");

const Skills = table.Skills;
module.exports = {
  createSkill: async (skills, phase, userId, weekNum) => {
    const result = await Skills.create({
      skills: skills,
      phase: phase,
      userId: userId,
      weekNum: weekNum,
    });
    return result;
  },
  getSkillByUserId: async (userId) => {
    const result = await Skills.findOne({ where: { userId: userId } });
    return result;
  },
  updateSkillByUserId: async (skills, phase, userId, weekNum, year) => {
    const result = await Skills.update(
      {
        skills: skills,
        phase: phase,
      },
      {
        where: { userId: userId, weekNum: weekNum, year },
      }
    );
    return result;
  },
};
