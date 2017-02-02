import axios from 'axios';
import {
  BASE_URL, GET_COMMAND,
  GET_COMMAND_ERR, POST_COMMAND,
  POST_COMMAND_ERR, PATCH_COMMAND
} from './types';

const instance = axios.create({
  baseURL: BASE_URL
});

export function dispatchCommand(data) {
  return {
    type: GET_COMMAND,
    commands: data.data,
    links: data.links
  }
}

export function getCommandError(error) {
  return {
    type: GET_COMMAND_ERR,
    errors: error
  }
}

export function dispatchCreateCommand(data){
  return {
    type: POST_COMMAND,
    id: data._id,
    uri: data.uri
  }
}

export function createCommandError(error) {
  return {
    type: POST_COMMAND_ERR,
    errors: error
  }
}

export function dispatchPatchCommand(data){
  return {
    type: PATCH_COMMAND,
    id: data
  }
}

export function patchCommandError(error) {
  return {
    type: PATCH_COMMAND_ERR,
    errors: error
  }
}

export function getCommand() {
  return dispatch => {
    return instance.get('/commands').then(response => {
      console.log('command data', response.data);
      const commands = response.data;
      dispatch(dispatchCommand(commands));
    })
    .catch(error => {
        console.log('get command error: ', error.response.data);
        dispatch(getCommandError(error.response.data));
    });
  }
}

export function createCommand(data) {
  return dispatch => {
    return instance.post('/commands', data).then(response => {
      console.log('create command: ', response.data);
      const responseData = response.data
      dispatch(dispatchCreateCommand(responseData));
    })
    .catch(error => {
      console.log('create command error: ', error.response.data);
      dispatch(createCommandError(error.response.data));
    });
  }
}

export function patchCommand(data) {
  console.log('patch command data: ', data);
  return dispatch => {
    return instance.patch(`/commands/${data.commandId}`).then(response => {
      console.log('patch command: ', response.data);
      const responseData = response.data
      dispatch(dispatchPatchCommand(responseData));
    })
    .catch(error => {
      console.log('patch command error: ', error.response.data);
      dispatch(patchCommandError(error.response.data));
    });
  }
}
