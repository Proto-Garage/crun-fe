import {
  ACCESS_TOKEN, GET_COMMAND, GET_COMMAND_ERR,
  POST_COMMAND, POST_COMMAND_ERR, GET_COMMAND_BY_ID,
  GET_COMMAND_BY_ID_ERR, DELETE_COMMAND, DELETE_COMMAND_ERR
} from '../actions/types';

const initialState = {
  commands: {},
  errors: {},
  links: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case GET_COMMAND:
      return {
        errors: {},
        commands: action.commands,
        links: action.links
      };
    case GET_COMMAND_ERR:
      return {
        errors: action.errors,
        commands: {}
      };
    case GET_COMMAND_BY_ID:
      return {
        command: action.command,
        links: action.links,
        errors: {}
      };
    case GET_COMMAND_BY_ID_ERR:
      return {
        command: {},
        errors: action.error
      };
    case POST_COMMAND:
      return {
        id: action.id,
        uri: action.uri,
        errors: {}
      };
    case POST_COMMAND_ERR:
      return {
        errors: action.errors
      }
    default: return state;
  }
}
