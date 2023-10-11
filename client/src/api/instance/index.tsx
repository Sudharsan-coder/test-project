import Axios from 'axios';
import { BASE_URL } from '../../constants';

const instance = Axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  withCredentials: true
});

export default instance;