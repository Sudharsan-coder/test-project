const table = require('../models');

const Ratings = table.Ratings;

const createRating = async (
    teamPlay:number,
    attitude:number,
    technicalExpertise:number,
    codingSkills:number,
    overAllScore:number,
    weekNum:number,
    year:string,
    userId:number | null
    ) => {
    const newRating = {
        teamPlay: teamPlay,
        attitude: attitude,
        technicalExpertise: technicalExpertise,
        codingSkills: codingSkills,
        overAllScore: overAllScore,
        weekNum: weekNum,
        year: year,
        userId: userId
    }
    return await Ratings.create(newRating)
}

const ratingController = {
    createRating
}

export default ratingController;