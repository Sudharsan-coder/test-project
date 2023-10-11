const table = require('../models');

const Skills = table.Skills;

const createSkill = async (skills:Array<string>,userId:number|null) => {
    const result = await Skills.create({ skills: skills, userId: userId });
    return result;
}

const getSkillByUserId  = async (userId:number) => {
    const result = await Skills.findOne({where: {userId: userId}});
    return result;
}

const updateSkillByUserId = async (skills:Array<string>, phase:string ,userId:number) => {
    const result = await Skills.update({
        skills: skills,
        phase: phase
    }, {
        where: {userId: userId}
    });
    return result;
}

export { createSkill, getSkillByUserId, updateSkillByUserId };