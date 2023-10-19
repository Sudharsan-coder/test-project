import AxiosInstance from './instance';

const update = async(skills:string, phase:string, userId:number,weekNum:number ,year:number) => {
  return await AxiosInstance.post('/api/skill/update', {
    skills: skills,
    phase: phase,
    userId: userId,
    weekNum:weekNum,
    year:year,
  });
}
const addList=async(skills:string, phase:string, userId:number )=>{
  const obj={
    skills:skills,
    phase:phase,
    userId: userId,
  }
  return await AxiosInstance.post('/api/skill/create',obj)
}
export { update ,addList};

