import AxiosInstance from './instance';

const getView = async( week:number,rowsPerPage:any,page:number,year:number|undefined ) => {
  console.log("HI:"+year)
  if(year)
  return await AxiosInstance.get(`/api/user/view/${week}`,{
    params:{rowsPerPage:rowsPerPage,
    page:page,
    year:year}
  })
}

const getAllUsers=async()=>{
  return await AxiosInstance.get(`/api/user/all`)
}

const getUserIdByName=async(name:string)=>{
  return await AxiosInstance.get(`/api/user/${name}`)
}

export { getView,getAllUsers,getUserIdByName };