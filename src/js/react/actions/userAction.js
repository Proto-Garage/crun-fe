import axios from 'axios'
import {
  SET_CURRENT_USER, GET_USER, GET_USER_ERR, BASE_URL,
  POST_USER, POST_USER_ERR, DELETE_USER, DELETE_USER_ERR
} from './types'

const instance = axios.create({
  baseURL: BASE_URL
});

export function disptachUsers(data) {
  return {
    type: GET_USER,
    users: data.data,
    links: data.links,
    errors: {}

  }
}

export function dispatchDeleteUser(data) {
  return {
    type: DELETE_USER,
    id: data._id
  }
}

export function dispatchDeleteUserError(error) {
  return {
    type: DELETE_USER_ERR,
    error: error
  }
}

export function getUserError(error) {
  return {
    type: GET_USER_ERR,
    errors: error
  }
}

export function dispatchPostUser (data) {
  return {
    type: POST_USER,
    id: data.id,
    errors: {}
  }
}

export function postUserError (error) {
  return {
    type: POST_USER_ERR,
    errors: error
  }
}

export function getUsers() {
  return dispatch => {
    return instance.get('/users').then(response => {
      console.log('users list: ', response.data)
      const responseData = response.data
      dispatch(disptachUsers(responseData))
    })
    .catch(error => {
      console.log('users list error: ', error.response.data)
      const errData = error.response.data
      dispatch(getUserError(errData))
    })
  }
}

export function postUser (data) {
  return dispatch => {
    return instance.post('users', data).then(response => {
      console.log('users list: ', response.data)
      const responseData = response.data
      dispatch(dispatchPostUser(responseData))
    })
    .catch(error => {
      console.log('users list error: ', error.response.data)
      const errData = error.response.data
      dispatch(postUserError(errData))
    })
  }
}
