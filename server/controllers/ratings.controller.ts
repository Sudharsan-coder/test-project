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
    const newRating = {
        teamPlay: teamPlay,
        attitude: attitude,
        technicalExpertise: technicalExpertise,
        codingSkills: codingSkills,
        overAllScore: overAllScore,
        userId: userId
    }
    return await Ratings.create(newRating)
}

const ratingController = {
    createRating
}

export default ratingController;