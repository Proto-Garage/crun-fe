import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER, BASE_URL, SHOW_ERROR } from './types';

const instance = axios.create({
  baseURL: BASE_URL
});

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function showError(error){

  return {
    type: SHOW_ERROR,
    errors: error
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {

  return dispatch => {
    return instance.post('/authenticate', data).then(response => {

      const token = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));

    })
    .catch(function(error) {
      dispatch(showError(error.response.data));
    });
  }
}
