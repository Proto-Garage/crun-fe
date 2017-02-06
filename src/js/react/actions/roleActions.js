import axios from 'axios';
import {
  BASE_URL, GET_ROLE, GET_ROLE_ERR
} from './types';

const instance = axios.create({
  baseURL: BASE_URL
});

export function dispatchRole (data) {
  return {
    type: GET_ROLE,
    roles: data.data,
    errors: {}
  }
}

export function getRoleError (error) {
  return {
    type: GET_ROLE_ERR,
    errors: error
  }
}

export function getRoles () {
  return dispatch => {
    return instance.get('/roles').then(response => {
      console.log('role list: ', response.data)
      const responseData = response.data
      dispatch(dispatchRole(responseData))
    })
    .catch(error => {
      console.log('role list error: ', error.response.data);
      const errData = error.response.data
      dispatch(getRoleError(errData))
    })
  }
}
