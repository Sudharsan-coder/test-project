import AxiosInstance from './instance';

const update = async( teamPlay: number, attitude: number, technicalExpertise: number, codingSkills: number, overAllScore: number, userId: number, weekNum: number ) => {
  return await AxiosInstance.post(`/api/rating/update`, {
    teamPlay: teamPlay,
    attitude: attitude,
    technicalExpertise: technicalExpertise,
    codingSkills: codingSkills,
    overAllScore: overAllScore,
    userId: userId,
    weekNum: weekNum
  })
}

const create = async( teamPlay: number, attitude: number, technicalExpertise: number, codingSkills: number, overAllScore: number, userId: number) => {
  const obj={
    teamPlay: teamPlay,
    attitude: attitude,
    technicalExpertise: technicalExpertise,
    codingSkills: codingSkills,
    overAllScore: overAllScore,
    userId: userId,
  }
  return await AxiosInstance.post(`/api/rating/create`, obj)
}

const getYears=async()=>{
  return await AxiosInstance.get(`api/rating/allAvaliableYears`)
}
export { update,create ,getYears};