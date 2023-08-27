const table = require('../models');

const Skills = table.Skills;

const createSkill = async (skills:Array<string>,userId:number|null) => {
    const skill = {
        skills: skills,
        userId: userId
    }
    return await Skills.create(skill)
}

const skillController ={
    createSkill
}

export default skillController;