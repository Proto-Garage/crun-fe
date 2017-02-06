import axios from 'axios';
import {
  BASE_URL, GET_ROLE, GET_ROLE_ERR, POST_ROLE, POST_ROLE_ERR,
  PATCH_ROLE, PATCH_ROLE_ERR, DELETE_ROLE, DELETE_ROLE_ERR
} from './types';

const instance = axios.create({
  baseURL: BASE_URL
});

export function dispatcDeleteRole (id) {
  return {
    type: DELETE_ROLE,
    id: id,
    errors: {}
  }
}

export function errorDeleteRole (error) {
  return {
    type: DELETE_ROLE_ERR,
    errors: error
  }
}

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

export function dispatchPostRole (data) {
  return {
    type: POST_ROLE,
    id: data._id,
    uri: data.uri
  }
}

export function postRoleError (error) {
  return {
    type: POST_ROLE_ERR,
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
      console.log('role list error: ', error.response.data)
      const errData = error.response.data
      dispatch(getRoleError(errData))
    })
  }
}

export function postRole (data) {
  return dispatch => {
    return instance.post('/roles', data).then(response => {
      console.log('post role response: ', response.data)
      const responseData = response.data
      dispatch(dispatchPostRole(responseData))
    })
    .catch(error => {
      console.log('post role error: ', error.response.data)
      const errData = error.response.data
      dispatch(postRoleError(errData))
    })
  }
}

export function deleteRole(data) {
  console.log('delete role data', data);
  return dispatch => {
    return instance.delete(`/roles/${data}`).then(response => {
      console.log('delete response: ', response.data);
      dispatch(dispatcDeleteRole(response.data));
    })
    .catch(error => {
      const errorResponse = error.response.data;
      dispatch(errorDeleteRole(errorResponse));
    });
  }
}
