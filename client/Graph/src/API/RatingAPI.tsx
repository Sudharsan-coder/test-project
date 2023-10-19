import AxiosInstance from './instance/Instancs';

const getRatingByUserId = (id:number,interval:string) => {
  console.log("api:"+interval)
  return AxiosInstance.get(`/api/rating/${interval}/${id}`);
}

const getMonthlyRatingById = (id:number) => {
  console.log("hi")
  return AxiosInstance.get(`/api/rating/monthly/${id}`);
}

export { getRatingByUserId,getMonthlyRatingById };