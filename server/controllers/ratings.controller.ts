import * as utility from "../util";

const table = require('../models');

const Ratings = table.Ratings;

const bulkCreateRating = async (
    teamPlay:number,
    attitude:number,
    technicalExpertise:number,
    codingSkills:number,
    overAllScore:number,
    userId:number
    ) => {
        const currentWeekNum = 32;

        //const nextWeeksNum = Array.from({length: 10},(i, index)=> currentWeekNum + index);

        const ratingsData = new Array(10).fill(0).map( ( item, index) => ({
            teamPlay: teamPlay,
            attitude: attitude,
            technicalExpertise: technicalExpertise,
            codingSkills: codingSkills,
            overAllScore: overAllScore,
            weekNum: currentWeekNum + index,
            year: new Date().getFullYear().toString(),
            userId: userId
        }));

        const result = await Ratings.bulkCreate(ratingsData);
        return result;
}

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

export { createRating, bulkCreateRating, updateRating, getRatingByUserIdAndWeekNum };