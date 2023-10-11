import AxiosInstance from './instance';

const update = ( teamPlay: number, attitude: number, technicalExpertise: number, codingSkills: number, overAllScore: number, userId: number, weekNum: number ) => {
  return AxiosInstance.post(`/api/rating/update`, {
    teamPlay: teamPlay,
    attitude: attitude,
    technicalExpertise: technicalExpertise,
    codingSkills: codingSkills,
    overAllScore: overAllScore,
    userId: userId,
    weekNum: weekNum
  })
}

export { update };