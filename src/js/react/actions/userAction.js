import axios from 'axios'
import { SET_CURRENT_USER, GET_USER, GET_USER_ERR,
  BASE_URL } from './types'

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

export function getUserError(error) {
  return {
    type: GET_USER_ERR,
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
