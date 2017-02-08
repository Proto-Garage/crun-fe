import {
  POST_EXECUTION, POST_EXECUTION_ERR, GET_EXECUTION, GET_EXECUTION_ERR
} from '../actions/types'

const initialState = {
  roles: {},
  links: {},
  errors: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case POST_EXECUTION:
      return {
        executions: action.executions,
        links: action.links,
        errors: {}
      }
      break;
    case POST_EXECUTION_ERR:
      return {
        executions: {},
        links: {},
        errors: action.errors
      }
      break;
    case POST_EXECUTION:
      return {
        id: action.id,
        uri: action.uri,
        errors: {}
      }
      break;
    case GET_EXECUTION:
      return {
        executions: action.executions,
        links: action.links,
        errors: action.errors
      }
      break;
    case GET_EXECUTION_ERR:
      return {
        errors: action.errors
      }
      break;
    default: return state;

  }
}
