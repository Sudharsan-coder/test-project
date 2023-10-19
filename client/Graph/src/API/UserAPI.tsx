import AxiosInstance from './instance/Instancs';

const getAllUsers=()=>{
  return AxiosInstance.get(`/api/user/all`)
}

const getUserIdByName=(name:string)=>{
  return AxiosInstance.get(`/api/user/${name}`)
}

export { getAllUsers,getUserIdByName };