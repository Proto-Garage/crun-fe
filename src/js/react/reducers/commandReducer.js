import {
  ACCESS_TOKEN, GET_COMMAND, GET_COMMAND_ERR,
  POST_COMMAND, POST_COMMAND_ERR
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
