import AxiosInstance from './instance';

const success = () => {
  return AxiosInstance.get('/auth/login/success');
}

const logout = () => {
  return AxiosInstance.get('/auth/logout');
}

export { success, logout };