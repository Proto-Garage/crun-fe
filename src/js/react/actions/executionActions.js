import axios from 'axios';
import {
  BASE_URL, POST_EXECUTION, POST_EXECUTION_ERR, GET_EXECUTION, GET_EXECUTION_ERR
} from './types';

const instance = axios.create({
  baseURL: BASE_URL
});

export function dispatchPostExecution(data) {
  return {
    type: POST_EXECUTION,
    id: data._id,
    uri: data.uri
  }
}

export function dispatchPostExecutionError(error) {
  return {
    type: POST_EXECUTION_ERR,
    error: error
  }
}

export function dispatchGetExecution(data) {
  return {
    type: GET_EXECUTION,
    executions: data.data,
    links: data.links,
    errors: {}
  }
}

export function dispatchGetExecutionError(error) {
  return {
    type: GET_EXECUTION_ERR,
    executions: {},
    links: {},
    errors: error
  }
}

export function postExecution(data) {
  return dispatch => {
    return instance.post('/executions', data).then(response => {
      console.log('post execution: ', response.data);
      const responseData = response.data
      dispatch(dispatchPostExecution(responseData));
    })
    .catch(error => {
      console.log('post execution error: ', error.response.data);
      dispatch(dispatchPostExecutionError(error.response.data));
    });
  }
}

export function getExecution() {
  return dispatch => {
    return instance.get('/executions').then(response => {
      console.log('executions data', response.data);
      const commands = response.data;
      dispatch(dispatchGetExecution(commands));
    })
    .catch(error => {
        const commandErr = error.response.data;
        dispatch(dispatchGetExecutionError(commandErr));
    });
  }
}
