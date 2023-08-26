const table = require('../models');

const Skills = table.Skills;

const createSkill = async (skills:Array<string>,phase:string,userId:number|null) => {
    const skill = {
        skills: skills,
        phase: phase,
        userId: userId
    }
    return await Skills.create(skill)
}

const skillController ={
    createSkill
}

export default skillController;