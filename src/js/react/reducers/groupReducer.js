import {
  GET_GROUP, GET_GROUP_ERR, POST_GROUP, POST_GROUP_ERR, GET_COMMAND,
  GET_COMMAND_ERR, GET_GROUP_BY_ID, GET_GROUP_BY_ID_ERR
} from '../actions/types'

const initialState = {
  groups: {},
  links: {},
  errors: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_GROUP:
      return {
        groups: action.groups,
        links: action.links,
        errors: {}
      }
    break;
    case GET_GROUP_ERR:
      return {
        groups: action.groups,
        links: action.links,
        errors: action.errors
      }
    break;
    case POST_GROUP:
      return {
        id: action.id,
        uri: action.uri,
        errors: action.errors
      }
    break;
    case POST_GROUP_ERR:
      return {
        errors: action.errors
      }
    break;
    case GET_COMMAND:
      return {
        errors: {},
        commands: action.commands,
        links: action.links
      }
    break;
    case GET_COMMAND_ERR:
      return {
        errors: action.errors,
        commands: {}
      }
    break;
    case GET_GROUP_BY_ID:
      return {
        group: action.group,
        links: action.links,
        error: {}
      }
    break;
    case GET_GROUP_BY_ID_ERR:
      return {
        errors: action.errors,
      }
    break;
    default: return state;
  }
}
