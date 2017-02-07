import axios from 'axios';
import {
  BASE_URL, GET_GROUP, GET_GROUP_ERR, POST_GROUP, POST_GROUP_ERR
} from './types';

const instance = axios.create({
  baseURL: BASE_URL
});

export function dispatchGetGroup(data) {
  return {
    type: GET_GROUP,
    groups: data.data,
    links: data.links,
    errors: {}
  }
}

export function getGroupError(error) {
  return {
    type: GET_GROUP_ERR,
    groups: {},
    links: {},
    errors: error
  }
}

export function dispatchPostGroup(data) {
  return {
    type: POST_GROUP,
    id: data._id,
    uri: data.uri,
    errors: {}
  }
}

export function dispatchPostGroupError(error) {
  return {
    type: POST_GROUP_ERR,
    errors: error
  }
}

export function getGroups () {
  return dispatch => {
    return instance.get('/groups').then(response => {
      console.log('group list: ', response.data)
      const responseData = response.data
      dispatch(dispatchGetGroup(responseData))
    })
    .catch(error => {
      console.log('group list error: ', error.response.data)
      const errData = error.response.data
      dispatch(getGroupError(errData))
    })
  }
}

export function postGroup (data) {
  console.log('this post group submitted data: ', data)
  return dispatch => {
    return instance.post('/groups', data).then(response => {
      console.log('post group response: ', response.data)
      const responseData = response.data
      dispatch(dispatchPostGroup(responseData))
    })
    .catch(error => {
      console.log('group post error: ', error.response.data)
      const errData = error.response.data
      dispatch(dispatchPostGroupError(errData))
    })
  }
}
