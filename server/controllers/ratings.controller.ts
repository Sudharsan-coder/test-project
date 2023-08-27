const table = require('../models');

const Ratings = table.Ratings;

const createRating = async (
    teamPlay:number,
    attitude:number,
    technicalExpertise:number,
    codingSkills:number,
    overAllScore:number,
    userId:number | null
    ) => {
    const result = await Ratings.create({
        teamPlay: teamPlay,
        attitude: attitude,
        technicalExpertise: technicalExpertise,
        codingSkills: codingSkills,
        overAllScore: overAllScore,
        userId: userId
    });
    return result;
}

const getRatingByUserIdAndWeekNum = async (userId:number, weekNum:number) => {
    const result = await Ratings.findOne({where: {userId: userId, weekNum: weekNum}});
    return result;
}

const updateRating = async (
    teamPlay:number,
    attitude:number,
    technicalExpertise:number,
    codingSkills:number,
    overAllScore:number,
    userId:number,
    weekNum:number
    ) => {
    const result = await Ratings.update({
        teamPlay: teamPlay,
        attitude: attitude,
        technicalExpertise: technicalExpertise,
        codingSkills: codingSkills,
        overAllScore: overAllScore
    }, {where: {userId: userId, weekNum: weekNum}});
    return result;
}

export { createRating, updateRating, getRatingByUserIdAndWeekNum };