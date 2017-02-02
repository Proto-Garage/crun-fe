import axios from 'axios';
import { SET_CURRENT_USER, BASE_URL } from './types';

const instance = axios.create({
  baseURL: BASE_URL
});

export function getUsers() {
  return dispatch => {
    return instance.post('/api/users', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}
