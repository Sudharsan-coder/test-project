import AxiosInstance from './instance';

const getView = ( week:number ) => {
  return AxiosInstance.get(`/api/user/view/${week}`)
}

export { getView };