import AxiosInstance from './instance';

const update = (skills:Array<string>, phase:string, userId:number ) => {
  return AxiosInstance.post('/api/skill/update', {
    skills: skills,
    phase: phase,
    userId: userId
  });
}

export { update };

