import {
  BASE_URL, GET_ROLE, GET_ROLE_ERR, POST_ROLE, POST_ROLE_ERR,
  DELETE_ROLE, DELETE_ROLE_ERR
} from '../actions/types'

const initialState = {
  roles: {},
  links: {},
  errors: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ROLE:
      return {
        roles: action.roles,
        links: action.links,
        errors: {}
      }
      break;
    case GET_ROLE_ERR:
      return {
        roles: {},
        links: {},
        errors: action.errors
      }
      break;
    case POST_ROLE:
      return {
        id: action.id,
        uri: action.uri,
        errors: {}
      }
      break;
    case POST_ROLE_ERR:
      return {
        errors: action.errors
      }
      break;
    case DELETE_ROLE:
      return {
        id: action.id,
        errors: action.errors
      }
      break;
    case DELETE_ROLE_ERR:
      return {
        errors: action.errors
      }
      break;
    default: return state;

  }
}
